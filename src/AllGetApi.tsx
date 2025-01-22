import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { useQuery } from "@tanstack/react-query"
import { AllUserType, GetApiUserCanteens, GetMenuItemList, UpdateOrderType } from "./AllTypes"
import { toast } from "react-toastify"

export const GetCanteenUserApi = () => {
    const canteenUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/canteen/`)
            const data = response.data
            return data as GetApiUserCanteens
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    return useQuery({
        queryKey: ['canteen'],
        queryFn: canteenUser

    })
}

export const GetMenuItemListApi = ({ canteen_id }: { canteen_id: string }) => {
    const menuItemList = async () => {
        try {
            const response = await axios.get(`${baseUrl}/menu/?canteen_id=${canteen_id}`)
            const data = response.data
            return data as GetMenuItemList
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    return useQuery({
        queryKey: ['menuitem', canteen_id],
        queryFn: menuItemList

    })
}

export const GetOrderDetailsApi = ({
    page,
    limit,
    canteen_id,
}: {
    page: number,
    limit: number,
    canteen_id: string
}) => {
    const orderDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/`, {
                params: {
                    page,
                    limit,
                    canteen_id
                }
            })
            const data = response.data as UpdateOrderType
            return data
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    return useQuery({
        queryKey: ['orderdetails', page, limit, canteen_id],
        queryFn: orderDetails
    })
}


export const GetAllUserApi = () => {
    const allUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/`)
            const data = response.data
            return data as AllUserType
        } catch (error) {
            toast.error('Error fetching data:')
        }
    }
    return useQuery({
        queryKey: ['alluser'],
        queryFn: allUser
    })
}

export const GetReamainingVoucherApi = ({ user_id }: { user_id: string }) => {
    const reamainingVoucher = async () => {
        try {
            const response = await axios.get(`${baseUrl}/voucher/remaining?user_id=${user_id}`,)
            const data = response.data
            return data
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    return useQuery({
        queryKey: ['reamainingvoucher', user_id],
        queryFn: reamainingVoucher,
        enabled: !!user_id
    })
}