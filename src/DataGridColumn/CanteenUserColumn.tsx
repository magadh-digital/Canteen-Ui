import { Box, Button, colors, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import QRCode from "react-qr-code";

export const CanteenUserColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'Sno',
        width: 70
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 130,
        renderCell: ({ value }) => {
            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography style={{ color: colors.blue[500] }}>{value}</Typography>
                </div>
            )

        }
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 230,
        renderCell: ({ value }) => {
            return (
                <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
                    <Typography style={{ color: "" }}>{value}</Typography>
                </div>
            )
        }
    },
    {
        field: 'contact',
        headerName: 'Contact',
        width: 130
    },
    {
        field: 'updated_at',
        headerName: 'Updated At',
        width: 180,
        renderCell: ({ value }) => {
            return (
                <span style={{ color: "red" }}>{moment(value).format("DD-MM-YYYY")} </span>
            )
        }
    },
    {
        field: 'created_at',
        headerName: 'Created At',
        width: 180,
        renderCell: ({ value }) => {
            return (
                <span style={{ color: "red" }}>{moment(value).format("DD-MM-YYYY")} </span>
            )
        }
    },
    {
        field: 'image_url',
        headerName: 'Image',
        width: 180
    },
    {
        field: 'location',
        headerName: 'Location',
        width: 150
    },
    {
        field: "Action",
        headerName: "URL",
        width: 280,
        renderCell: ({ row }) => {
            const [open, setOpen] = useState(false);
            const handleCopy = () => {
                const url = `canteen-ui.mgdh.in/user?canteen_id=${row.id}`;
                navigator.clipboard.writeText(url)
                    .then(() => {
                        alert("URL copied to clipboard!");
                    })
                    .catch(err => {
                        console.error("Failed to copy text: ", err);
                    });
            };

            return (
                <>
                    <Stack direction="row" spacing={2} alignItems={"center"}>
                        <div style={{ cursor: "pointer" }}
                            onClick={handleCopy}>
                            <Button variant="contained" size="small">Copy URL</Button>
                        </div >
                        <div>
                            <Button
                                variant="contained"
                                size="small"
                                color="secondary"
                                onClick={() => setOpen(true)}
                            > Show QrCode
                            </Button>
                        </div>
                    </Stack>
                    <Dialog open={open} onClose={() => setOpen(false)} sx={{
                        "& .MuiDialog-paper": {
                            minWidth: "auto",
                            height: "auto",
                            borderRadius: "20px",
                            justifyContent: "center"
                        }
                    }}>
                        <DialogContent>
                            <Box sx={{ display: "flex", justifyContent: "center" }}>
                                <QRCode
                                    value={`canteen-ui.mgdh.in/user?canteen_id=${row.id}`}
                                    size={500}
                                    style={{ height: "auto", width: "auto" }}
                                />
                            </Box>
                        </DialogContent>
                    </Dialog>
                </>
            )
        }
    },
]