export namespace ProductTypes {
  export interface Product {
    id: string;
    name: string;
    category: {
      id: string;
      name: string;
    };
    description: string;
    // avatar: string;
  }

  export type ProductCreate = Omit<Product, "id">;
  export interface ProductFormValuetype {
    name: string;
    category: string;
    description: string;
  }
  export interface InitialDataProduct {
    isOpenProductCreateModal: boolean;
    product: Product | null;
  }
}
