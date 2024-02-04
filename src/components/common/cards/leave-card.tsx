"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import React from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { capitalizeAfterSpace } from "@/_utils/helpers";
import { leaveType } from "@/_utils/types/leave";
import BaseInput from "@/components/common/form/base-input";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import LeaveManagementService from "@/services/leaves/client/leave.service";

const leaveSchema = z.object({
  acceptLeaveTo: z.string(),
  acceptLeaveFrom: z.string(),
  reviewComment: z.string(),
});

export default function LeaveCard({ leave }: { leave: leaveType }) {
  const { useHandleUpdateLeave } = LeaveManagementService();
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
    trigger,
    register,
    watch,
  } = useForm({
    resolver: zodResolver(leaveSchema),
  });
  const { mutate: handleUpdateLeave, isPending: isHandleUpdatePending } =
    useHandleUpdateLeave();

  const onApprove = (data: any) => {
    handleUpdateLeave({
      ...data,
      status: "APPROVED",
      id: leave.id,
    });
  };
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
        <div className="flex gap-1">
          <BaseFormModal
            name={"APPROVE"}
            type={"success"}
            title={"Approve Application"}
            handleSubmit={handleSubmit}
            action={onApprove}
            isLoading={isHandleUpdatePending}
          >
            <div className={"gap-4 mb-4 flex flex-col"}>
              <BaseInput
                type="date"
                control={control}
                name="acceptLeaveFrom"
                label="Accept From"
                placeholder=" Accept From"
                rules={{
                  required: "Accept From is required",
                }}
              />
              <BaseInput
                type="date"
                control={control}
                name="acceptLeaveTo"
                label="Accept To"
                placeholder="Accept To"
                rules={{
                  required: "Accept To To is required",
                }}
              />

              <BaseTextArea
                control={control}
                name="reviewComment"
                label="Review Comment"
                placeholder="Enter Review Comment"
              />
            </div>
          </BaseFormModal>

          <Button
            onClick={() => {
              handleUpdateLeave({
                id: leave.id,
                status: "REJECTED",
                acceptLeaveFrom: new Date().toISOString(),
                acceptLeaveTo: new Date().toISOString(),
              });
            }}
            color="danger"
            radius="full"
            size="sm"
            isLoading={isHandleUpdatePending}
          >
            REJECT
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
