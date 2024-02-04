"use client";
import { Chip } from "@nextui-org/chip";
import { EyeIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import Moment from "react-moment";

import { employeeStatusColorMap } from "@/_utils/data/tables/employees";
import { LEAVE_COLS } from "@/_utils/data/tables/leaves";
import { capitalizeAfterSpace } from "@/_utils/helpers";
import { leaveType } from "@/_utils/types/leave";
import BaseSearch from "@/components/common/form/base-search";
import BaseTable from "@/components/common/tables/base-table";
import LeaveManagementService from "@/services/leaves/client/leave.service";

const limit = 10;

export default function ViewAllLeaves() {
  const { useFetchAllLeaves } = LeaveManagementService();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("all");

  const { data: leavesData, isLoading: isLeavesDataLoading } =
    useFetchAllLeaves(status, page, limit);
  const router = useRouter();
  const renderCell = React.useCallback((leave: leaveType, columnKey: Key) => {
    const cellValue = leave[columnKey as keyof leaveType];

    switch (columnKey) {
      case "name":
        return (
          <User
            // description={user.email}
            name={capitalizeAfterSpace(
              leave.user.firstName + " " + leave.user.lastName,
            )}
          >
            {/*{user.email}*/}
          </User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={employeeStatusColorMap[leave.status]}
            size="sm"
            variant="flat"
          >
            {leave.status}
          </Chip>
        );
      case "leaveFrom":
        return <Moment format={"YYYY/MM/DD"} date={leave.leaveFrom} />;
      case "leaveTo":
        return <Moment format={"YYYY/MM/DD"} date={leave.leaveTo} />;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                onClick={() => router.push(`/hr/designations/${leave.id}`)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const loadingState = isLeavesDataLoading ? "loading" : "idle";

  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        {/*<div className={"w-3/4"}>*/}
        {/*  <BaseSearch*/}
        {/*    searchQuery={searchQuery}*/}
        {/*    setSearchQuery={setSearchQuery}*/}
        {/*    setPage={setPage}*/}
        {/*    placeholder={"Search"}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    );
  }, [page, status]);
  return (
    <div className={"flex flex-col justify-center"}>
      <h2 className={"font-[600] text-2xl mt-8 mb-4"}>View Leaves</h2>
      <BaseTable
        cols={LEAVE_COLS}
        key={"leaves"}
        topContent={topContent}
        pages={leavesData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={leavesData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
