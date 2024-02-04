import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { Key, SetStateAction } from "react";

interface Props {
  pages: number;
  loadingState: "loading" | "idle";
  renderCell: (item: any, columnKey: Key) => any;
  data: any;
  topContent: React.ReactNode;
  key: string;
  cols: { name: string; uid: string }[];
  page: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

const BaseTable = ({
  pages,
  loadingState,
  renderCell,
  data,
  topContent,
  cols,
  page,
  setPage,
}: Props) => {
  return (
    <Table
      aria-label="Example table with client async pagination"
      className={"text-[#52525B]"}
      bottomContent={
        pages > 1 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(newPage) => setPage(newPage)}
            />
          </div>
        ) : null
      }
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={cols}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={data ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          //@ts-ignore
          <TableRow key={item.firstName}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
export default BaseTable;
