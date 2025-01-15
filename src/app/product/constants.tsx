import { CategoryTypes } from "@/types/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnType } from "antd/es/table";
import { CategorytableAction } from "../components/Actions/CategoryTableActions";
import { ProductTableAction } from "../components/Actions/ProductTableAction";
import { ProductTypes } from "../../types/product";

export const productColumn: ColumnType<ProductTypes.Product>[] = [
  {
    key: "index",
    dataIndex: "index",
    title: "№",
    align: "center",
    render: (value, record, index) => index + 1,
  },
  {
    title: "Наименование",
    dataIndex: "name",
    key: "name",
  },
  //   {
  //     title: "Категория",
  //     dataIndex: "categoryName",
  //     key: "categoryName",
  //   },
  {
    title: "Категория",
    dataIndex: "categoryName",
    key: "categoryName",
    render: (value, record, index) => <>{record?.category?.name}</>,
  },

  {
    title: "Действие",
    dataIndex: "action",
    key: "action",
    render: (value, record, index) => <ProductTableAction product={record} />,
  },
];
