import { CategoryTypes } from "@/types/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ColumnType } from "antd/es/table";
import { CategorytableAction } from "../components/Actions/CategoryTableActions";

export const categoryColumn: ColumnType<CategoryTypes.Category>[] = [
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

  {
    title: "Действие",
    dataIndex: "action",
    key: "action",
    render: (value, record, index) => <CategorytableAction category={record} />,
  },
];
