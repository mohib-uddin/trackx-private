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
import { roleType } from "@/_utils/types/role";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseInput from "@/components/common/form/base-input";
import BaseSearch from "@/components/common/form/base-search";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import BaseTable from "@/components/common/tables/base-table";
import RolesService from "@/services/roles/client/roles.service";

const limit = 10;

export const rolesSchema = z.object({
  name: z.string().min(1, "Role Name Is Required"),
});
export const editRolesSchema = z.object({
  name: z.string().min(1, "Role Name Is Required"),
  id: z.string(),
});

export default function ViewAllRoles() {
  const {
    useFetchAllRoles,
    useHandleUpdateRole,
    useHandleCreateRole,
    useHandleDeleteRole,
  } = RolesService();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(rolesSchema),
    shouldUnregister: false,
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm({
    resolver: zodResolver(editRolesSchema),
    shouldUnregister: false,
  });

  const { data: rolesData, isLoading: isRolesLoading } = useFetchAllRoles(
    "all",
    page,
  );
  const { mutate: handleCreateRole, isPending: isHandleCreateRolePending } =
    useHandleCreateRole();
  const { mutate: handleUpdateRole, isPending: isUpdateRolePending } =
    useHandleUpdateRole();
  const { mutate: handleDeleteRole, isPending: isDeleteRolePending } =
    useHandleDeleteRole();
  const router = useRouter();
  const renderCell = React.useCallback((role: roleType, columnKey: Key) => {
    const cellValue = role[columnKey as keyof roleType];

    switch (columnKey) {
      case "name":
        return <p>{role.name}</p>;
      case "createdAt":
        return <Moment format={"YYYY/MM/DD"} date={role.createdAt} />;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                onClick={() => router.push(`/roles/${role.id}`)}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <BaseFormModal
                name={"Edit Role"}
                title={"Edit Role"}
                isIconButton={true}
                openCallback={() => {
                  setEditValue("name", role.name);
                  setEditValue("id", role.id.toString());
                }}
                icon={<EditIcon />}
                handleSubmit={handleEditSubmit}
                action={handleUpdateRole}
              >
                <div>
                  <BaseInput
                    placeholder={"Enter Role Name"}
                    name={"name"}
                    type={"text"}
                    control={editControl}
                  />
                </div>
              </BaseFormModal>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <DeleteConfirmationModal
                deleteCallback={() => handleDeleteRole(role.id)}
                isLoading={isDeleteRolePending}
              />
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const loadingState = isRolesLoading ? "loading" : "idle";
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
            action={handleCreateRole}
            name={"Add"}
            title={"New Role"}
          >
            <div>
              <BaseInput
                placeholder={"Enter Role Name"}
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
      <Breadcrumb pageName={"Roles"} />
      <BaseTable
        cols={DESIGNATION_COLS}
        key={"roles"}
        topContent={topContent}
        pages={rolesData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={rolesData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
