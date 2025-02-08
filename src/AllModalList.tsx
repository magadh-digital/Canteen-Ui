
import { ViewStocksDetails } from './DataGridColumn/StockItemColumn'
import RenderUserLoginModal from './Modal/RendeUserLoginModal'
import OrdersViewItems from './Orders/OrdersViewItems'
import AddMenuProduct from './POSPages/AddMenuProduct'
import PrintPage from './POSPages/PrintPage'
import { ProductItemsEdit } from './ProductList/ProductItemsEdit'
import UserOrdersViewItems from './UserPosPage.tsx/UserOrderViewItem'
import { ZoomImage } from './Users/AllUserList'

const AllModalList = () => {
    return (
        <>
            <PrintPage />
            <OrdersViewItems />
            <AddMenuProduct />
            <ProductItemsEdit />
            <UserOrdersViewItems />
            <RenderUserLoginModal />
            <ViewStocksDetails />
            <ZoomImage />
        </>
    )
}

export default AllModalList