import { Box } from "@mui/material"
import QRCode from "react-qr-code"


const Qrcode = () => {
    const canteen_id = "6780bb535e0b1d0fb1daadd9"
    return (
        <Box sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            margin: "auto",
            bgcolor: "grey",
        }}>
            <QRCode
                value={`172.30.2.67:5173/user?canteen_id=${canteen_id}`}
                size={800}
                style={{ height: "auto", }}
            />
        </Box>
    )
}

export default Qrcode