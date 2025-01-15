import { useAppDispatch, useAppSelector } from "@/hooks/redux-hooks";
import { addNotificationAxios } from "@/lib/utils/axiosNotifications";
import { notify } from "@/lib/utils/notify/notify";
import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product.service";
import { setIsOpenProductCreateModal, setProduct } from "@/store/productSlice";
import { ProductTypes } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, Select, Skeleton } from "antd";
import { useMemo } from "react";

export const CreateProductModal = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const open = useAppSelector(
    (state) => state.product.isOpenProductCreateModal
  );
  const product = useAppSelector((state) => state.product.product);

  const handleModalOk = () => {
    form.submit();
  };
  const onClose = () => {
    dispatch(setIsOpenProductCreateModal(false));
    dispatch(setProduct(null));
  };

  // POST PRODUCT
  const { mutate: addProduct, isPending: addProductLoading } = useMutation({
    mutationKey: ["addProduct"],
    mutationFn: (params: ProductTypes.ProductCreate) =>
      ProductService.addProduct(params),
    onSuccess: (res) => {
      if (res.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
        notify("success", "Товар успешно создан");
        onClose();
      }
    },
    onError: addNotificationAxios,
  });

  // PUT PRODUCT
  const { mutate: updateProduct, isPending: updateProductLoading } =
    useMutation({
      mutationKey: ["updateProduct"],
      mutationFn: (prod: ProductTypes.ProductCreate) =>
        ProductService.updateProduct(prod, product?.id || ""),
      onSuccess: (res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
          notify("success", "Категория успешно обновлена");
          onClose();
        }
      },
      onError: addNotificationAxios,
    });

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  // GET CATEGORIES
  const {
    data: categories,
    isLoading: categoriesLoading,
  } = useQuery({
    queryKey: ["getCAtegories"],
    queryFn: () => CategoryService.getCategories(),
  });

  const allCategoriesOptions = useMemo(
    () =>
      categories?.map((company) => ({
        value: company?.id,
        label: company?.name,
      })),
    [categories]
  );
  const handleChange = (value: any) => {};

  const handleSubmit = (value: ProductTypes.ProductFormValuetype) => {
    if (categories) {
      const selectedCategory = categories.find(
        (category) => category.id === value.category
      );
      if (selectedCategory) {
        if (product) {
          updateProduct({
            name: value.name,
            category: selectedCategory,
            description: value.description,
          });
        } else {
          addProduct({
            name: value.name,
            description: value.description,
            category: selectedCategory,
          });
        }
      } else {
        notify("error", "Соответствующая категория не найдена.");
      }
    } else {
      notify("error", "Нет доступных категорий");
    }
  };
  return (
    <Drawer
      maskClosable={false}
      title={product ? `Редактирование товара` : `Создание товара`}
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
            name='category'
            label='Категория'
            rules={[{ required: true }]}
            initialValue={product?.category?.id}
          >
            <Select
              showSearch
              optionFilterProp='children'
              options={allCategoriesOptions}
              onChange={handleChange}
              loading={categoriesLoading}
              placeholder='Выбирите...'
              notFoundContent={categoriesLoading ? <Skeleton /> : null}
              filterOption={filterOption}
            />
          </Form.Item>

          <Form.Item
            name='name'
            label='Наименование товара'
            rules={[{ required: true }]}
            initialValue={product?.name}
          >
            <Input placeholder='Название товара' />
          </Form.Item>

          <Form.Item
            name='description'
            label='Описание'
            rules={[{ required: true }]}
            initialValue={product?.description}
          >
            <Input.TextArea placeholder='Описание...' />
          </Form.Item>
        </Form>
      </div>

      <Button
        onClick={handleModalOk}
        loading={product ? updateProductLoading : addProductLoading}
      >
        Создать
      </Button>
    </Drawer>
  );
};
