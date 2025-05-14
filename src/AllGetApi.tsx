import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { useQuery } from "@tanstack/react-query"
import { AllUserType, GetApiUserCanteens, GetMenuItemList, GetPurchaseApiTypes, GetStockDataTypes, GetSupplierApiType, ReportDashboard, StockDetails, UpdateOrderType } from "./AllTypes"
import { ErrorHandle } from "./ErrorHandle"

export const GetCanteenUserApi = () => {
    const canteenUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/canteen/`)
            const data = response.data
            return data as GetApiUserCanteens
        } catch (error: any) {
            ErrorHandle(error.response)
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
            ErrorHandle(error.response)
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
    status,
    search
}: {
    page?: number,
    limit?: number,
    canteen_id?: string
    user_id?: string
    status?: string
    search?: string
}) => {
    const orderDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/`, {
                params: {
                    page,
                    limit,
                    canteen_id,
                    user_id,
                    status,
                    search
                }
            })
            const data = response.data as UpdateOrderType
            return data
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['orderdetails', search, page, limit, canteen_id, user_id, status],
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
            ErrorHandle(error.response)
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
            ErrorHandle(error.response)
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
            ErrorHandle(error.response)
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
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['purchase'],
        queryFn: purchase
    })

}

export const GetStocksApi = ({
    page,
    limit
}: {
    page?: number,
    limit?: number
}) => {
    const stocks = async () => {
        try {
            const response = await axios.get(`${baseUrl}/stock-item/`, {
                params: {
                    page,
                    limit
                }
            })
            const data = response.data
            return data as GetStockDataTypes
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['stock-item', page, limit],
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
            ErrorHandle(error.response)
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
             ErrorHandle(error.response)
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
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['alluser', search],
        queryFn: allUser
    })
}



export const GetUserVoucherApi = ({
    user_id
}: {
    user_id: string
}) => {
    const userVoucherGet = async () => {
        try {
            const response = await axios.get(`${baseUrl}/?user_id=${user_id}`)
            const data = response.data
            return data
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['userVoucher', user_id],
        queryFn: userVoucherGet
    })
}