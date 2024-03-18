"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip } from "@nextui-org/chip";
import { EditIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import React, { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { ASSETS_COLS } from "@/_utils/data/tables/assets";
import { assetType } from "@/_utils/types/assets";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import { Switch } from "@/components/common/switch/base-switch";
import BaseTable from "@/components/common/tables/base-table";
import AssetsService from "@/services/assets/client/assets.service";

export const assetSchema = z.object({
  attachment: z.any().optional(),
  idNo: z.string(),
  name: z
    .string({ required_error: "Name Is Required" })
    .min(2, "Minimum 2 Characters"),
  description: z
    .string({ required_error: "Description Is Required" })
    .min(2, "Minimum 2 Characters"),
  taxable: z.boolean(),
  assetTypeId: z.string(),
  condition: z.string(),
  manufacturer: z.string().optional(),
  model: z.string().optional(),
  currentValue: z.number({ required_error: "Current Value Is Required" }),
});
export const editAssetSchema = assetSchema.extend({
  id: z.string().optional(),
});
export default function AllAssets() {
  const {
    useFetchAllAssets,
    useHandleCreateAsset,
    useHandleUpdateAsset,
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
  } = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
  });
  const {
    watch,
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm<z.infer<typeof editAssetSchema>>({
    resolver: zodResolver(editAssetSchema),
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      setHasSubmitted(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);
  const { data: assetData, isLoading: isAssetDataLoading } =
    useFetchAllAssets(page);
  const { mutate: handleCreateAsset, isPending: isCreateAssetPending } =
    useHandleCreateAsset();
  const { mutate: handleUpdateAsset, isPending: isUpdateAssetPending } =
    useHandleUpdateAsset();
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
    (asset: assetType, columnKey: Key) => {
      const cellValue = asset[columnKey as keyof assetType];

      switch (columnKey) {
        case "name":
          return <p>{asset.name}</p>;

        case "createdAt":
          return <Moment format={"YYYY/MM/DD"} date={asset.createdAt} />;
        case "assetTypeId":
          return (
            <div>
              {assetTypes && assetTypes.data && (
                <p>
                  {assetTypes?.data?.find((el) => el.id === asset.id)?.name}
                </p>
              )}
            </div>
          );
        case "taxable":
          return <div>{asset.taxable ? "Yes" : "No"}</div>;
        case "isAllocated":
          return (
            <Chip
              className="capitalize"
              color={asset.isAllocated ? "success" : "warning"}
              size="md"
              variant="flat"
            >
              {asset.isAllocated ? "Allocated" : "UnAllocated"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit">
                <BaseFormModal
                  name={"Edit Asset Type"}
                  title={"Edit Asset Type"}
                  isIconButton={true}
                  openCallback={() => {
                    setEditValue("name", asset.name);
                    setEditValue("description", asset.description);
                    setEditValue("id", asset.id.toString());
                    setEditValue("idNo", asset.idNo.toString());
                    setEditValue("assetTypeId", asset.assetTypeId.toString());
                    setEditValue("taxable", asset.taxable);
                    setEditValue("model", asset.model);
                    setEditValue("manufacturer", asset.manufacturer);
                    setEditValue("currentValue", asset.currentValue);
                    setEditValue("condition", asset.condition);
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateAsset}
                  isLoading={isUpdateAssetPending}
                  actionTitle={"Update"}
                >
                  <div className={"flex flex-col gap-4"}>
                    <BaseInput
                      placeholder={"Name"}
                      name={"name"}
                      label={"Name"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Description"}
                      name={"description"}
                      type={"text"}
                      label={"Description"}
                      control={editControl}
                    />
                    <div className={" flex items-center gap-4"}>
                      Taxable?{" "}
                      <Switch
                        onCheckedChange={(checked) =>
                          setValue("taxable", checked)
                        }
                      ></Switch>
                    </div>
                    <BaseSelect
                      name={"assetTypeId"}
                      placeholder={"Asset Type"}
                      variant={"underlined"}
                      values={assetTypeData}
                      control={editControl}
                      label={"Asset Type"}
                    />
                    <BaseInput
                      placeholder={"Model"}
                      label={"Model"}
                      name={"model"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Manufacturer"}
                      label={"Manufacturer"}
                      name={"manufacturer"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Identification Number"}
                      label={"Identification No"}
                      name={"idNo"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseSelect
                      isString={true}
                      name={"condition"}
                      placeholder={"Condition"}
                      variant={"underlined"}
                      values={[
                        { name: "New", id: "New" },
                        { name: "Old", id: "Old" },
                        { name: "Used", id: "Used" },
                      ]}
                      control={editControl}
                      label={"Condition"}
                    />
                    <BaseInput
                      placeholder={"Current Value"}
                      label={"Current Value"}
                      name={"currentValue"}
                      type={"number"}
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
    [isAssetTypeLoading],
  );

  const loadingState = isAssetDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full items-center justify-between"}>
        <div></div>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          <BaseFormModal
            handleSubmit={handleSubmit}
            actionTitle={"Create"}
            action={handleCreateAsset}
            name={"Create Asset"}
            title={"New Asset"}
          >
            <div className={"flex flex-col gap-4"}>
              <BaseInput
                placeholder={"Name"}
                name={"name"}
                label={"Name"}
                type={"text"}
                control={control}
              />
              <BaseInput
                placeholder={"Description"}
                name={"description"}
                type={"text"}
                label={"Description"}
                control={control}
              />
              <div className={" flex items-center gap-4"}>
                Taxable?{" "}
                <Switch
                  onCheckedChange={(checked) => setValue("taxable", checked)}
                ></Switch>
              </div>
              <BaseSelect
                name={"assetTypeId"}
                placeholder={"Asset Type"}
                variant={"underlined"}
                values={assetTypeData}
                control={control}
                isString={true}
                label={"Asset Type"}
              />
              <BaseInput
                placeholder={"Model"}
                label={"Model"}
                name={"model"}
                type={"text"}
                control={control}
              />
              <BaseInput
                placeholder={"Manufacturer"}
                label={"Manufacturer"}
                name={"manufacturer"}
                type={"text"}
                control={control}
              />
              <BaseInput
                placeholder={"Identification Number"}
                label={"Identification No"}
                name={"idNo"}
                type={"text"}
                control={control}
              />
              <BaseSelect
                isString={true}
                name={"condition"}
                placeholder={"Condition"}
                variant={"underlined"}
                values={[
                  { name: "New", id: "New" },
                  { name: "Old", id: "Old" },
                  { name: "Used", id: "Used" },
                ]}
                control={control}
                label={"Condition"}
              />
              <BaseInput
                placeholder={"Current Value"}
                label={"Current Value"}
                name={"currentValue"}
                type={"number"}
                control={control}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [page, isAssetTypeLoading]);
  return (
    <div className={"flex flex-col justify-center"}>
      <BaseTable
        cols={ASSETS_COLS}
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
