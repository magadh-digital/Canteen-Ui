import {
    Autocomplete,
    Box,
    Button,
    colors,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react';
import { AddPurcahseTypes, } from '../AllTypes';
import { GetStocksApi, GetSupplierApi } from '../AllGetApi';
import { PostPurchaseApi } from '../AllPostApi';
import { useSelector } from 'react-redux';
import { RootState } from '../Store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GridDeleteIcon } from '@mui/x-data-grid';
import { UsePageHook } from '../Utils';
import { ErrorHandle } from '../ErrorHandle';


const CreatePurchase = () => {
    const navigate = useNavigate()
    const { page, limit, } = UsePageHook({ page: 1, limit: 100 })
    const [open, setOpen] = useState(true);
    const { canteenData } = useSelector((state: RootState) => state.canteenData)
    const { data: supplier } = GetSupplierApi()
    const { data: stockItem } = GetStocksApi({
        page,
        limit
    })
    const { mutateAsync } = PostPurchaseApi()
    const [purchaseData, setPurchaseData] = useState<AddPurcahseTypes>({
        supplier_id: '',
        // purchase_date: '',
        refrence_no: '',
        notes: '',
        sub_total: '',
        shipping_charges: '',
        discount: '',
        total_amount: '',
        paid_amount: '',
        canteen_id: canteenData?.id,
        stock_items: [],
        other_charges: ''
    });
    const handleClose = () => {
        setPurchaseData({
            supplier_id: '',
            // purchase_date: '',
            refrence_no: '',
            notes: '',
            sub_total: '',
            shipping_charges: '',
            discount: '',
            total_amount: '',
            paid_amount: '',
            canteen_id: canteenData?.id,
            stock_items: [],
            other_charges: ''
        })
        navigate("/purchase")
        setOpen(false)
    }



    const handleSavePurchaseData = (value: any) => {
        const name = value.target.name;
        const newValue = value.target.value;
        setPurchaseData((prevState) => ({
            ...prevState,
            [name]: name === "shipping_charges" || name === "discount" || name === "paid_amount" ? Number(newValue) : newValue
        }))

    }

    useEffect(() => {
        if (canteenData?.id) {
            setPurchaseData((prevState) => ({
                ...prevState,
                canteen_id: canteenData.id
            }));
        }
    }, [supplier, canteenData]);

    const handleAddStockItem = (value: any) => {
        if (value && !purchaseData.stock_items.some(item => item.ID === value.ID)) {
            setPurchaseData(prevState => ({
                ...prevState,
                stock_items: [...prevState?.stock_items, value]
            }));
        }
    };

    const handleUpdateStockItem = (id: string, field: string, value: number | string) => {
        setPurchaseData(prevState => ({
            ...prevState,
            stock_items: prevState?.stock_items?.map(item =>
                item.ID === id
                    ? { ...item, [field]: value, total: (item.quantity || 0) * (item.price || 0) }
                    : item
            ),
        }));
    };

    const handleRemoveStockItem = (id: string) => {
        setPurchaseData(prevState => ({
            ...prevState,
            stock_items: prevState?.stock_items.filter(item => item.ID !== id)
        }));
    };
    const subTotal = purchaseData?.stock_items?.reduce((acc, item) =>
        acc + ((item.price || 0) * (item.quantity || 0)), 0);

    const payableAmount = subTotal +
        Number(purchaseData?.shipping_charges || 0) +
        Number(purchaseData?.other_charges || 0) -
        Number(purchaseData?.discount || 0);

    const handleCreatePurchase = async () => {

        if (!purchaseData?.supplier_id) {
            toast.error("Please Select Supplier")
            return
        }

        if (purchaseData?.refrence_no === "") {
            toast.error("Please Enter Reference No")
            return
        }
        if (purchaseData?.stock_items?.length === 0) {
            toast.error("Please Add Stock Items")
            return
        }
        try {
            let formattedData = {
                ...purchaseData,
                sub_total: subTotal,
                total_amount: payableAmount,
                stocks_items: purchaseData?.stock_items.map(item => ({
                    ID: item.ID,
                    name: item.name,
                    description: item.description,
                    quantity: item.quantity ?? 0,
                    price: item.price ?? 0,
                    total: (item.quantity ?? 0) * (item.price ?? 0),
                })),
            };

            const res = await mutateAsync({ data: formattedData });
            if (res?.status === 200) {
                handleClose()
                navigate('/purchase')
                toast.success("Purchase Created Successfully")
            }
        } catch (error: any) {
            ErrorHandle(error.response)
            // toast.error(error.response.data.message);
        }
    };

    return (
        <>

            <Dialog open={open} fullScreen onClose={handleClose} sx={{
                '& .MuiDialog-paper': {
                    minWidth: '100vw',
                    height: '100vh',
                    borderRadius: '20px',
                    padding: '20px',
                    overflow: 'auto',
                    bgcolor: colors.grey[200],
                },
                '& .MuiDialog-paper::-webkit-scrollbar': {
                    width: '4px',
                    backgroundColor: '#F5F5F5',
                }
            }}>
                <DialogTitle>
                    <Typography variant='h5' sx={{
                        color: colors.blue[500],
                        fontWeight: 'bold',
                        textDecoration: 'underline',
                        textAlign: 'center'
                    }}>
                        Create Purchase
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{
                    overflow: "auto",
                    height: "100%",
                    '&::-webkit-scrollbar': {
                        width: '4px',
                        backgroundColor: '#F5F5F5',
                    }
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        width: '100%',
                    }}>
                        <Stack spacing={4} width={'60%'} mt={5}>
                            <Stack direction="row"
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}
                                spacing={2}
                            >
                                <Typography sx={{
                                    fontWeight: 'bold',
                                }}>
                                    Supplier
                                </Typography>
                                <Autocomplete
                                    disablePortal
                                    size="small"
                                    id="combo-box-demo"
                                    value={supplier?.suppliers?.find((supplier) => supplier.ID === purchaseData.supplier_id) || null}
                                    options={supplier?.suppliers || []}
                                    getOptionLabel={(option) => option.name || ""}
                                    fullWidth
                                    renderInput={(params) => <TextField {...params} label="Select Supplier" />}
                                    onChange={(_, value) => setPurchaseData({
                                        ...purchaseData,
                                        supplier_id: value?.ID || ''
                                    })}
                                    sx={{
                                        bgcolor: "#fff"
                                    }}
                                />

                            </Stack>
                            <Stack direction="row"
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}
                                spacing={2}
                            >
                                <Typography sx={{
                                    fontWeight: 'bold',
                                }}>
                                    Refrence
                                </Typography>
                                <TextField
                                    size='small'
                                    name='refrence_no'
                                    label='Reference No'
                                    value={purchaseData.refrence_no}
                                    onChange={handleSavePurchaseData}
                                    fullWidth
                                    sx={{
                                        bgcolor: "#fff"
                                    }}
                                />
                            </Stack>
                            <Stack direction="row"
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    width: "100%"
                                }}
                                spacing={5}
                            >
                                <Typography sx={{
                                    fontWeight: 'bold',
                                }}>
                                    Notes
                                </Typography>
                                <TextField
                                    size='small'
                                    name='notes'
                                    label='Notes'
                                    multiline
                                    rows={2}
                                    value={purchaseData.notes}
                                    onChange={handleSavePurchaseData}
                                    fullWidth
                                    sx={{
                                        bgcolor: "#fff"
                                    }}
                                />
                            </Stack>
                            <Stack sx={{
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                                direction={"row"}
                                spacing={4}
                            >
                                <Typography sx={{
                                    fontWeight: 'bold',
                                }}>
                                    Stocks
                                </Typography>
                                <Autocomplete
                                    size='small'
                                    options={stockItem?.data || []}
                                    getOptionLabel={(option) => option.name || ""}
                                    renderInput={(params) => <TextField {...params} label="Stock Items" />}
                                    onChange={(_, value) => handleAddStockItem(value)}
                                    fullWidth
                                    sx={{
                                        bgcolor: "#fff"
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Box>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: "40%" }}>Product</th>
                                    <th>Quantity</th>
                                    <th>Cost</th>
                                    <th>Unit </th>
                                    <th>Item Tax</th>
                                    <th style={{ textAlign: "right" }}>Total</th>
                                    <th style={{ width: "5px", textAlign: "right", }}><GridDeleteIcon sx={{
                                        fontSize: "12px"
                                    }} /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {purchaseData?.stock_items.map((item, index) => (
                                    <tr key={index}>
                                        <td style={{
                                            width: "40%",
                                        }}>{item.name}</td>
                                        <td style={{ width: "10%" }}>
                                            <input
                                                type="number"
                                                value={item.quantity || ""}
                                                name="quantity"
                                                onChange={(e) => handleUpdateStockItem(item.ID || "", "quantity", Number(e.target.value))}
                                            />
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <input
                                                type="number"
                                                value={item.price || ""}
                                                name="price"
                                                onChange={(e) => handleUpdateStockItem(item.ID || "", "price", Number(e.target.value))}
                                            />
                                        </td>
                                        <td style={{
                                            width: "10%",
                                        }}>
                                            <input
                                                value={item.unit || ""}
                                                name="sell_price"
                                                onChange={(e) => handleUpdateStockItem(item.ID || "", "unit", String(e.target.value))}
                                            />
                                        </td>
                                        <td>0.00</td>
                                        <td style={{
                                            width: "10%",
                                            textAlign: "right"
                                        }} >
                                            {(item.price || 0) * (item.quantity || 0)}
                                        </td>
                                        <td
                                            style={{
                                                width: "5px",
                                                textAlign: "right",
                                                fontSize: "12px",

                                            }}>
                                            <span
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleRemoveStockItem(item?.ID || "")}>
                                                ❌
                                            </span></td>
                                    </tr>
                                ))}
                                <tr style={{
                                    backgroundColor: colors.blue[50],
                                }}>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}>
                                        Sub Total
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {subTotal}
                                    </td>
                                </tr>

                                <tr style={{
                                    backgroundColor: colors.blue[50],
                                }}>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}>
                                        Shipping Charge
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <TextField
                                            size='small'
                                            name='shipping_charges'
                                            value={purchaseData.shipping_charges}
                                            onChange={handleSavePurchaseData}
                                            sx={{ width: 150, bgcolor: "white" }}
                                        />
                                    </td>
                                </tr>
                                <tr style={{
                                    backgroundColor: colors.blue[50],
                                }}>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}>
                                        Other Charges
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <TextField
                                            size='small'
                                            name='other_charges'
                                            value={purchaseData?.other_charges}
                                            onChange={handleSavePurchaseData}
                                            sx={{ width: 150, bgcolor: "white" }}
                                        />

                                    </td>
                                </tr>


                                <tr style={{
                                    backgroundColor: colors.blue[50],
                                }}>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}>
                                        Discount
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <TextField
                                            size='small'
                                            name='discount'
                                            value={purchaseData.discount}
                                            onChange={handleSavePurchaseData}
                                            sx={{ width: 150, bgcolor: "white" }}
                                        />
                                    </td>
                                </tr>

                                <tr style={{
                                    backgroundColor: colors.green[100],
                                }}>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}>
                                        Payable Amount
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "center",
                                            padding: "10px",
                                            fontWeight: "bold",
                                            color: "black",
                                            fontSize: "16px"
                                        }}
                                    >
                                        {payableAmount}

                                    </td>
                                </tr>
                                <tr style={{
                                    backgroundColor: colors.grey[100],
                                }}>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}>
                                        Payment Method
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >

                                    </td>
                                </tr>

                                <tr style={{
                                    backgroundColor: colors.grey[100],
                                }}>
                                    <td
                                        colSpan={5}
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}>
                                        paid Amount
                                    </td>
                                    <td
                                        style={{
                                            textAlign: "right",
                                            padding: "10px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <TextField
                                            size='small'
                                            name='paid_amount'
                                            value={purchaseData.paid_amount}
                                            onChange={handleSavePurchaseData}
                                            sx={{
                                                width: 150,
                                                bgcolor: "white"
                                            }}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Stack direction='row' spacing={2} justifyContent='center' width='100%'>
                        <Button size='small'
                            variant='contained'
                            sx={{
                                bgcolor: colors.red[200]
                            }}
                            onClick={() => {
                                handleClose()
                            }}>Cancel</Button>
                        <Button size='small' variant='contained' onClick={handleCreatePurchase} color='success'>Create</Button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreatePurchase