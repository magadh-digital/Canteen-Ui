import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Store";
import { Box, Modal } from "@mui/material";
import { setPrint } from "../AllStoreSlice/PrintSlice";

const PrintPage = () => {
    const { printData } = useSelector((state: RootState) => state.PrintData);

    console.log("Current printData:", printData); 
    const dispatch = useDispatch()

    return (
        <>
            <Modal
                open={printData !== null} 
                onClose={() => dispatch(setPrint(null))}
                aria-labelledby="modal-modal-title"
            >
                <Box
                    sx={{
                        width: 400,
                        margin: "auto",
                        padding: 4,
                        backgroundColor: "white",
                        borderRadius: "8px",
                        boxShadow: 24,
                    }}
                >
                    <div>Data to Print: {JSON.stringify(printData)}</div>
                </Box>
            </Modal>
        </>
    );
};

export default PrintPage;
