import { PlaylistRemove, PostAdd, PostAddTwoTone } from "@mui/icons-material"
import { colors, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Popper, Select, Stack, styled, TextField, Tooltip, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { GetStocksApi } from "../AllGetApi"
import { UpdateStockItemApi } from "../AllPostApi"
import { toast } from "react-toastify"


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


const MinusStocks = () => {
    const [open, setOpen] = useState(false)
    const { data, isLoading } = GetStocksApi()
    const { mutateAsync } = UpdateStockItemApi()
    const [updateStocks, setUpdateStocks] = useState<any>({
        item_id: "",
        quantity: "",
        unit: "",
        remarks: "USE",
        type: "OUT"
    })
    const handleClose = () => {
        setOpen(false)
        setUpdateStocks({
            item_id: "",
            quantity: "",
            unit: "",
            remarks: "USE",
            type: "OUT"
        })
    }

    useEffect(() => {
        if (data && updateStocks.item_id) {
            const item = data.remaining.find((item) => item.ID === updateStocks.item_id)
            if (item) {
                setUpdateStocks({
                    item_id: item?.ID || "",
                    quantity: Number(item?.quantity) || "",
                    unit: item?.unit || "",
                    remarks: item?.remarks || "",
                    type: "OUT"
                })
            }

        }
    }, [])

    const handleUpdate = async () => {
        try {
            const res = await mutateAsync({
                data: {
                    ...updateStocks,
                    quantity: -Math.abs(Number(updateStocks.quantity))
                }
            })
            if (res.status === 200) {
                setOpen(false)
                handleClose()
                toast.success("Stock Updated Successfully")
            }
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div style={{
                marginTop: 1,
            }}>
                <Tooltip title="Minus Stocks">
                    <button style={{
                        padding: 10,
                        backgroundColor: colors.grey[300],
                        color: colors.green[500],
                        width: "200px",
                        fontWeight: "bold"
                    }}
                        onClick={() => setOpen(true)}
                    >
                        <PlaylistRemove sx={{
                            fontSize: 30
                        }} />
                    </button>
                </Tooltip>
            </div>
            <Dialog open={open} onClose={handleClose} sx={{
                "& .MuiPaper-root": {
                    minWidth: "600px",
                    maxHeight: "60%",
                    minHeight: "auto",
                    borderRadius: 4,
                    bgcolor: colors.grey[100],
                    m: "auto",
                    boxSizing: "border-box",
                    justifyContent: "center",
                    padding: 1,
                },
            }}>
                <DialogTitle>
                    <Typography sx={{
                        fontWeight: "bold",
                        color: colors.blue[500],
                        textDecoration: "underline",
                        fontStyle: "sans-serif",
                        fontFamily: "monospace"
                    }}>
                        Remove Stocks
                    </Typography>
                </DialogTitle>
                <DialogContent sx={{
                    "&::-webkit-scrollbar": {
                        width: 4,
                        bgcolor: colors.grey[100],
                    }
                }}>
                    <Stack spacing={3}>
                        <FormControl>
                            <InputLabel id="demo-multiple-chip-label">Items</InputLabel>
                            <Select
                                size="small"
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                labelId="demo-multiple-chip-label"
                                id="demo-multiple-chip"
                                value={updateStocks.item_id}
                                MenuProps={MenuProps}
                                onChange={(e) => {
                                    setUpdateStocks({
                                        ...updateStocks,
                                        item_id: e.target.value
                                    })
                                }}
                            >
                                {data && data.remaining.map((item: any) => (
                                    <MenuItem value={item.ID}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        />
                        <FormControl>
                            <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                            <Select
                                size="small"
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
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
                            rows={2}
                        />

                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Stack direction="row" spacing={2}>
                        <button style={{
                            padding: 10,
                            backgroundColor: colors.green[500],
                            color: colors.grey[100],
                            fontWeight: "bold"
                        }} onClick={handleUpdate}>Minus Stocks</button>
                        <button onClick={handleClose} style={{
                            padding: 10,
                            backgroundColor: colors.red[300],
                            color: colors.grey[100],
                            fontWeight: "bold"
                        }}>close</button>
                    </Stack>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MinusStocks