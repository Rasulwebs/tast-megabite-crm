import { appInstance } from "@/configs/axios.config";
import { CategoryTypes } from "@/types/category";
import { AxiosResponse } from "axios";

export const CategoryService = {
  async getCategories() {
    const { data } = await appInstance.get<CategoryTypes.Category[]>("/category");

    return data;
  },

  async addCategory(params: CategoryTypes.CreateCategory) {
    return await appInstance.post("/category", params);
  },

  async deleteCategory(params: string) {
    const response = await appInstance.delete(`/category/${params}`);
    return response;
  },

  async updateCategory(params: CategoryTypes.PutCategory, id: string) {
    return await appInstance.put(`/category/${id}`, params);
  },
};
