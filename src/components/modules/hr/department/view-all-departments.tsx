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
import { departmentType } from "@/_utils/types/department";
import BaseInput from "@/components/common/form/base-input";
import BaseSearch from "@/components/common/form/base-search";
import BaseHeader from "@/components/common/header/base-header";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import BaseTable from "@/components/common/tables/base-table";
import DepartmentService from "@/services/department/client/department.service";

const departmentSchema = z.object({
  name: z.string().min(1, "Department Is Required"),
});
const editDepartmentSchema = z.object({
  name: z.string().min(1, "Designation Is Required"),
  id: z.string(),
});
export default function ViewAllDepartments() {
  const {
    useFetchAllDepartments,
    useHandleCreateDepartment,
    useHandleDeleteDepartment,
    useHandleUpdateDepartment,
  } = DepartmentService();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    shouldUnregister: false,
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm({
    resolver: zodResolver(editDepartmentSchema),
    shouldUnregister: false,
  });

  const { data: departmentData, isLoading: isDepartmentDataLoading } =
    useFetchAllDepartments(searchQuery, page, isActive);
  const {
    mutate: handleCreateDepartment,
    isPending: isCreateDepartmentPending,
  } = useHandleCreateDepartment();
  const {
    mutate: handleUpdateDepartment,
    isPending: isHandleUpdateDepartmentPending,
  } = useHandleUpdateDepartment();
  const {
    mutate: handleDeleteDepartment,
    isPending: isDeleteDepartmentPending,
  } = useHandleDeleteDepartment();
  const router = useRouter();
  const renderCell = React.useCallback(
    (department: departmentType, columnKey: Key) => {
      const cellValue = department[columnKey as keyof departmentType];

      switch (columnKey) {
        case "name":
          return <p>{department.name}</p>;
        case "createdAt":
          return <Moment format={"YYYY/MM/DD"} date={department.createdAt} />;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  onClick={() =>
                    router.push(`/hr/departments/${department.id}`)
                  }
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <BaseFormModal
                  name={"Edit Department"}
                  title={"Edit Department"}
                  isIconButton={true}
                  openCallback={() => {
                    setEditValue("name", department.name);
                    setEditValue("id", department.id.toString());
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateDepartment}
                >
                  <div>
                    <BaseInput
                      placeholder={"Enter Department Name"}
                      name={"name"}
                      type={"text"}
                      control={editControl}
                    />
                  </div>
                </BaseFormModal>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <DeleteConfirmationModal
                  deleteCallback={() => handleDeleteDepartment(department.id)}
                  isLoading={isDeleteDepartmentPending}
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

  const loadingState = isDepartmentDataLoading ? "loading" : "idle";
  const handleCreateNewDepartment = (data: { name: string }) => {
    handleCreateDepartment(data);
  };
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
        <div>
          <Switch
            isSelected={isActive}
            defaultSelected
            onValueChange={setIsActive}
          >
            Is Active
          </Switch>
        </div>
        <BaseFormModal
          handleSubmit={handleSubmit}
          action={handleCreateNewDepartment}
          name={"Add"}
          title={"New Department"}
        >
          <div>
            <BaseInput
              placeholder={"Enter Department Name"}
              name={"name"}
              type={"text"}
              control={control}
            />
          </div>
        </BaseFormModal>
      </div>
    );
  }, [searchQuery, page, isActive]);
  return (
    <div className={"flex flex-col justify-center"}>
      <BaseHeader title={"View Departments"} />
      <BaseTable
        cols={DESIGNATION_COLS}
        key={"designation"}
        topContent={topContent}
        pages={departmentData?.lastPage || 1}
        page={page}
        data={departmentData?.data}
        loadingState={loadingState}
        renderCell={renderCell}
        setPage={setPage}
      />
    </div>
  );
}
