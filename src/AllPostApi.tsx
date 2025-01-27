import axios from "axios"
import { baseUrl } from "./ApiEndPoint"
import { AddPurcahseTypes, CanteenUserType, CreateOrderType, LoginType, SupplierType, } from "./AllTypes"
import { useMutation, useQueryClient } from "@tanstack/react-query"


export const PostCanteenUserApi = () => {
    const queryClient = useQueryClient();
    const canteenUser = async ({ data }: { data: CanteenUserType }) => {

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

        const response = await axios.post(`${baseUrl}/menu/create`, data)

        return response

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

        const response = await axios.post(`${baseUrl}/order/create`, data)

        return response
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

        const response = await axios.post(`${baseUrl}/canteen/login`, data)

        return response
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
        console.log(data)
        const response = await axios.put(`${baseUrl}/menu/${id}`, data)
        return response
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
        const response = await axios.delete(`${baseUrl}/menu/${id}`)
        return response
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
        const response = await axios.post(`${baseUrl}/user/request-otp`, {
            phone: data
        })
        return response
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
        const response = await axios.post(`${baseUrl}/user/login`, {
            otp: data,
            phone: phone
        })
        return response
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
        const response = await axios.post(`${baseUrl}/supplier/create`, data)
        return response
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
    const purchaseApi = async ({ data }: { data: AddPurcahseTypes }) => {
        const response = await axios.post(`${baseUrl}/purchase/create`, data)
        return response
    }
    return useMutation({
        mutationFn: purchaseApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['purchase'] })
        }
    })
}