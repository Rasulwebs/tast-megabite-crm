import { CategoryTypes } from "@/types/category";
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
    render: (value, record) => <CategorytableAction category={record} />,
  },
];
