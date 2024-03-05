"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip } from "@nextui-org/chip";
import { EditIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import React, { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { ALLOCATED_ASSETS_COLS } from "@/_utils/data/tables/assets";
import { capitalizeAfterSpace } from "@/_utils/helpers";
import { allocatedAssetType, assetType } from "@/_utils/types/assets";
import AssetAutocomplete from "@/components/common/autocomplete/assets-autocomplete";
import EmployeeAutocomplete from "@/components/common/autocomplete/employee-autocomplete";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import BaseTable from "@/components/common/tables/base-table";
import AssetsService from "@/services/assets/client/assets.service";

export const assetAllocationSchema = z.object({
  userId: z.string({ required_error: "User Is Required" }),
  assetId: z.string({ required_error: "Asset Is Required" }),
  description: z
    .string({ required_error: "Description Is Required" })
    .min(2, "Minimum 2 Characters"),
  access: z.string().optional(),
  allocatedDate: z.string(),
});
export const editAssetAllocationSchema = assetAllocationSchema.extend({
  id: z.string().optional(),
});
export default function AllocatedAssets() {
  const {
    useHandleAllocateAsset,
    useFetchAlLAllocatedAssets,
    useHandleUpdateAssetAllocation,
    useHandleDeleteAsset,
    useFetchAllAssetsTypes,
  } = AssetsService();

  const [page, setPage] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<z.infer<typeof assetAllocationSchema>>({
    resolver: zodResolver(assetAllocationSchema),
  });
  const {
    watch,
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm<z.infer<typeof editAssetAllocationSchema>>({
    resolver: zodResolver(editAssetAllocationSchema),
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      setHasSubmitted(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);
  const { data: assetData, isLoading: isAssetDataLoading } =
    useFetchAlLAllocatedAssets(page);
  const {
    mutate: handleAllocateAsset,
    isPending: isHandleAllocateAssetPending,
  } = useHandleAllocateAsset();
  const { mutate: handleUpdateAsset, isPending: isUpdateAssetPending } =
    useHandleUpdateAssetAllocation();
  const { mutate: handleDeleteAsset, isPending: isDeleteAsset } =
    useHandleDeleteAsset();
  const { data: assetTypes, isLoading: isAssetTypeLoading } =
    useFetchAllAssetsTypes(1);
  const assetTypeData = React.useMemo(
    () =>
      assetTypes?.data.flatMap((el) => {
        return { name: el.name, id: el.id.toString() };
      }),
    [assetTypes],
  );
  const renderCell = React.useCallback(
    (asset: allocatedAssetType, columnKey: Key) => {
      const cellValue = asset[columnKey as keyof allocatedAssetType];

      switch (columnKey) {
        case "allocatedDate":
          return <Moment format={"YYYY/MM/DD"} date={asset.allocatedDate} />;
        case "user":
          return (
            <User
              description={asset.user.email}
              name={`${asset.user.firstName}${asset.user.lastName}`}
            >
              {asset.user?.email}
            </User>
          );
        case "asset":
          return <p>{asset.asset.name}</p>;
        case "access":
          return (
            <Chip
              className="capitalize"
              color={asset.access === "Granted" ? "success" : "danger"}
              size="md"
              variant="flat"
            >
              {asset.access}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit">
                <BaseFormModal
                  name={"Edit Asset Allocation"}
                  title={"Edit Asset Allocation"}
                  isIconButton={true}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateAsset}
                  isLoading={isUpdateAssetPending}
                  actionTitle={"Update"}
                  openCallback={() => {
                    setEditValue("id", asset.id.toString());
                    setEditValue("userId", asset.userId.toString());
                    setEditValue("assetId", asset.assetId.toString());
                    setEditValue("description", asset.description);
                    setEditValue("access", asset.access);
                    setEditValue("allocatedDate", asset.allocatedDate);
                  }}
                >
                  <div className={"flex flex-col gap-4"}>
                    <EmployeeAutocomplete
                      label={"Select Employee"}
                      placeholder={"Select Employee"}
                      control={editControl}
                      variant={"underlined"}
                      name={"userId"}
                      isMultiple={false}
                    />
                    <AssetAutocomplete
                      label={"Select Asset"}
                      placeholder={"Select Asset"}
                      control={editControl}
                      variant={"underlined"}
                      name={"assetId"}
                      isMultiple={false}
                    />
                    <BaseInput
                      placeholder={"Description"}
                      name={"description"}
                      type={"text"}
                      label={"Description"}
                      control={editControl}
                    />
                    <BaseSelect
                      isString={true}
                      name={"access"}
                      placeholder={"Access"}
                      variant={"underlined"}
                      values={[
                        { name: "Granted", id: "Granted" },
                        { name: "Revoked", id: "Revoked" },
                      ]}
                      control={editControl}
                      label={"access"}
                    />
                    <BaseInput
                      placeholder={"Allocation Date"}
                      label={"Allocation Date"}
                      name={"allocatedDate"}
                      type={"date"}
                      control={editControl}
                    />
                  </div>
                </BaseFormModal>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <DeleteConfirmationModal
                  deleteCallback={() => handleDeleteAsset(asset.id.toString())}
                  isLoading={isDeleteAsset}
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

  const loadingState = isAssetDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        <div></div>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          <BaseFormModal
            handleSubmit={handleSubmit}
            actionTitle={"Create"}
            action={handleAllocateAsset}
            name={"Allocate Asset"}
            title={"Allocate Asset"}
            isLoading={isHandleAllocateAssetPending}
          >
            <div className={"flex flex-col gap-4"}>
              <EmployeeAutocomplete
                label={"Select Employee"}
                placeholder={"Select Employee"}
                control={control}
                variant={"underlined"}
                name={"userId"}
                isMultiple={false}
              />
              <AssetAutocomplete
                label={"Select Asset"}
                placeholder={"Select Asset"}
                control={control}
                variant={"underlined"}
                name={"assetId"}
                isMultiple={false}
              />
              <BaseInput
                placeholder={"Description"}
                name={"description"}
                type={"text"}
                label={"Description"}
                control={control}
              />
              <BaseSelect
                isString={true}
                name={"access"}
                placeholder={"Access"}
                variant={"underlined"}
                values={[
                  { name: "Granted", id: "Granted" },
                  { name: "Revoked", id: "Revoked" },
                ]}
                control={control}
                label={"access"}
              />
              <BaseInput
                placeholder={"Allocation Date"}
                label={"Allocation Date"}
                name={"allocatedDate"}
                type={"date"}
                control={control}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [page]);
  return (
    <div className={"flex flex-col justify-center"}>
      <BaseTable
        cols={ALLOCATED_ASSETS_COLS}
        key={"asset-type"}
        topContent={topContent}
        pages={assetData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={assetData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
