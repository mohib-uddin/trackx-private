import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { leaveType } from "@/_utils/types/leave";
import BaseDatePicker from "@/components/common/form/base-date-picker";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import LeaveManagementService from "@/services/leaves/client/leave.service";

const leaveSchema = z.object({
  acceptLeaveTo: z.date(),
  acceptLeaveFrom: z.date(),
  reviewComment: z.string(),
});

const UpdateLeaveStatus = ({ leave }: { leave: leaveType }) => {
  const { useHandleUpdateLeave } = LeaveManagementService();
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      acceptLeaveFrom: new Date(leave.leaveFrom),
      acceptLeaveTo: new Date(leave.leaveTo),
      reviewComment: "",
    },
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
          <BaseDatePicker
            label="Accept From"
            placeholder="Accept From"
            variant={"underlined"}
            control={control}
            name="acceptLeaveFrom"
            rules={{
              required: "Accept From is required",
            }}
          />
          <BaseDatePicker
            label="Accept To"
            placeholder="Accept To"
            variant={"underlined"}
            control={control}
            name="acceptLeaveTo"
            rules={{
              required: "Accept To is required",
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
            reviewComment: "",
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
  );
};
export default UpdateLeaveStatus;
