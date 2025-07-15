import { useState } from 'react'
import { GetUnitTypeApi } from "../AllGetApi";
import {
    Box, Button, ButtonGroup, CircularProgress, colors, Dialog, DialogActions,
    Divider, Stack, TextField, Typography,
} from "@mui/material";
import { Add, Delete,  } from "@mui/icons-material";
import { ErrorHandle } from "../ErrorHandle";
import { UnitAddTypesPost, UnitDeleteTypesPost,  } from "../AllPostApi";
import moment from "moment";
import { UnitTypes } from '../AllTypes';
import RefecthButton from '../RefecthButton';


const AllUnitTypes = () => {
    const [open, setOpen] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const { mutateAsync } = UnitAddTypesPost()
    const { mutateAsync: unitDelete } = UnitDeleteTypesPost()   

    const [unitAdd, setUnitAdd] = useState<UnitTypes>({
        name: "",
        description: ""
    });
    const {
        data: unitData,
        isLoading: unitIsLoading,
        isRefetching: unitIsRefetching,
        refetch: unitRefetch
    } = GetUnitTypeApi({
        enabled: enabled
    })


    const handleAddUnit = async () => {
        try {
            const data = {
                name: unitAdd.name,
                description: unitAdd.description
            }
            await mutateAsync({
                data: data
            })
            setUnitAdd({
                name: "",
                description: ""
            })
            unitRefetch()

        } catch (error) {
            ErrorHandle(error)
        }
    }



    const DeleteUnitTypes = async ({ id }: { id: string }) => {
        try {
            const isConfirm = window.confirm("Are you sure you want to delete this unit type?")
            if (!isConfirm) return
            await unitDelete({
                id: id
            })
        } catch (error) {
            ErrorHandle(error)
        }
    }

    return (
        <>
            <Button size="small"
                onClick={() => {
                    setOpen(true)
                    setEnabled(true)
                }}>
                Unit
                <Add sx={{ fontSize: 16 }} />
            </Button>
            <Dialog sx={{
                "& .MuiDialog-paper": {
                    minWidth: "20vw",
                    maxWidth: "40vw",
                    minHeight: "20vh",
                    maxHeight: "50vh",
                    borderRadius: "10px"
                }
            }} open={open} onClose={() => setOpen(false)}>
                <Box sx={{ padding: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" sx={{
                            color: colors.grey[600],
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            fontFamily: 'monospace'
                        }}>
                            Add Unit Type
                        </Typography>
                        <RefecthButton refetch={unitRefetch} isRefetching={unitIsRefetching} />
                    </Stack>

                    <TextField
                        size="small"
                        sx={{
                            mt: 2,
                            width: "100%"
                        }}
                        label="Unit Type"
                        value={unitAdd.name}
                        onChange={(e) => setUnitAdd({ ...unitAdd, name: e.target.value })}
                        variant="outlined"
                    />
                    <TextField
                        size="small"
                        sx={{
                            mt: 2,
                            width: "100%"
                        }}
                        label="Message"
                        value={unitAdd.description}
                        onChange={(e) => setUnitAdd({ ...unitAdd, description: e.target.value })}
                        variant="outlined"
                    />
                </Box>
                <Divider sx={{ mt: 2 }} />
                {unitIsLoading && <CircularProgress />}
                <Box sx={{ padding: 2 }}>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Desc</th>
                            <th>Time</th>
                            <th>Edit</th>
                        </tr>
                        {unitData?.data?.map((item: UnitTypes, index: number) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        maxWidth: "200px"
                                    }}>{item.description}</td>
                                    <td>{moment(item.created_at).format("DD-MM-YYYY")}</td>
                                    <td>
                                        <Delete sx={{
                                            fontSize: 16,
                                            color: colors.red[500],
                                            cursor: "pointer"
                                        }}
                                            onClick={() => DeleteUnitTypes({ id: item._id || "" })}
                                        />

                                    </td>
                                </tr>
                            )
                        })}
                    </table>
                </Box>

                <DialogActions>
                    <ButtonGroup size="small">
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={() => handleAddUnit()}>
                            Add
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default AllUnitTypes