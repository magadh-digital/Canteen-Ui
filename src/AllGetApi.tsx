import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { useQuery } from "@tanstack/react-query"
import { AllUserType, GetApiUserCanteens, GetMenuItemList, GetPurchaseApiTypes, GetStockDataTypes, GetSupplierApiType, IUnitTypes, MonthlyReportType, PurchaseReportType, ReportDashboard, SellReportType, StockDetails, TodaySellSummaryType, UpdateOrderType } from "./AllTypes"
import { ErrorHandle } from "./ErrorHandle"
import { useSelector } from "react-redux"

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
        queryFn: menuItemList,
        enabled: !!canteen_id
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

export const GetStockDetailsApi = ({ id, page, limit }: { id: string, page?: number, limit?: number }) => {
    const stockDetails = async () => {
        try {
            const response = await axios.get(`${baseUrl}/stock/?item_id=${id}`, {
                params: {
                    page,
                    limit
                }
            })
            const data = response.data
            return data as StockDetails
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['stock-item', id, page, limit],
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

export const GetSellReportApi = ({
    startDate,
    endDate
}: {
    startDate: string,
    endDate: string
}) => {
    const sellReport = async () => {
        try {
            const response = await axios.get(`${baseUrl}/order/daily/report?start_date=${startDate}&end_date=${endDate}`)
            const data = response.data as SellReportType
            return data
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['sellreport', startDate, endDate],
        queryFn: sellReport
    })
}


export const GetPurchaseReportApi = ({
    startDate,
    endDate
}: {
    startDate: string,
    endDate: string
}) => {
    const purchaseReport = async () => {
        try {
            const response = await axios.get(`${baseUrl}/purchase/report?start_date=${startDate}&end_date=${endDate}`)
            const data = response.data as PurchaseReportType
            return data
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['purchasereport', startDate, endDate],
        queryFn: purchaseReport
    })
}

export const GetMonthlyWiseDataApi = ({
    dateRange
}: any) => {
    const { startDate, endDate } = dateRange;
    const monthlyReport = async () => {
        try {
            const response = await axios.get(`${baseUrl}/report/finance?start_date=${startDate}&end_date=${endDate}`)
            const data = response.data as MonthlyReportType
            return data
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['monthlyreport', startDate, endDate],
        queryFn: monthlyReport,
        enabled: !!dateRange.startDate && !!dateRange.endDate,
    })
}


export const GetTodaySellReport = () => {
    const getTodaySellingRport = async () => {
        try {
            const res = await axios.get(`${baseUrl}/report/sales/today`)
            return res.data as TodaySellSummaryType
        } catch (error) {
            ErrorHandle(error)
        }
    }
    return useQuery({
        queryKey: ['todayreport'],
        queryFn: getTodaySellingRport
    })
}


export const GetUnitTypeApi = () => {
    const unitType = async () => {
        try {
            const response = await axios.get(`${baseUrl}/unit/`)
            const data = response.data
            return data as IUnitTypes
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useQuery({
        queryKey: ['unittype'],
        queryFn: unitType,
        enabled: false
    })
}