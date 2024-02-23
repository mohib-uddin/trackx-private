"use client";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React from "react";
import Moment from "react-moment";

import { capitalizeAfterSpace } from "@/_utils/helpers";
import { leaveType } from "@/_utils/types/leave";
import UpdateLeaveStatus from "@/components/modules/leave-management/update-leave-status";

export default function LeaveCard({ leave }: { leave: leaveType }) {
  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="/avatars/avatar-1.png"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {capitalizeAfterSpace(
                leave.user.firstName + " " + leave.user.lastName,
              )}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              @{leave.user.firstName + leave.user.lastName}
            </h5>
          </div>
        </div>
        <Button color="primary" radius="full" size="sm" variant={"solid"}>
          {leave.leaveType}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>{leave.reason ? leave.reason : "Sick Leave"}</p>
        <span className="pt-2">
          <Moment format={"D MMMM"} date={leave.leaveFrom} />
          {" - "}
          <Moment format={"D MMMM"} date={leave.leaveTo} />
        </span>
      </CardBody>
      <CardFooter className="gap-3">
        <UpdateLeaveStatus leave={leave} />
      </CardFooter>
    </Card>
  );
}
