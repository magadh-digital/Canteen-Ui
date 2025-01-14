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
  payment_type?: string
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
}

export interface LoginType {
  email: string;
  password: string
}


// {
//     "canteen": {
//         "id": "6780bb535e0b1d0fb1daadd9",
//         "name": "Carrot",
//         "location": "",
//         "description": "carrot",
//         "contact": 1231231230,
//         "image_url": "",
//         "created_at": "2025-01-10T06:16:51.418Z",
//         "updated_at": "2025-01-10T06:16:51.418Z",
//         "email": "step.deepanshu10@gmail.com",
//         "password": "$2a$10$ZOBrpSqUEBJ2JSWa2iM6leBBKWdAbv2PXSVpl50slQ9dQ9ziMMnaS"
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjY3ODBiYjUzNWUwYjFkMGZiMWRhYWRkOSIsImlzcyI6InRlc3QiLCJleHAiOjE3MzkwODI3MTF9.popcBefAVbro25yL1-zCqCDqUzKv1tkQkLgZLCMlXcc"
// }


export interface LoginUserType {
  canteen: CanteenUserDataType;
  token: string
}

export interface CanteenUserDataType {
  id: string;
  name: string;
  description: string;
  contact: number;
  email: string;
  password: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  location: string

}