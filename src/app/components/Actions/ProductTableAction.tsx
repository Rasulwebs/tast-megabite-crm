import { useAppDispatch } from "@/hooks/redux-hooks";
import { addNotificationAxios } from "@/lib/utils/axiosNotifications";
import { notify } from "@/lib/utils/notify/notify";
import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product.service";
import {
  setCategoryName,
  setIsOpenCategoryCreateModal,
} from "@/store/categorySlice";
import { setIsOpenProductCreateModal, setProduct } from "@/store/productSlice";
import { CategoryTypes } from "@/types/category";
import { ProductTypes } from "@/types/product";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { FC } from "react";

type Props = {
  product: ProductTypes.Product;
};
export const ProductTableAction: FC<Props> = ({ product }) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  // DELETE CATEGORY
  const { mutate: deleteProduct, isPending: deleteProductLoading } =
    useMutation({
      mutationKey: ["deleteProduct"],
      mutationFn: (id: string) => ProductService.deleteProduct(id),

      onSuccess: (res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
          notify("success", "Продукт успешно удалена");
        }
      },
      onError: addNotificationAxios,
    });
  const handleDelete = () => {
    deleteProduct(product.id);
  };

  const isOpenEditModal = () => {
    dispatch(setProduct(product));
    dispatch(setIsOpenProductCreateModal(true));
  };

  return (
    <div className='flex gap-2'>
      <Button
        icon={<EditOutlined />}
        size='small'
        onClick={isOpenEditModal}
      ></Button>
      <Button
        icon={<DeleteOutlined />}
        size='small'
        onClick={handleDelete}
        loading={deleteProductLoading}
      ></Button>
    </div>
  );
};
