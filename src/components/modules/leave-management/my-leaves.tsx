"use client";
import { Chip } from "@nextui-org/chip";
import { EyeIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import Moment from "react-moment";

import { employeeStatusColorMap } from "@/_utils/data/tables/employees";
import {
  leaveStatusColorMap,
  MY_LEAVE_COLS,
} from "@/_utils/data/tables/leaves";
import { leaveType } from "@/_utils/types/leave";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseTable from "@/components/common/tables/base-table";
import LeaveManagementService from "@/services/leaves/client/leave.service";

export default function MyLeaves({ userId }: { userId: string }) {
  const { useFetchSingleUserLeaves } = LeaveManagementService();
  const [page, setPage] = useState(1);

  const { data: leavesData, isLoading: isLeavesDataLoading } =
    useFetchSingleUserLeaves(userId);
  const router = useRouter();
  const renderCell = React.useCallback((leave: leaveType, columnKey: Key) => {
    const cellValue = leave[columnKey as keyof leaveType];

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className="capitalize"
            color={leaveStatusColorMap[leave.status]}
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
      case "acceptLeaveFrom":
        return <Moment format={"YYYY/MM/DD"} date={leave.acceptedLeaveFrom} />;
      case "acceptLeaveTo":
        return <Moment format={"YYYY/MM/DD"} date={leave.acceptedLeaveTo} />;
      case "reviewComment":
        if (!leave.reviewComment) {
          return <p>None</p>;
        }
        return <p>{leave.reviewComment}</p>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                onClick={() => router.push(`/leaves/my-leaves/${leave.id}`)}
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
  }, [userId]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"My Leaves"} />
      <BaseTable
        cols={MY_LEAVE_COLS}
        key={"leaves"}
        topContent={topContent}
        pages={1}
        page={page}
        setPage={setPage}
        data={leavesData?.singleLeave || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
