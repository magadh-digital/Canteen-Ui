export interface PagesTypes {
  kind?: string;
  title: string;
  segment?: string;
  icon?: JSX.Element;
  children?: PagesChildrenPage[];
}

export interface PagesChildrenPage {
  title: string;
  segment?: string;
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
}

export interface AddMenuProductType {
  name: string;
  price: number;
  description: string;
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
}

export interface CanteenUserDataType {
  canteen_id?: string;
  id: string;
  name: string;
  description: string;
  phone: number;
  email: string;
  password: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  location: string;
  role: string;
  cp_code: string

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
  purchase_date: string;
  refrence_no: string;
  notes: string;
  sub_total: number;
  shipping_charges: number;
  discount: number;
  total_amount: number;
  paid_amount: number;
  created_at?: string;
  updated_at?: string
}