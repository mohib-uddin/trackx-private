"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseTextArea from "@/components/common/form/base-textarea";
import LeaveManagementService from "@/services/leaves/client/leave.service";

const leaveSchema = z.object({
  leaveType: z.string(),
  leaveFrom: z.string(),
  leaveTo: z.string(),
  reason: z.string(),
});

export default function CreateLeaveForm() {
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
  const { useHandleCreateLeave } = LeaveManagementService();
  const { mutate: handleCreateLeave, isPending: isCreateLeavePending } =
    useHandleCreateLeave();

  const onSubmit = (data: any) => {
    handleCreateLeave(data);
  };
  return (
    <Card
      className={
        "flex justify-center items-center w-full md:w-[60%] lg:w-1/2 m-auto mt-20 flex-col"
      }
    >
      <CardHeader
        className={"m-auto justify-center mt-4 font-[600] text-center text-2xl"}
      >
        Leave Application
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col"}>
          <div className={"gap-4 mb-4 flex flex-col"}>
            <BaseSelect
              name={"leaveType"}
              placeholder={"Leave Type"}
              control={control}
              isString={true}
              variant={"underlined"}
              values={[
                { id: "PAID", name: "PAID" },
                { id: "UNPAID", name: "UNPAID" },
              ]}
              label={"Leave Type"}
            />
            <BaseInput
              type="date"
              control={control}
              name="leaveFrom"
              label="Leave From"
              placeholder="Enter  Leave Date"
              rules={{
                required: "Leave From is required",
              }}
            />
            <BaseInput
              type="date"
              control={control}
              name="leaveTo"
              label="Leave To"
              placeholder="Enter  Leave To"
              rules={{
                required: "Leave To is required",
              }}
            />

            <BaseTextArea
              control={control}
              name="reason"
              label="Reason"
              placeholder="Enter  Reason"
              rules={{
                required: "Reason is required",
              }}
            />
            <Button
              isLoading={isCreateLeavePending}
              type={"submit"}
              color={"primary"}
            >
              Submit Leave
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
