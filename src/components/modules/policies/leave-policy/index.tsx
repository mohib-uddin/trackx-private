"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { DESIGNATION_COLS } from "@/_utils/data/tables/designation";
import { leavePolicyType } from "@/_utils/types/leave-policy";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseInput from "@/components/common/form/base-input";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import { Switch } from "@/components/common/switch/base-switch";
import BaseTable from "@/components/common/tables/base-table";
import LeavePolicyService from "@/services/leave-policy/client/leave-policy.service";

export const leavePolicySchema = z.object({
  name: z.string().min(1, "Designation Is Required"),
  paidLeaveCount: z.number({ required_error: "Paid Leave Count Is Required" }),
  unpaidLeaveCount: z.number({
    required_error: "Unpaid Leave Count Is Required",
  }),
});
export const editLeavePolicySchema = leavePolicySchema.extend({
  id: z.string(),
});

export default function ViewLeavePolicies() {
  const {
    useFetchAllLeavePolicies,
    useHandleUpdateLeavePolicy,
    useHandleDeleteLeavePolicy,
    useHandleCreateLeavePolicy,
  } = LeavePolicyService();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("all");
  const [isActive, setIsActive] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(leavePolicySchema),
    shouldUnregister: false,
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm({
    resolver: zodResolver(editLeavePolicySchema),
    shouldUnregister: false,
  });

  const { data: leavePolicyData, isLoading: isLeavePolicyDataLoading } =
    useFetchAllLeavePolicies(page, query);
  const {
    mutate: handleCreateLeavePolicy,
    isPending: isHandleCreateLeavePolicyPending,
  } = useHandleCreateLeavePolicy();
  const {
    mutate: handleUpdateLeavePolicy,
    isPending: isHandleUpdateLeavePolicyPending,
  } = useHandleUpdateLeavePolicy();
  const {
    mutate: handleDeleteLeavePolicy,
    isPending: isHandleDeleteLeavePolicyPending,
  } = useHandleDeleteLeavePolicy();
  const router = useRouter();
  const renderCell = React.useCallback(
    (leavePolicy: leavePolicyType, columnKey: Key) => {
      const cellValue = leavePolicy[columnKey as keyof leavePolicyType];

      switch (columnKey) {
        case "name":
          return <p>{leavePolicy.name}</p>;
        case "createdAt":
          return <Moment format={"YYYY/MM/DD"} date={leavePolicy.createdAt} />;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit">
                <BaseFormModal
                  name={"Edit Leave Policy"}
                  title={"Edit Leave Policy"}
                  isIconButton={true}
                  openCallback={() => {
                    setEditValue("name", leavePolicy.name);
                    setEditValue("paidLeaveCount", leavePolicy.paidLeaveCount);
                    setEditValue("id", leavePolicy.id.toString());

                    setEditValue(
                      "unpaidLeaveCount",
                      leavePolicy.unpaidLeaveCount,
                    );
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateLeavePolicy}
                >
                  <div className={"flex flex-col gap-y-4"}>
                    <BaseInput
                      placeholder={"Enter Policy Name"}
                      label={"Policy Name"}
                      name={"name"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Unpaid Leave Count"}
                      label={"Unpaid Count"}
                      name={"unpaidLeaveCount"}
                      type={"number"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Paid Leave Count"}
                      label={"Paid Count"}
                      name={"paidLeaveCount"}
                      type={"number"}
                      control={editControl}
                    />
                  </div>
                </BaseFormModal>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <DeleteConfirmationModal
                  deleteCallback={() => handleDeleteLeavePolicy(leavePolicy.id)}
                  isLoading={isHandleDeleteLeavePolicyPending}
                />
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const loadingState = isLeavePolicyDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          {/*<div className={"flex gap-4 items-center"}>*/}
          {/*  <p>Is Active?</p>*/}
          {/*  <Switch defaultChecked={true} onCheckedChange={setIsActive} />*/}
          {/*</div>*/}
          <BaseFormModal
            handleSubmit={handleSubmit}
            action={handleCreateLeavePolicy}
            name={"Create"}
            title={"New Leave Policy"}
          >
            <div className={"flex flex-col gap-y-4"}>
              <BaseInput
                placeholder={"Enter Policy Name"}
                label={"Policy Name"}
                name={"name"}
                type={"text"}
                control={control}
              />
              <BaseInput
                placeholder={"Unpaid Leave Count"}
                label={"Unpaid Count"}
                name={"unpaidLeaveCount"}
                type={"number"}
                control={control}
              />
              <BaseInput
                placeholder={"Paid Leave Count"}
                label={"Paid Count"}
                name={"paidLeaveCount"}
                type={"number"}
                control={control}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [page, isActive]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"Leave Policy"} />
      <BaseTable
        cols={DESIGNATION_COLS}
        key={"leave-policy"}
        topContent={topContent}
        pages={leavePolicyData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={leavePolicyData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
