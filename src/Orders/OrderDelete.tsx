import { toast } from "react-toastify";
import { DeleteOrderByAdmin } from "../AllPostApi";
import { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

export const DeleteOrderReason = ({ id }: { id: string }) => {

    const [open, setOpen] = useState(false);
    const { mutateAsync } = DeleteOrderByAdmin()
    const [remarks, setRemarks] = useState("");
    const handleDeleteOrder = async () => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete this order?');
            if (confirmed) {
                const res = await mutateAsync({
                    id,
                    remarks: remarks
                })
                if (res.status === 200) {
                    toast.success("Order Deleted Successfully")
                    setOpen(false)
                }
            }
        } catch (error: any) {
            toast.success(error?.response?.data?.message)
        }
    }
    return (
        <>
            <p style={{
                color: "grey",
                cursor: "pointer",
                fontWeight: "bold",
                textDecoration: "underline",
                textDecorationColor: "grey",
                textDecorationThickness: "1px",
            }}
                onClick={() => {
                    setOpen(true)
                }}
            >
                Delete
            </p>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>
                    <p>Are you sure you want to delete this order?</p>
                </DialogTitle>
                <DialogContent>
                    <TextField
                        size="small"
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Enter Reason"
                        value={remarks}
                        onChange={(e) => {
                            setRemarks(e.target.value)
                        }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <button type="button" style={{
                        color: "white",
                        backgroundColor: "red",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }} onClick={handleDeleteOrder}>Delete</button>
                </DialogActions>
            </Dialog>
        </>
    )
}