"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@nextui-org/switch";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { DESIGNATION_COLS } from "@/_utils/data/tables/designation";
import { employmentStatusType } from "@/_utils/types/employees";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseColorPicker from "@/components/common/form/base-color-picker";
import BaseInput from "@/components/common/form/base-input";
import BaseSearch from "@/components/common/form/base-search";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import BaseTable from "@/components/common/tables/base-table";
import EmployeeService from "@/services/employees/client/employee.service";

export const employmentStatusSchema = z.object({
  name: z
    .string({ required_error: "Employment Status Is Required" })
    .min(2, "Must Be Atleast 2 Characters"),
  colourValue: z.string(),
  description: z.string().optional(),
});

export default function ManageEmploymentStatus() {
  const {
    useFetchAllEmploymentStatus,
    useHandleDeleteEmploymentStatus,
    useHandleCreateEmploymentStatus,
  } = EmployeeService();

  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(true);
  const { data: employmentStatusData, isLoading: isEmploymentStatusLoading } =
    useFetchAllEmploymentStatus(isActive, 1);
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(employmentStatusSchema),
    shouldUnregister: false,
  });
  const {
    mutate: handleDeleteEmploymentStatus,
    isPending: isHandleDeleteEmploymentStatusPending,
  } = useHandleDeleteEmploymentStatus();
  const {
    mutate: handleCreateEmploymentStatus,
    isPending: isHandleCreateEmploymentStatusPending,
  } = useHandleCreateEmploymentStatus();
  const router = useRouter();
  const renderCell = React.useCallback(
    (employmentStatus: employmentStatusType, columnKey: Key) => {
      const cellValue =
        employmentStatus[columnKey as keyof employmentStatusType];

      switch (columnKey) {
        case "name":
          return <p>{employmentStatus.name}</p>;
        case "createdAt":
          return (
            <Moment format={"YYYY/MM/DD"} date={employmentStatus.createdAt} />
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip color="danger" content="Delete user">
                <DeleteConfirmationModal
                  deleteCallback={() =>
                    handleDeleteEmploymentStatus(employmentStatus?.id)
                  }
                  isLoading={isHandleDeleteEmploymentStatusPending}
                />
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [isEmploymentStatusLoading],
  );

  const loadingState = isEmploymentStatusLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        <div className={"w-3/4"}>
          {/*<BaseSearch*/}
          {/*  searchQuery={searchQuery}*/}
          {/*  setSearchQuery={setSearchQuery}*/}
          {/*  setPage={setPage}*/}
          {/*  placeholder={"Search"}*/}
          {/*/>*/}
        </div>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          <BaseFormModal
            handleSubmit={handleSubmit}
            action={handleCreateEmploymentStatus}
            name={"Add"}
            title={"New Employment Status"}
            actionTitle={"Create"}
          >
            <div className={"flex flex-col gap-y-4"}>
              <BaseInput
                label={"Employment Status"}
                placeholder={"Enter Employment Status"}
                name={"name"}
                type={"text"}
                control={control}
              />
              <BaseColorPicker name={"colourValue"} control={control} />
              <BaseTextArea
                label={"Description"}
                placeholder={"Enter Description"}
                name={"description"}
                control={control}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [searchQuery, page, isActive, isEmploymentStatusLoading]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"View Employment Status"} />
      <BaseTable
        cols={DESIGNATION_COLS}
        key={"employment-status"}
        topContent={topContent}
        pages={employmentStatusData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={employmentStatusData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
