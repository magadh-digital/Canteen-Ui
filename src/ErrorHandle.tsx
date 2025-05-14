import { toast } from "react-toastify"


export const ErrorHandle = (error: any) => {
    let message = error.data.message || error.data.error
    
    toast.error(message)
}