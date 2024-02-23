"use client";
import { Chip } from "@nextui-org/chip";
import { DeleteIcon, EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import React, { Key, useMemo, useState } from "react";

import {
  EMPLOYEE_COLS,
  employeeStatusColorMap,
} from "@/_utils/data/tables/employees";
import { employeeType } from "@/_utils/types/employees";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseSearch from "@/components/common/form/base-search";
import BaseHeader from "@/components/common/header/base-header";
import BaseTable from "@/components/common/tables/base-table";
import EmployeeService from "@/services/employees/client/employee.service";

const limit = 10;

export default function ViewAllEmployees() {
  const { useFetchAllEmployees } = EmployeeService();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: employeeData, isLoading: isEmployeeDataLoading } =
    useFetchAllEmployees(true, page, limit, searchQuery);
  const router = useRouter();
  const renderCell = React.useCallback((user: employeeType, columnKey: Key) => {
    const cellValue = user[columnKey as keyof employeeType];

    switch (columnKey) {
      case "name":
        return (
          <User
            description={user.email}
            name={`${user.firstName}${user.lastName}`}
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
            color={employeeStatusColorMap[user?.employmentStatus?.name]}
            size="sm"
            variant="flat"
          >
            {user?.employmentStatus?.name}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                onClick={() => router.push(`/hr/employee/${user.id}`)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const pages = useMemo(() => {
    return employeeData?.data.length
      ? Math.ceil(employeeData.data.length / limit)
      : 0;
  }, [employeeData?.data.length, limit, searchQuery]);

  const loadingState = isEmployeeDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <BaseSearch
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setPage={setPage}
        placeholder={"Search"}
      />
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
        pages={pages}
        page={page}
        data={employeeData?.data}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
