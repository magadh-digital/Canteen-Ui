
import OrdersViewItems from './Orders/OrdersViewItems'
import AddMenuProduct from './POSPages/AddMenuProduct'
import PrintPage from './POSPages/PrintPage'
import { ProductItemsEdit } from './ProductList/ProductItemsEdit'

const AllModalList = () => {
    return (
        <>
            <PrintPage />
            <OrdersViewItems />
            <AddMenuProduct />
            <ProductItemsEdit />
        </>
    )
}

export default AllModalList