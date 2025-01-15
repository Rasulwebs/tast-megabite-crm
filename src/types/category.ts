export namespace CategoryTypes {
  export interface Category {
    id: string;
    name: string;
  }
  export interface InitialData {
    isOpenCategoryCreateModal: boolean;
    categoryName: string;
    id: string;
  }

  export type PutCategory = Pick<Category, "name">;
  export interface CreateCategory extends PutCategory {}
}
