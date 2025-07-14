import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { AddStockItemType, CanteenUserType, CreateOrderType, LoginType, SupplierType, UnitTypes, UpdatePurcahseTypes, } from "./AllTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { StockItemType } from "./Stocks/UpdateStocks"
import { ErrorHandle } from "./ErrorHandle"


export const PostCanteenUserApi = () => {
    const queryClient = useQueryClient();
    const canteenUser = async ({ data }: { data: CanteenUserType }) => {
        try {

        } catch (error: any) {
            ErrorHandle(error?.response)
        }
        const response = await axios.post(`${baseUrl}/canteen/create`, data)

        return response

    }
    return useMutation({
        mutationFn: canteenUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['canteen'] })

        }

    })

}


export const PostMenuItemApi = () => {
    const queryClient = useQueryClient();
    const menuItem = async ({ data }: { data: any }) => {
        try {
            const response = await axios.post(`${baseUrl}/menu/create`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }

    }
    return useMutation({
        mutationFn: menuItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuitem'] })
        }

    })

}


export const PostOrderCreateApi = () => {
    const queryClient = useQueryClient();
    const orderCreate = async ({ data }: { data: CreateOrderType }) => {
        try {
            const response = await axios.post(`${baseUrl}/order/create`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: orderCreate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['create-order'] })
        }
    })
}



export const LoginCanteenUser = () => {
    const queryClient = useQueryClient();
    const LoginUser = async ({ data }: { data: LoginType }) => {
        try {
            const response = await axios.post(`${baseUrl}/canteen/login`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: LoginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['login-user'] })
        }
    })
}

export const UpdateProductItem = () => {
    const queryClient = useQueryClient();
    const updateProduct = async ({ data, id }: { data: any, id: string }) => {
        try {
            const response = await axios.put(`${baseUrl}/menu/${id}`, data)
            return response
        }
        catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: updateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuitem'] })
        }
    })
}


export const DeleteProductItem = () => {
    const queryClient = useQueryClient();
    const deleteProduct = async ({ id }: { id: string }) => {
        try {
            const response = await axios.delete(`${baseUrl}/menu/${id}`)
            return response
        }
        catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menuitem'] })
        }
    })
}





export const PostOtpSender = () => {
    const queryClient = useQueryClient();
    const otpSender = async ({ data }: { data: Number }) => {
        try {
            const response = await axios.post(`${baseUrl}/user/request-otp`, {
                phone: data
            })
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: otpSender,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['otp'] })
        }
    })
}




export const PostVerifyOtp = () => {
    const queryClient = useQueryClient();
    const otpSender = async ({ data, phone }: { data: Number, phone: Number }) => {
        try {
            const response = await axios.post(`${baseUrl}/user/login`, {
                otp: data,
                phone: phone
            })
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: otpSender,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['otp'] })
        }
    })
}


export const CreateSupplierApi = () => {
    const queryClient = useQueryClient();
    const supplier = async ({ data }: { data: SupplierType }) => {
        try {
            const response = await axios.post(`${baseUrl}/supplier/create`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: supplier,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['supplier'] })
        }
    })
}


export const PostPurchaseApi = () => {
    const queryClient = useQueryClient();
    const purchaseApi = async ({ data }: { data: UpdatePurcahseTypes }) => {
        try {
            const response = await axios.post(`${baseUrl}/purchase/create`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: purchaseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchase'] })
        }
    })
}

export const CreateStockItemApi = () => {
    const queryClient = useQueryClient();
    const stocksApi = async ({ data }: { data: AddStockItemType }) => {
        try {
            const response = await axios.post(`${baseUrl}/stock-item/create`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: stocksApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-item'] })
        }
    })
}

export const UpdateStockItemApi = () => {
    const queryClient = useQueryClient();
    const stocksApi = async ({ data }: { data: StockItemType[], }) => {
        try {
            const response = await axios.post(`${baseUrl}/stock/update`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)

        }
    }
    return useMutation({
        mutationFn: stocksApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['stock-item'] })
        }
    })
}

export const AddNewUserRegister = () => {
    const queryClient = useQueryClient();

    const userRegister = async (data: FormData) => {
        try {
            const response = await axios.post(`${baseUrl}/user/register`, data);
            return response;
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    };

    return useMutation({
        mutationFn: userRegister,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alluser'] });
        },
    });
};

export interface AddVoucherType {
    user_id: string,
    amount: number;
    description: string
}
export const AddVoucherAndUpdate = () => {
    const queryClient = useQueryClient();
    const voucherApi = async ({ data }: { data: AddVoucherType }) => {
        try {
            const response = await axios.post(`${baseUrl}/voucher/create`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: voucherApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alluser'] })
        }
    })
}

export const UpdateUserData = () => {
    const queryClient = useQueryClient();
    const updateUserData = async ({ data, user_id }: { data: FormData, user_id: string }) => {
        try {
            const response = await axios.post(`${baseUrl}/user/${user_id}`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: updateUserData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['alluser'] })
        }
    })
}

export const GetCanteenUserDelete = () => {
    const queryClient = useQueryClient();
    const deleteCanteenUser = async ({ id }: { id: string }) => {
        try {
            const response = await axios.delete(`${baseUrl}/user/${id}`)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: deleteCanteenUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['canteen'] })
        }
    })
}


export const DeleteOrderByAdmin = () => {
    const queryClient = useQueryClient();
    const deleteOrder = async ({ id, remarks }: { id: string, remarks: string }) => {
        try {
            const response = await axios.delete(`${baseUrl}/order/${id}?remarks=${remarks}`,)
            return response

        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: deleteOrder,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orderdetails'] })
        }
    })
}

export const UnitAddTypesPost = () => {
    const queryClient = useQueryClient();
    const unitAdd = async ({ data }: { data: UnitTypes }) => {
        try {
            const response = await axios.post(`${baseUrl}/unit/create`, data)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: unitAdd,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['unittype'] })
        }
    })
}

export const UnitDeleteTypesPost = () => {
    const queryClient = useQueryClient();
    const unitDelete = async ({ id }: { id: string }) => {
        try {
            const response = await axios.delete(`${baseUrl}/unit/${id}`)
            return response
        } catch (error: any) {
            ErrorHandle(error.response)
        }
    }
    return useMutation({
        mutationFn: unitDelete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['unittype'] })
        }
    })
}

