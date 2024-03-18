"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { DESIGNATION_COLS } from "@/_utils/data/tables/designation";
import { designationType } from "@/_utils/types/designation";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseInput from "@/components/common/form/base-input";
import BaseSearch from "@/components/common/form/base-search";
import BaseSelect from "@/components/common/form/base-select";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import { Switch } from "@/components/common/switch/base-switch";
import BaseTable from "@/components/common/tables/base-table";
import DesignationService from "@/services/designation/client/designation.service";

const limit = 10;

const designationSchema = z.object({
  name: z.string().min(1, "Designation Is Required"),
  reportsTo: z.number(),
});
const editDesignationSchema = z.object({
  name: z.string().min(1, "Designation Is Required"),
  id: z.string(),
  reportsTo: z.number(),
});

export default function ViewAllDesignations() {
  const {
    useFetchAllDesignations,
    useHandleCreateDesignation,
    useHandleDeleteDesignation,
    useHandleUpdateDesignation,
  } = DesignationService();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(designationSchema),
    shouldUnregister: false,
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm({
    resolver: zodResolver(editDesignationSchema),
    shouldUnregister: false,
  });

  const { data: designationData, isLoading: isDesignationDataLoading } =
    useFetchAllDesignations(page, searchQuery, isActive);
  const {
    mutate: handleCreateDesignation,
    isPending: isCreateDesignationPending,
  } = useHandleCreateDesignation();
  const {
    mutate: handleUpdateDesignation,
    isPending: isUpdateDesignationPending,
  } = useHandleUpdateDesignation();
  const {
    mutate: handleDeleteDesignation,
    isPending: isDeleteDesignationPending,
  } = useHandleDeleteDesignation();
  const router = useRouter();
  const renderCell = React.useCallback(
    (designation: designationType, columnKey: Key) => {
      const cellValue = designation[columnKey as keyof designationType];

      switch (columnKey) {
        case "name":
          return <p>{designation.name}</p>;
        case "createdAt":
          return <Moment format={"YYYY/MM/DD"} date={designation.createdAt} />;
        case "actions":
          if (!designation.status) {
            return <div></div>;
          }
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  onClick={() =>
                    router.push(`/hr/designations/${designation.id}`)
                  }
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <BaseFormModal
                  name={"Edit Designation"}
                  title={"Edit Designation"}
                  isIconButton={true}
                  openCallback={() => {
                    setEditValue("name", designation.name);
                    setEditValue("id", designation.id.toString());
                    setEditValue("reportsTo", designation.reportsTo.toString());
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateDesignation}
                >
                  <div className={"flex flex-col gap-y-4"}>
                    <BaseInput
                      placeholder={"Enter Designation Name"}
                      name={"name"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseSelect
                      name={"reportsTo"}
                      placeholder={"Reports To"}
                      variant={"underlined"}
                      control={editControl}
                      values={designationData?.data}
                      label={"Reports To"}
                    />
                  </div>
                </BaseFormModal>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <DeleteConfirmationModal
                  deleteCallback={() => handleDeleteDesignation(designation.id)}
                  isLoading={isDeleteDesignationPending}
                />
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [isDesignationDataLoading],
  );

  const loadingState = isDesignationDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        <div className={"w-3/4"}>
          <BaseSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
            placeholder={"Search"}
          />
        </div>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          <div className={"flex gap-4 items-center"}>
            <p>Is Active?</p>
            <Switch defaultChecked={true} onCheckedChange={setIsActive} />
          </div>
          <BaseFormModal
            handleSubmit={handleSubmit}
            action={handleCreateDesignation}
            name={"Add"}
            title={"New Designation"}
          >
            <div className={"flex flex-col gap-y-4"}>
              <BaseInput
                placeholder={"Enter Designation Name"}
                name={"name"}
                type={"text"}
                control={control}
              />
              <BaseSelect
                variant={"underlined"}
                values={designationData?.data}
                control={control}
                name="reportsTo"
                label="Reports To"
                placeholder="Reports To"
                rules={{
                  required: "Designation is required",
                }}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [searchQuery, page, isActive, isDesignationDataLoading]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"View Designations"} />
      <BaseTable
        cols={DESIGNATION_COLS}
        key={"designation"}
        topContent={topContent}
        pages={designationData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={designationData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
