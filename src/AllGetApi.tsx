import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { useQuery } from "@tanstack/react-query"
import { AllUserType, GetApiUserCanteens, GetMenuItemList, GetPurchaseApiTypes, GetStockDataTypes, GetSupplierApiType, ReportDashboard, StockDetails, UpdateOrderType } from "./AllTypes"
import { toast } from "react-toastify"

export const GetCanteenUserApi = () => {
    const canteenUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/canteen/`)
            const data = response.data
            return data as GetApiUserCanteens
        } catch (error: any) {
            toast.error(error.response.data.message)
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
        } catch (error: any) {
            toast.error(error.response.data.message)
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
    user_id,
}: {
    page?: number,
    limit?: number,
    canteen_id?: string
    user_id?: string
}) => {
    const orderDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/`, {
                params: {
                    page,
                    limit,
                    canteen_id,
                    user_id
                }
            })
            const data = response.data as UpdateOrderType
            return data
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['orderdetails', page, limit, canteen_id, user_id],
        queryFn: orderDetails
    })
}


export const GetAllUserApi = () => {
    const allUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/`)
            const data = response.data
            return data as AllUserType
        } catch (error: any) {
            toast.error(error.response.data.message)
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
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['reamainingvoucher', user_id],
        queryFn: reamainingVoucher,
        enabled: !!user_id
    })
}

export const GetSupplierApi = () => {
    const supplier = async () => {
        try {
            const response = await axios.get(`${baseUrl}/supplier/`)
            const data = response.data
            return data as GetSupplierApiType
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['supplier'],
        queryFn: supplier
    })
}

export const GetPurchaseApi = () => {
    const purchase = async () => {
        try {
            const response = await axios.get(`${baseUrl}/purchase/`)
            const data = response.data
            return data as GetPurchaseApiTypes
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['purchase'],
        queryFn: purchase
    })

}

export const GetStocksApi = () => {
    const stocks = async () => {
        try {
            const response = await axios.get(`${baseUrl}/stock-item/`, {
              
            })
            const data = response.data
            return data as GetStockDataTypes
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['stock-item', ],
        queryFn: stocks
    })
}

export const GetStockDetailsApi = ({ id }: { id: string }) => {
    const stockDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/stock/?item_id=${id}`)
            const data = response.data
            return data as StockDetails
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['stock-item', id],
        enabled: !!id,
        queryFn: stockDetails
    })
}


export const GetReportOrderApi = () => {
    const reportOrder = async () => {
        try {
            const response = await axios.get(`${baseUrl}/canteen/reports`)
            const data = response.data
            return data as ReportDashboard
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['reportorder'],
        queryFn: reportOrder
    })
}

export const GetAllUserApiSearch = ({
    search,
}: {
    search: string
}) => {
    const allUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/?search=${search}`)
            const data = response.data
            return data as AllUserType
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }
    return useQuery({
        queryKey: ['alluser', search],
        queryFn: allUser
    })
}



