"use client";
import { CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import React from "react";
import Moment from "react-moment";

import { leaveStatusColorMap } from "@/_utils/data/tables/leaves";
import { capitalizeAfterSpace } from "@/_utils/helpers";
import { singleLeaveType } from "@/_utils/types/leave";
import UpdateLeaveStatus from "@/components/modules/leave-management/update-leave-status";

const SingleLeaveDetails = ({
  leave,
  readonly,
}: {
  leave: singleLeaveType;
  readonly: boolean;
}) => {
  return (
    <>
      <div className={"flex flex-col gap-y-2"}>
        <div className={"flex gap-4 items-center"}>
          <p>Name:</p>
          <p>
            {capitalizeAfterSpace(
              leave.data.user?.firstName + " " + leave.data.user?.lastName,
            )}
          </p>
        </div>
        <div className={"flex gap-4 items-center"}>
          <p>Leave Type:</p>
          <p>{leave.data.leaveType}</p>
        </div>
        <div className={"flex gap-4 items-center"}>
          <p>Leave Duration:</p>
          <span className={"flex items-center gap-1"}>
            <Moment format={"MM/DD/YYYY"} date={leave.data.leaveFrom} />
            <p>-</p>
            <Moment format={"MM/DD/YYYY"} date={leave.data.leaveTo} />
          </span>
        </div>
        <div className={"flex gap-4 items-center"}>
          <p>Leave Status:</p>
          <Chip
            className="capitalize"
            color={leaveStatusColorMap[leave.data.status]}
            size="sm"
            variant="flat"
          >
            {leave.data.status}
          </Chip>
        </div>

        {leave.data.status === "APPROVED" && leave.data.acceptLeaveBy && (
          <div className={"flex gap-4 items-center"}>
            <p>Leave Accepted By:</p>
            <p>
              {capitalizeAfterSpace(
                leave.data.acceptLeaveBy?.firstName +
                  " " +
                  leave.data.acceptLeaveBy?.lastName,
              )}
            </p>
          </div>
        )}
        {leave.data.status === "APPROVED" && (
          <div className={"flex gap-4 items-center"}>
            <p>Accepted Duration:</p>
            <span className={"flex items-center gap-1"}>
              <Moment
                format={"MM/DD/YYYY"}
                date={leave.data.acceptedLeaveFrom}
              />
              <p>-</p>
              <Moment format={"MM/DD/YYYY"} date={leave.data.acceptedLeaveTo} />
            </span>
          </div>
        )}
        {leave.data.status !== "PENDING" && (
          <div className={"flex gap-4 items-center"}>
            <p>Review Comment:</p>
            <p>{leave.data.reviewComment ?? "None"}</p>
          </div>
        )}
        <div className={"flex gap-4 items-center"}>
          <p>Attachment:</p>
          <p>{leave.data.attachment ? leave.data.attachment : "None"}</p>
        </div>
      </div>
      {!readonly && leave.data.status === "PENDING" && (
        <CardFooter className="gap-3">
          <UpdateLeaveStatus leave={leave.data} />
        </CardFooter>
      )}
    </>
  );
};
export default SingleLeaveDetails;
