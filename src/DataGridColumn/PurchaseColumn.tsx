import { GridColDef } from "@mui/x-data-grid";
import { GetStockTypes } from "../AllTypes";
import { colors, Stack } from "@mui/material";
import moment from "moment";
// {
//     "ID": "679cb9201b5998c9e63d379f",
//     "supplier_id": "b80fc7f7408131d35cd0799c",
//     "canteen_id": "6780bb535e0b1d0fb1daadd9",
//     "stocks_items": [
//         {
//             "item_id": "679c7cae2e2c8da3592f15d6",
//             "name": "ATTA",
//             "quantity": 10,
//             "unit": "KG",
//             "price": 100,
//             "total": 1000
//         }
//     ],
//     "purchase_date": "2025-01-31T11:50:56.102Z",
//     "refrence_no": "REF-3768",
//     "notes": "This is a random note.",
//     "attachment": null,
//     "sub_total": 1000,
//     "shipping_charges": 100,
//     "discount": 0,
//     "total_amount": 1100,
//     "paid_amount": 1100,
//     "created_at": "2025-01-31T11:50:56.102Z",
//     "updated_at": "2025-01-31T11:50:56.102Z"
// }

export const PurchasesColumn: GridColDef[] = [
    {
        field: 'idx',
        headerName: 'Sno',
        width: 70,
    },
    {
        field: "supplier",
        headerName: "Supplier",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack color={colors.blue[500]}>
                    {value?.name}
                </Stack>
            )
        }
    },
    {
        field: "refrence_no",
        headerName: "Ref No",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack color={colors.red[500]}>
                    {value}
                </Stack>
            )
        }

    },
    {
        field: "total_amount",
        headerName: "Total",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack color={colors.green[500]}>
                    {value}
                </Stack>
            )
        }
    },
    {
        field: "purchase_date",
        headerName: "Date",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack>
                    {moment(value).format("DD-MM-YYYY")}
                </Stack>
            )
        },
    },
    {
        field: "sub_total",
        headerName: "Sub Total",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack color={colors.green[500]}>
                    {value}
                </Stack>
            )
        }
    },
    {
        field: "shipping_charges",
        headerName: "Shipping Charges",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack color={colors.red[500]}>
                    {value}
                </Stack>
            )
        }
    },
    {
        field: "discount",
        headerName: "Discount",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack color={colors.green[500]}>
                    {value}
                </Stack>
            )
        }
    },
    {
        field: "paid_amount",
        headerName: "Paid Amount",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <Stack color={colors.blue[500]}>
                    {value}
                </Stack>
            )
        }
    },
    {
        field: "notes",
        headerName: "Notes",
        width: 180
    },
    {
        field: "stocks_items",
        headerName: "Items",
        width: 180,
        renderCell: ({ value }) => {
            return (
                <div>
                    {value?.map((item: GetStockTypes, index: number) => (
                        <div key={index}>
                            {item.name} - {item.quantity} {item.unit}
                        </div>
                    ))}
                </div>
            );
        }
    }
]