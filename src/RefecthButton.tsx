
import { Button } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
const RefecthButton = ({ refetch, isRefetching }: any) => {
    return (
        <Button onClick={() => refetch()} disabled={isRefetching} style={{ width : "50px", height: "30px", border: "1px solid #E0E0E0"}}>
            <RefreshIcon />
        </Button>
    )
}

export default RefecthButton