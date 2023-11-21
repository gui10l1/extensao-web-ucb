export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IProduct {
  id: number;
  name: string;
  quantity: number;
  price: number;
  description?: string;
}

export interface IProductForm {
  name: string;
  quantity?: number;
  description?: string;
  price?: number;
}