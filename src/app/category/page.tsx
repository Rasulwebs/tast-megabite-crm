"use client";

import { CategoryService } from "@/services/category.service";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../components/DataTable/datatable";
import { categoryColumn } from "./constants";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import {
  setCategoryName,
  setId,
  setIsOpenCategoryCreateModal,
} from "@/store/categorySlice";
import { CreateCategoryModal } from "../components/CreateCategoryModal";

export default function Category() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(
    (state) => state.category.isOpenCategoryCreateModal
  );
  const {
    data: categoryData,
    isLoading: categoryDataLoading,
  } = useQuery({
    queryKey: ["getAllCategory"],
    queryFn: () => CategoryService.getCategories(),
  });


  const isOpen = () => {
    dispatch(setIsOpenCategoryCreateModal(true));
    dispatch(setId(""));
    dispatch(setCategoryName(""));
  };
  return (
    <>
      <div className='py-10 pl-10 pr-20'>
        <div className='flex justify-end  mb-10'>
          <button
            className='py-4 pl-6 pr-14 border-2 border-solid trnasition-all ease-in duration-100 border-black bg-[#6BE1FF] hover:bg-sky-400 active:bg-[#6BE1FF]'
            onClick={isOpen}
          >
            Создать категорию +
          </button>
        </div>

        <DataTable
          columns={categoryColumn}
          data={categoryData || []}
          loading={categoryDataLoading}
          pagination={false}
        />
      </div>

      {open && <CreateCategoryModal />}
    </>
  );
}
