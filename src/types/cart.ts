export namespace CartTypes {
  export interface CartProduct {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
    description: string;
  }

  export interface InitialDataCart {
    cartProucts: CartProduct[] | null;
  }
}
