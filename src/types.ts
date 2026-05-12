export interface Game {
  id: string;
  title: string;
  publisher: string;
  bannerUrl: string;
  coverUrl: string;
  category: string;
  currencyName: string;
  inputs: {
    id: string;
    label: string;
    placeholder: string;
  }[];
  products: TopupProduct[];
}

export interface TopupProduct {
  id: string;
  amount: number;
  bonus?: number;
  price: number;
  icon?: string;
}

export type PaymentCategory = 'E-Wallet' | 'Virtual Account' | 'Minimarket' | 'QRIS' | 'Bank Transfer';

export interface PaymentMethod {
  id: string;
  name: string;
  category: PaymentCategory;
  iconUrl: string;
  fee: number;
}
