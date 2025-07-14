import { GetPurchaseApi } from "./AllGetApi";

export interface PagesTypes {
  kind?: string;
  title: string;
  path?: string;
  icon?: JSX.Element;
  children?: PagesChildrenPage[];
}

export interface PagesChildrenPage {
  title: string;
  path?: string;
  icon?: JSX.Element;
  children?: PagesChildrenPage[];
}


export interface CanteenUserType {
  name: string;
  description: string;
  contact: number;
  email: string;
  password: string
}


export interface GetApiUserCanteens {
  canteens: GetCanteenUser[]
  current_page: number;
  message: string;
  total: number
  page_size: number
  total_pages: number
}


export interface GetCanteenUser {
  id: string;
  name: string;
  location: string;
  description: string;
  contact: number;
  image_url: string;
  created_at: string;
  updated_at: string;
}


export interface GetMenuItemList {
  current_page: number;
  menuitems: MenuItemType[];
  message: string;
  page_size: number;
  total: number;
  total_pages: number;
  base_url: string
}

export interface MenuItemType {
  id: string;
  canteen_id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image_url: string;
  created_at: string;
  updated_at: string;
  quantity?: number
  unit?: string
  thumbnailurl?: string;
  order?: string
}

export interface AddMenuProductType {
  name: string;
  price: number;
  description?: string;
  category: string;
  unit: string;
  available: boolean;
  image_url: string | File;

}

export interface QuantityType {
  qty: number;
  item_id: string;
  price: number;
  total: number;
  name: string
}

export interface CreateOrderType {
  canteen_id: string;
  items: QuantityType[]
  user_id: string;
  status: string;
  total_amount: number;
  customer_name: string;
  customer_type: string;
  payment_type?: string;
  voucher?: boolean;
  payable_amt?: Number;
  order_id?: string
  voucher_amt?: number;
  customer_phone?: number;
  customer_email?: string

}

export interface UpdateOrderType {
  orders: GetOrderTypes[]
  pagination: {
    current_page: number;
    page_size: number;
    total: number;
    total_pages: number
    total_items: number
  }
}

export interface GetOrderTypes {
  canteen_id: string;
  items: QuantityType[]
  user_id: string;
  status: string;
  total_amount: number;
  customer_name: string;
  customer_type: string;
  id?: string;
  order_id?: string;
  payment_type?: string;
  voucher?: boolean;
  voucher_amt?: Number;
  payable_amt?: Number;
  created_at?: string;
  updated_at?: string;
  // canteen?: CanteenData;
  user?: CanteenUserDataType;
  customer_email?: string
  canteen: CanteenData;
  // user: CanteenUserDataType
}

export interface LoginType {
  email: string;
  password: string
}

export interface LoginUserType {
  canteen: CanteenData[];
  token: string;
  user: CanteenUserDataType;
  userType: string
}

export interface CanteenData {
  id: string;
  name: string;
  location: string;
  description: string;
  contact: number;
  image_url: string;
  created_at: string;
  updated_at: string;
  email: string;
  password: string

}

export interface AllUserType {
  total: number;
  users: CanteenUserDataType[]
  baseUrl: string
}

export interface CanteenUserDataType {
  canteen_id?: string[];
  id?: string;
  name?: string;
  description?: string;
  phone?: string | number;
  email?: string;
  password?: string;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
  location?: string;
  role?: string;
  cp_code?: string;
  profile_url?: string | File;
  thumbnail_url?: string

}

export interface GetSupplierApiType {
  suppliers: SupplierType[]
  total: number
}

export interface SupplierType {
  ID?: string;
  name: string;
  description?: string;
  contact: number;
  address: string;
}

export interface AddPurcahseTypes {
  _id?: string;
  supplier_id: string;
  purchase_date?: string;
  refrence_no: string;
  notes: string;
  sub_total: string | number;
  shipping_charges: string | number;
  discount: string | number;
  total_amount: string | number;
  paid_amount: string | number;
  created_at?: string;
  updated_at?: string;
  canteen_id?: string;
  stock_items: GetStockTypes[]
  other_charges?: string | number
}

export interface UpdatePurcahseTypes {
  _id?: string;
  supplier_id: string;
  purchase_date?: string;
  refrence_no: string;
  notes: string;
  sub_total: string | number;
  shipping_charges: string | number;
  discount: string | number;
  total_amount: string | number;
  paid_amount: string | number;
  created_at?: string;
  updated_at?: string;
  canteen_id?: string;
  stocks_items: GetStockTypes[]
}

export interface AddStockItemType {
  _id?: string;
  name: string;
  description: string;
  unit?: string
}

export interface GetStockTypes {
  ID?: string;
  name?: string;
  description?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  total?: number;
  remaining?: number;
  type?: string
  remarks?: string
}

export interface GetStockDataTypes {
  data: GetStockTypes[]
  remaining: GetStockTypes[]
  total: number
}

export interface GetPurchaseApiTypes {
  purchases: GetPurchaseApi[]
  total: number
}

export interface GetPurchaseApi {
  ID: string
  supplier_id: string
  canteen_id: string
  stocks_items: StocksItem[]
  purchase_date: string
  refrence_no: string
  notes: string
  attachment: any
  sub_total: number
  shipping_charges: number
  discount: number
  total_amount: number
  paid_amount: number
  created_at: string
  updated_at: string
}

export interface StocksItem {
  item_id: string
  name: string
  quantity: number
  unit: string
  price: number
  total: number
}

export interface StockDetails {
  data: StockDetailsType[]
  total: number
}
export interface StockDetailsType {
  _id: string
  created_at: string
  item_details: ItemDetail[]
  item_id: string
  quantity: number
  remarks: string
  type: string
  unit: string
}

export interface ItemDetail {
  _id: string
  "description ": string
  name: string
}

export interface ReportDashboard {
  data: {
    _id: string
    monthlyOrders: number
    monthlySales: number
    monthlyVouchers: number
    todayOrders: number
    todaySales: number
    todayVouchers: number;
    yearlyOrders: number
    yearlySales: number
    yearlyVouchers: number
  }
  message: string
  last20orders: Last20OrdersType[]

}

export interface Last20OrdersType {
  id: string
  order_id: string
  canteen_id: string
  user_id: string
  customer_name: string
  items: Item[]
  total_amount: number
  status: string
  customer_type: string
  created_at: string
  updated_at: string
  voucher: boolean
  voucher_amt: number
  payable_amt: number
  payment_type: string
  canteen: Canteen
  user: User
}

export interface Item {
  item_id: string
  name: string
  qty: number
  price: number
  total: number
}

export interface Canteen {
  id: string
  name: string
  location: string
  description: string
  contact: number
  image_url: string
  created_at: string
  updated_at: string
  email: string
  password: string
}

export interface User {
  id?: string
  name?: string
  phone?: number
  role?: string
  email?: string
  cp_code?: string
  created_at?: string
  updated_at?: string
  canteen_id?: any
}

export interface UpdateUserType {
  name?: string;
  phone?: number;
  role?: string;
  email?: string;
  canteen_id?: []
  profile_url?: string
}

export interface UserVoucherTypes {
  message: String;
  total: number;
  vouchers: VouchersType[]
}


export interface VouchersType {
  ID: string;
  amount: Number;
  created_at: string;
  description: string;
  type: String;
  user_id: string;
  order_id: string
}

export interface SellReportType {
  total_amount: number;
  date: string;
  items: SellItems[]
  total_qty: number;
}

export interface SellItems {
  item_id: string;
  name: string;
  total: number;
  qty: number;
  item_details: {
    unit : string
  }
}


export interface PurchaseReportType {
  due_amount: number;
  paid_amount: number;
  items: PurchaseItems[]
  total_amount: number;
}

export interface PurchaseItems {
  due: number;
  purchase_date: string;
  reference_no: string;
  supplier: SupplierType;
  total_amount: number;
  _id: string
  paid_amount: number
}


export interface MonthlyReportType {
  data: MonthlyReport[];
  group_by: string
}

export interface MonthlyReport {
  Expense: number;
  Income: number;
  date: string
  net_profit: number
}


export interface TodaySellSummaryType {
  purchases : {
    due_amount : number,
    paid_amount : number,
    shipping_charges : number,
    sub_total : number,
    total_amount : number,
    _id :{
      day: number,
      month: number,
      year: number
    }
  },
  sell_summary : {
    PayableAmt : number,
    VoucherAmt : number,
    cash_payment : number,
    sub_total : number,
    online_payment : number,
    total_amount : number,
    _id :{
      day: number,
      month: number,
      year: number
    }
  }
}