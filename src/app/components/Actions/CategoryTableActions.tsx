import { useAppDispatch } from "@/hooks/redux-hooks";
import { addNotificationAxios } from "@/lib/utils/axiosNotifications";
import { notify } from "@/lib/utils/notify/notify";
import { CategoryService } from "@/services/category.service";
import {
  setCategoryName,
  setId,
  setIsOpenCategoryCreateModal,
} from "@/store/categorySlice";
import { CategoryTypes } from "@/types/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { FC } from "react";

type Props = {
  category: CategoryTypes.Category;
};
export const CategorytableAction: FC<Props> = ({ category }) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  // DELETE CATEGORY
  const { mutate: deleteCategory, isPending: deleteCategoryLoading } =
    useMutation({
      mutationKey: ["deleteCategory"],
      mutationFn: (params: string) => CategoryService.deleteCategory(params),

      onSuccess: (res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
          notify("success", "Категория успешно удалена");
        }
      },
      onError: addNotificationAxios,
    });
  const handleDelete = () => {
    deleteCategory(category.id);
  };

  const isOpenEditModal = () => {
    dispatch(setId(category.id));
    dispatch(setCategoryName(category.name));
    dispatch(setIsOpenCategoryCreateModal(true));
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
        loading={deleteCategoryLoading}
      ></Button>
    </div>
  );
};
