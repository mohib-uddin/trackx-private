"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip } from "@nextui-org/chip";
import { DeleteIcon, EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import Link from "next/link";
import React, { Key, useMemo, useState } from "react";
import { CSVLink } from "react-csv";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { EMPLOYEE_COLS } from "@/_utils/data/tables/employees";
import { getMedia } from "@/_utils/helpers/get-media";
import { employeeType } from "@/_utils/types/employees";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseDropzone from "@/components/common/form/base-dropzone";
import BaseSearch from "@/components/common/form/base-search";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import BaseTable from "@/components/common/tables/base-table";
import EmployeeService from "@/services/employees/client/employee.service";

const limit = 10;

const employeeSchema = z.object({
  file: z.any(),
});

export default function ViewAllEmployees() {
  const { useFetchAllEmployees, useHandleUploadEmployeeCSV } =
    EmployeeService();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(employeeSchema),
    shouldUnregister: false,
  });

  const { data: employeeData, isLoading: isEmployeeDataLoading } =
    useFetchAllEmployees(true, page, limit, searchQuery);
  const { mutate: handleUploadCSV, isPending: isHandleUploadCSVPending } =
    useHandleUploadEmployeeCSV();
  const renderCell = React.useCallback(
    (user: employeeType, columnKey: Key) => {
      const cellValue = user[columnKey as keyof employeeType];

      switch (columnKey) {
        case "name":
          return (
            <User
              description={user.email}
              name={`${user.firstName}${user.lastName}`}
              avatarProps={{
                src: user?.image
                  ? getMedia(`/user/${user?.id}/profile-image/${user?.image}`)
                  : undefined,
                isBordered: true,
                fallback: <div>{user?.firstName[0].toUpperCase()}</div>,
              }}
            >
              {user?.email}
            </User>
          );
        case "designation":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{user?.role?.name}</p>
              <p className="text-bold text-sm capitalize text-default-400">
                {user?.department?.name}
              </p>
            </div>
          );
        case "shift":
          return (
            <p className="text-bold text-sm capitalize">{user?.shift?.name}</p>
          );
        case "status":
          if (!user.employmentStatus?.name) {
            return <p>-</p>;
          }
          return (
            <Chip
              className="capitalize"
              size="sm"
              variant="flat"
              classNames={{
                base: `!bg-[${user.employmentStatus.colourValue}]`,
                // content: "text-black",
              }}
            >
              {user?.employmentStatus?.name}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <Link
                  href={`/hr/employee/${user.id}`}
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </Link>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [isEmployeeDataLoading],
  );

  const csvFields = [["firstName", "lastName"]];

  const loadingState = isEmployeeDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex flex-wrap justify-between items-center"}>
        <div className={"w-3/4"}>
          <BaseSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
            placeholder={"Search"}
          />
        </div>

        <BaseFormModal
          name={"Import Employees"}
          title={"Add Employees"}
          handleSubmit={handleSubmit}
          actionTitle={"Upload"}
          action={handleUploadCSV}
        >
          <div className={"text-primary"}>
            <CSVLink data={csvFields}>Download Sample CSV</CSVLink>
          </div>
          <BaseDropzone
            desc={"Upload Your Employees In A CSV Format"}
            name={"file"}
            multiple={true}
            maxFiles={1}
            control={control}
          />
        </BaseFormModal>
      </div>
    );
  }, [searchQuery, page]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"View Employees"} />
      <BaseTable
        setPage={setPage}
        cols={EMPLOYEE_COLS}
        key={"firstName"}
        topContent={topContent}
        pages={employeeData?.lastPage || 1}
        page={page}
        data={employeeData?.data}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
