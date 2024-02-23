"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { Switch } from "@nextui-org/switch";
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
import BaseHeader from "@/components/common/header/base-header";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import BaseTable from "@/components/common/tables/base-table";
import DesignationService from "@/services/designation/client/designation.service";

const limit = 10;

const designationSchema = z.object({
  name: z.string().min(1, "Designation Is Required"),
});
const editDesignationSchema = z.object({
  name: z.string().min(1, "Designation Is Required"),
  id: z.string(),
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
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateDesignation}
                >
                  <div>
                    <BaseInput
                      placeholder={"Enter Designation Name"}
                      name={"name"}
                      type={"text"}
                      control={editControl}
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
    [],
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
          <Switch
            isSelected={isActive}
            defaultSelected
            onValueChange={setIsActive}
          >
            Is Active
          </Switch>
          <BaseFormModal
            handleSubmit={handleSubmit}
            action={handleCreateDesignation}
            name={"Add"}
            title={"New Designation"}
          >
            <div>
              <BaseInput
                placeholder={"Enter Designation Name"}
                name={"name"}
                type={"text"}
                control={control}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [searchQuery, page, isActive]);
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
