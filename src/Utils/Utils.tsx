import { TablePagination } from "@mui/material";
import React from "react";

export function CustomPagination({
    total,
    page,
    limit,
    setpage,
    setlimit,
}: {
    total: number | any;
    page: number;
    limit: number;
    setpage: any;
    setlimit: any;
}) {
    const handleChangePage = (
        _: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setpage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setlimit(event.target.value);
    };

    return (
        <TablePagination
            component="div"
            count={total}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={limit}
            rowsPerPageOptions={[10, 20, 50, 100]}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    );
}

type Props = {
    page?: number;
    limit?: number;
};

export function UsePageHook(props: Props) {
    const [page, setPage] = React.useState(props.page || 1);
    const [total, setTotal] = React.useState<number>(0);
    const [limit, setLimit] = React.useState(props.limit || 20);


    return {
        page,
        limit,
        setPage,
        setLimit,
        total,
        setTotal,

    };
}