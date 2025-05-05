import { PostAdd } from "@mui/icons-material"
import { Autocomplete, Box, Button, colors, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, Tab, Tabs, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { GetStocksApi } from "../AllGetApi"
import { UpdateStockItemApi } from "../AllPostApi"
import { toast } from "react-toastify"
import { GridAddIcon, GridDeleteIcon } from "@mui/x-data-grid"
import { UsePageHook } from "../Utils"


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export interface StockItemType {
    item_id: string,
    quantity: string | number,
    unit: string,
    remarks: string;
    type: string;
    item_name?: string
}


const UpdateStocks = () => {
    const { page, limit,  } = UsePageHook({ page: 1, limit: 100 })

    const [open, setOpen] = useState(false)
    const { data, } = GetStocksApi({
        page,
        limit
    })
    const [value, setValue] = useState("0")
    const { mutateAsync } = UpdateStockItemApi()
    const [arrayAddStock, setArrayAddStock] = useState<StockItemType[]>([])
    const [minusArrayStock, setMinusArrayStock] = useState<StockItemType[]>([])
    const [itemQuantity, setItemQuantity] = useState(0)
    const [error, setError] = useState(false)
    const [minusUpdateStocks, setMinusUpdateStocks] = useState<StockItemType>({
        item_id: "",
        quantity: "",
        unit: "KG",
        remarks: "USE",
        type: "OUT"
    })
    const [updateStocks, setUpdateStocks] = useState<StockItemType>({
        item_name: "",
        item_id: "",
        quantity: "",
        unit: "KG",
        remarks: "PURCHASE",
        type: "IN"
    })

    const handleChange = (_: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        setItemQuantity(0)
    };


    useEffect(() => {
        if (data && updateStocks.item_id) {
            const item = data.remaining.find((item) => item.ID === updateStocks.item_id)
            if (item) {
                setUpdateStocks({
                    item_id: item?.ID || "",
                    quantity: item?.quantity || "",
                    unit: item?.unit || "KG",
                    remarks: item?.remarks || "PURCHASE",
                    type: "IN"
                })
            }

        }
    }, [])
    const handleQuantityChange = (value: string) => {
        const numValue = Number(value);

        if (isNaN(numValue) || numValue < 0) {
            return;
        }

        if (numValue > itemQuantity) {
            setError(true);
        } else {
            setError(false);
        }
        setMinusUpdateStocks((prevState) => ({
            ...prevState,
            quantity: value,
        }));
    };


    const handleUpdateStockAdd = (e: any) => {
        if (e) {
            const qty = data?.remaining?.find((item) => item.ID === e.ID)
            if (qty) {
                setItemQuantity(qty?.remaining || 0)
            }
            setUpdateStocks({
                ...updateStocks,
                item_id: e.ID || "",
                item_name: e.name,
            });
        }
    }

    const handleChangeMinusItem = (e: any) => {

        if (e) {
            const qty = data?.remaining?.find((item) => item.ID === e.ID)
            if (qty) {
                setItemQuantity(qty?.remaining || 0)
            }
            setMinusUpdateStocks({
                ...minusUpdateStocks,
                item_id: e.ID || "",
                item_name: e.name,
            });
        }

    }

    const handleClose = () => {
        setOpen(false)
        setUpdateStocks({
            item_id: "",
            quantity: "",
            unit: "KG",
            remarks: "PURCHASE",
            type: "IN"
        })
        setItemQuantity(0)
    }

    const handleCloseMinus = () => {
        setOpen(false)
        setMinusUpdateStocks({
            item_id: "",
            quantity: "",
            unit: "KG",
            remarks: "USE",
            type: "OUT"
        })
    }

    const handleUpdateMinus = async () => {
        try {
            const updatedStock = minusArrayStock.map((item) => ({
                ...item,
                quantity: -Math.abs(Number(item.quantity)),
            }));

            const res = await mutateAsync({ data: updatedStock });
            if (res.status === 200) {
                setOpen(false);
                handleCloseMinus();
                toast.success("Stock Updated Successfully");
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await mutateAsync({ data: arrayAddStock })
            if (res.status === 200) {
                setOpen(false)
                handleClose()
                toast.success("Stock Updated Successfully")
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    const handleMinusAddStock = () => {
        if (Number(minusUpdateStocks?.quantity ?? 0) > itemQuantity) {
            setError(true)
            toast.error("please use only available quantity")
            return
        }
        setMinusArrayStock((prevState: any) => [...prevState, minusUpdateStocks])
        setMinusUpdateStocks({
            item_id: "",
            quantity: "",
            unit: "KG",
            remarks: "USE",
            type: "OUT"
        })
    }
    const handleMinusRemoveStockItem = (id: string) => {
        setMinusArrayStock(minusArrayStock.filter((item: any) => item.item_id !== id))
    }

    const handleAddStocks = () => {
        setArrayAddStock((prevState: any) => [...prevState, updateStocks])
        setUpdateStocks({
            item_id: "",
            quantity: "",
            unit: "KG",
            remarks: "PURCHASE",
            type: "OUT"
        })
    }
    const handleRemoveStockItem = (id: string) => {
        setArrayAddStock(arrayAddStock.filter((item: any) => item.item_id !== id))
    }

    return (
        <>
            <div style={{
                marginTop: 1,
            }}>
                <Tooltip title="Update Stocks">
                    <button style={{
                        padding: 10,
                        backgroundColor: colors.grey[300],
                        color: colors.green[500],
                        width: "200px",
                        fontWeight: "bold"
                    }}
                        onClick={() => setOpen(true)}
                    >
                        <PostAdd sx={{
                            fontSize: 30
                        }} />
                    </button>
                </Tooltip>
            </div>
            <Dialog open={open} onClose={() => handleClose()} sx={{
                "& .MuiPaper-root": {
                    minWidth: "700px",
                    maxHeight: "60%",
                    minHeight: "40vh",
                    borderRadius: 4,
                    bgcolor: colors.grey[100],
                    m: "auto",
                    boxSizing: "border-box",
                    justifyContent: "center",
                    padding: 1,
                },
            }}>
                <DialogTitle>
                    <Stack direction="row" sx={{
                        justifyContent: "space-between"
                    }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label={
                                <Typography sx={{
                                    fontWeight: "bold",
                                    color: colors.blue[500],
                                    fontStyle: "sans-serif",
                                    fontFamily: "monospace"
                                }}>
                                    Update Stocks
                                </Typography>
                            }
                                value="0"
                            />
                            <Tab label={
                                <Typography sx={{
                                    fontWeight: "bold",
                                    color: colors.red[500],
                                    fontStyle: "sans-serif",
                                    fontFamily: "monospace"
                                }}
                                >
                                    Use Stocks
                                </Typography>
                            } value="1" />
                        </Tabs>
                        {(
                            <>
                                <Typography color="error" fontSize={12}>
                                    Quantity :   {itemQuantity}
                                </Typography>
                            </>
                        )}
                    </Stack>

                </DialogTitle>
                <DialogContent sx={{
                    "&::-webkit-scrollbar": {
                        width: 4,
                        bgcolor: colors.grey[100],
                    }
                }}>
                    {
                        value === "0" && (
                            <Stack spacing={3} mt={3}>
                                <Stack direction={"row"} mt={5} sx={{ justifyContent: "space-between" }}>
                                    <Autocomplete
                                        size="small"
                                        sx={{ width: "300px" }}
                                        options={data?.remaining || []}
                                        getOptionLabel={(option) => option.name || ""}
                                        value={data?.remaining?.find((item) => item.ID === updateStocks.item_id) || null}
                                        onChange={(_, newValue) => {
                                            // if (newValue) {
                                            //     setUpdateStocks({
                                            //         ...updateStocks,
                                            //         item_id: newValue.ID || "",
                                            //         item_name: newValue.name
                                            //     });
                                            // }
                                            handleUpdateStockAdd(newValue)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Items" variant="outlined" size="small" />
                                        )}
                                    />

                                    <TextField
                                        label="Quantity"
                                        size="small"
                                        type="number"
                                        value={updateStocks.quantity}
                                        onChange={(e) => {
                                            setUpdateStocks({
                                                ...updateStocks,
                                                quantity: Number(e.target.value)
                                            })
                                        }}
                                        sx={{
                                            width: "300px"
                                        }}
                                    />
                                </Stack>
                                {Number(updateStocks.quantity) > 0 && updateStocks.item_name && (<>
                                    <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                                        <FormControl>
                                            <InputLabel id="demo-multiple-chip-label">Unit</InputLabel>
                                            <Select
                                                sx={{
                                                    width: "300px"
                                                }}
                                                size="small"
                                                input={<OutlinedInput id="select-multiple-chip" label="Unit" />}
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                value={updateStocks.unit}
                                                MenuProps={MenuProps}
                                                onChange={(e) => {
                                                    setUpdateStocks({
                                                        ...updateStocks,
                                                        unit: e.target.value
                                                    })
                                                }}
                                            >
                                                <MenuItem value={"KG"}>Kg</MenuItem>
                                                <MenuItem value={"PIECE"}>Piece</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Remarks"
                                            size="small"
                                            value={updateStocks.remarks}
                                            onChange={(e) => {
                                                setUpdateStocks({
                                                    ...updateStocks,
                                                    remarks: e.target.value
                                                })
                                            }}
                                            multiline
                                            rows={1}
                                            sx={{
                                                width: "300px"
                                            }}
                                        />
                                    </Stack>
                                    <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleAddStocks()}
                                        >
                                            <GridAddIcon />
                                        </Button>
                                    </Stack>

                                </>

                                )
                                }
                                {arrayAddStock.length > 0 && (
                                    <Box>
                                        <table >
                                            <tr>
                                                <th>sno</th>
                                                <th>item</th>
                                                <th>quantity</th>
                                                <th>unit</th>
                                                <th>remarks</th>
                                                <th style={{
                                                    fontSize: 10
                                                }}><GridDeleteIcon /></th>
                                            </tr>
                                            {arrayAddStock.map((item: any, index: number) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.item_name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.unit}</td>
                                                    <td>{item.remarks}</td>
                                                    <td onClick={() => {
                                                        handleRemoveStockItem(item.item_id)
                                                    }} style={{ cursor: "pointer" }}>X</td>
                                                </tr>
                                            ))}
                                        </table>
                                    </Box>
                                )}

                            </Stack>
                        )
                    }

                    {value === "1" && (
                        <>
                            <Stack spacing={3} mt={3}>

                                <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                                    <Autocomplete
                                        size="small"
                                        sx={{ width: "300px" }}
                                        options={data?.remaining || []}
                                        getOptionLabel={(option) => option.name || ""}
                                        value={data?.remaining?.find((item) => item.ID === minusUpdateStocks.item_id) || null}
                                        onChange={(_, newValue) => {

                                            handleChangeMinusItem(newValue as any)
                                        }}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Items" variant="outlined" size="small" />
                                        )}
                                    />
                                    <TextField
                                        label="Quantity"
                                        size="small"
                                        value={minusUpdateStocks.quantity}
                                        onChange={(e) => handleQuantityChange(e.target.value)}
                                        error={error}
                                        sx={{
                                            width: "300px"
                                        }}
                                        helperText={error ? `Maximum allowed quantity is ${itemQuantity}` : ""}
                                    />
                                </Stack>
                                {Number(minusUpdateStocks.quantity) > 0 && minusUpdateStocks.item_name && (<>
                                    <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                                        <FormControl>
                                            <InputLabel id="demo-multiple-chip-label">Unit</InputLabel>
                                            <Select
                                                sx={{
                                                    width: "300px"
                                                }}
                                                size="small"
                                                input={<OutlinedInput id="select-multiple-chip" label="Unit" />}
                                                labelId="demo-multiple-chip-label"
                                                id="demo-multiple-chip"
                                                value={minusUpdateStocks.unit}
                                                MenuProps={MenuProps}
                                                onChange={(e) => {
                                                    setMinusUpdateStocks({
                                                        ...minusUpdateStocks,
                                                        unit: e.target.value
                                                    })
                                                }}
                                            >
                                                <MenuItem value={"KG"}>Kg</MenuItem>
                                                <MenuItem value={"PIECE"}>Piece</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Remarks"
                                            size="small"
                                            value={minusUpdateStocks.remarks}
                                            onChange={(e) => {
                                                setMinusUpdateStocks({
                                                    ...minusUpdateStocks,
                                                    remarks: e.target.value
                                                })
                                            }}
                                            multiline
                                            rows={1}
                                            sx={{
                                                width: "300px"
                                            }}
                                        />
                                    </Stack>
                                    <Stack direction={"row"} sx={{ justifyContent: "center" }}>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleMinusAddStock()}
                                        >
                                            <GridAddIcon />
                                        </Button>
                                    </Stack>

                                </>

                                )
                                }
                                {minusArrayStock.length > 0 && (
                                    <Box>
                                        <table >
                                            <tr>
                                                <th>sno</th>
                                                <th>item</th>
                                                <th>quantity</th>
                                                <th>unit</th>
                                                <th>remarks</th>
                                                <th style={{
                                                    fontSize: 10
                                                }}><GridDeleteIcon /></th>
                                            </tr>
                                            {minusArrayStock.map((item: any, index: number) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.item_name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.unit}</td>
                                                    <td>{item.remarks}</td>
                                                    <td onClick={() => {
                                                        handleMinusRemoveStockItem(item.item_id)
                                                    }} style={{ cursor: "pointer" }}>X</td>
                                                </tr>
                                            ))}
                                        </table>
                                    </Box>
                                )}

                            </Stack>
                        </>
                    )}

                </DialogContent>
                <DialogActions>
                    {value === "0" ? (
                        <Stack direction="row" spacing={2}>
                            <button style={{
                                padding: 10,
                                backgroundColor: colors.green[500],
                                color: colors.grey[100],
                                fontWeight: "bold"
                            }} onClick={handleUpdate}>Update</button>
                            <button onClick={() => handleClose()} style={{
                                padding: 10,
                                backgroundColor: colors.red[300],
                                color: colors.grey[100],
                                fontWeight: "bold"
                            }}>close</button>
                        </Stack>

                    ) : (
                        <Stack direction="row" spacing={2}>
                            <button style={{
                                padding: 10,
                                backgroundColor: colors.green[500],
                                color: colors.grey[100],
                                fontWeight: "bold"
                            }} onClick={handleUpdateMinus}>Update</button>
                            <button onClick={() => handleCloseMinus()} style={{
                                padding: 10,
                                backgroundColor: colors.red[300],
                                color: colors.grey[100],
                                fontWeight: "bold"
                            }}>close</button>
                        </Stack>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UpdateStocks