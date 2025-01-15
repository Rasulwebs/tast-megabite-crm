import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { addNotificationAxios } from "@/lib/utils/axiosNotifications";
import { notify } from "@/lib/utils/notify/notify";
import { CategoryService } from "@/services/category.service";
import {
  setCategoryName,
  setId,
  setIsOpenCategoryCreateModal,
} from "@/store/categorySlice";
import { CategoryTypes } from "@/types/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Form, Input } from "antd";

export const CreateCategoryModal = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const open = useAppSelector(
    (state) => state.category.isOpenCategoryCreateModal
  );
  const categoryName = useAppSelector((state) => state.category.categoryName);
  const categoryId = useAppSelector((state) => state.category.id);

  const handleModalOk = () => {
    form.submit();
  };
  const onClose = () => {
    dispatch(setIsOpenCategoryCreateModal(false));
  };

  // POST CATEGORY
  const { mutate: addCategory, isPending: addCategoryLoading } = useMutation({
    mutationKey: ["addCategory"],
    mutationFn: (params: CategoryTypes.CreateCategory) =>
      CategoryService.addCategory(params),
    onSuccess: (res) => {
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
        notify("success", "Категория успешно создана");
        onClose();
      }
    },
    onError: addNotificationAxios,
  });

  // PUT CATEGORY
  const { mutate: updateCategory, isPending: updateCategoryLoading } =
    useMutation({
      mutationKey: ["updateCategory"],
      mutationFn: (cat: CategoryTypes.PutCategory) =>
        CategoryService.updateCategory(cat, categoryId),
      onSuccess: (res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
          notify("success", "Категория успешно обновлена");
          onClose();
          dispatch(setId(""));
          dispatch(setCategoryName(""));
        }
      },
      onError: addNotificationAxios,
    });

  const handleSubmit = (value: CategoryTypes.CreateCategory) => {
    if (categoryId?.length) {
      updateCategory(value);
    } else {
      addCategory(value);
    }
  };
  return (
    <Drawer
      maskClosable={false}
      title={categoryId ? `Редактирование категории` : `Создание котегория`}
      onClose={onClose}
      open={open}
    >
      <div>
        <Form
          onFinish={handleSubmit}
          form={form}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            name='name'
            label='Наименование категории'
            rules={[{ required: true }]}
            initialValue={categoryName}
          >
            <Input placeholder='Название категории' />
          </Form.Item>
        </Form>
      </div>

      <Button
        onClick={handleModalOk}
        loading={categoryId ? updateCategoryLoading : addCategoryLoading}
      >
        {categoryId ? `Обновить` : `Создать`}
      </Button>
    </Drawer>
  );
};
