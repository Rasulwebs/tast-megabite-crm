import { appInstance } from "@/configs/axios.config";
import { ProductTypes } from "@/types/product";

export const ProductService = {
  async getProducts() {
    const { data } = await appInstance.get<ProductTypes.Product[]>("/product");

    return data;
  },

  async addProduct(params: ProductTypes.ProductCreate) {
    return await appInstance.post("/product", params);
  },

  async deleteProduct(params: string) {
    const response = await appInstance.delete(`/product/${params}`);
    return response;
  },

  async updateProduct(params: ProductTypes.ProductCreate, id: string) {
    return await appInstance.put(`/product/${id}`, params);
  },
};
