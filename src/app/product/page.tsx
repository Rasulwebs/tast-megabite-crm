"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "../components/DataTable/datatable";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { productColumn } from "./constants";
import { setIsOpenProductCreateModal, setProduct } from "@/store/productSlice";
import { CreateProductModal } from "../components/CreateProductModal";
import { ProductService } from "@/services/product.service";

export default function Product() {
  const dispatch = useAppDispatch();
  const open = useAppSelector(
    (state) => state.product.isOpenProductCreateModal
  );
  const {
    data: productData,
    isLoading: productDataLoading,
  } = useQuery({
    queryKey: ["getAllProduct"],
    queryFn: () => ProductService.getProducts(),
  });


  const isOpen = () => {
    dispatch(setProduct(null));
    dispatch(setIsOpenProductCreateModal(true));
  };
  return (
    <>
      <div className='py-10 pl-10 pr-20'>
        <div className='flex justify-end  mb-10'>
          <button
            className='py-4 pl-6 pr-14 border-2 border-solid trnasition-all ease-in duration-100 border-black bg-[#6BE1FF] hover:bg-sky-400 active:bg-[#6BE1FF]'
            onClick={isOpen}
          >
            Создать товар +
          </button>
        </div>

        <DataTable
          columns={productColumn}
          data={productData || []}
          loading={productDataLoading}
          pagination={false}
        />
      </div>

      {open && <CreateProductModal />}
    </>
  );
}
