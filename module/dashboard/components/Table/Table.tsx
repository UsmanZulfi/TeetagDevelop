import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import Delete from "../Svg/Delete";
import Edit from "../Svg/Edit";
import styles from "./Table.module.css";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  link?: string;
  showActions?: boolean;
  type?: string;
  editLink?: string;
}

export const Table = <T extends object>({
  data,
  columns,
  link,
  showActions,
  type,
  editLink,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowValues, setRowValues] = useState<T>({} as T);

  return (
    <div className={styles.table_wrapper}>
      {showActions && deleteModalOpen && (
        <DeleteModal
          user={rowValues}
          title={"Delete"}
          setOpen={setDeleteModalOpen}
          type={type}
        ></DeleteModal>
      )}

      <table className="table-fixed w-full">
        <thead className={styles.table_head}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className={styles.table_head}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
              {showActions && <th className={styles.table_head}>Actions</th>}
            </tr>
          ))}
        </thead>
        <tbody className={styles.table_body}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={styles.table_row}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className={styles.table_column}>
                  {link ? (
                    <Link
                      href={`/dashboard/${link}/${row.original["id"]}`}
                      key={row.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Link>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                </td>
              ))}
              {showActions && (
                <td className={styles.table_column}>
                  <div className="flex items-center justify-center gap-6">
                    <Link
                      href={`/dashboard/${editLink || `${link}/edit`}/${
                        row.original["id"]
                      }`}
                    >
                      <button>
                        <Edit />
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        setRowValues(row.original);
                        setDeleteModalOpen(true);
                      }}
                    >
                      <Delete />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
