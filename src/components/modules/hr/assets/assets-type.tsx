"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import React, { Key, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { DESIGNATION_COLS } from "@/_utils/data/tables/designation";
import { assetTypeType } from "@/_utils/types/assets";
import EmployeeAutocomplete from "@/components/common/autocomplete/employee-autocomplete";
import BaseInput from "@/components/common/form/base-input";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import BaseTable from "@/components/common/tables/base-table";
import AssetsService from "@/services/assets/client/assets.service";

export const assetTypeSchema = z.object({
  name: z.string({ required_error: "Asset Type Name Is Required" }),
  description: z.string({
    required_error: "Asset Type Description Is Required",
  }),
});
export const editAssetTypeSchema = z.object({
  name: z.string({ required_error: "Asset Type Name Is Required" }),
  description: z.string({
    required_error: "Asset Type Description Is Required",
  }),
  id: z.string(),
});
export default function AssetsTypes() {
  const {
    useFetchAllAssetsTypes,
    useHandleCreateAssetType,
    useHandleUpdateAssetTypes,
    useHandleDeleteAssetType,
  } = AssetsService();

  const [page, setPage] = useState(1);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm<z.infer<typeof assetTypeSchema>>({
    resolver: zodResolver(assetTypeSchema),
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm<z.infer<typeof editAssetTypeSchema>>({
    resolver: zodResolver(editAssetTypeSchema),
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      setHasSubmitted(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);

  const { data: assetType, isLoading: isAssetTypeDataLoading } =
    useFetchAllAssetsTypes(page);
  const { mutate: handleCreateAssetType, isPending: isCreateAssetTypePending } =
    useHandleCreateAssetType();
  const { mutate: handleUpdateAssetType, isPending: isUpdateAssetTypePending } =
    useHandleUpdateAssetTypes();
  const { mutate: handleDeleteAssetType, isPending: isDeleteAssetType } =
    useHandleDeleteAssetType();
  const renderCell = React.useCallback(
    (assetType: assetTypeType, columnKey: Key) => {
      const cellValue = assetType[columnKey as keyof assetTypeType];

      switch (columnKey) {
        case "name":
          return <p>{assetType.name}</p>;
        case "createdAt":
          return <Moment format={"YYYY/MM/DD"} date={assetType.createdAt} />;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit">
                <BaseFormModal
                  name={"Edit Asset Type"}
                  title={"Edit Asset Type"}
                  isIconButton={true}
                  openCallback={() => {
                    setEditValue("name", assetType.name);
                    setEditValue("description", assetType.description);
                    setEditValue("id", assetType.id.toString());
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateAssetType}
                  isLoading={isUpdateAssetTypePending}
                  actionTitle={"Update"}
                >
                  <div>
                    <BaseInput
                      placeholder={"Name"}
                      name={"name"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Description"}
                      name={"description"}
                      type={"text"}
                      control={editControl}
                    />
                  </div>
                </BaseFormModal>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <DeleteConfirmationModal
                  deleteCallback={() =>
                    handleDeleteAssetType(assetType.id.toString())
                  }
                  isLoading={isDeleteAssetType}
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

  const loadingState = isAssetTypeDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        <div></div>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          <BaseFormModal
            handleSubmit={handleSubmit}
            actionTitle={"Create Asset Type"}
            action={handleCreateAssetType}
            name={"Create Asset Type"}
            title={"New Asset Type"}
          >
            <div>
              <BaseInput
                placeholder={"Name"}
                name={"name"}
                type={"text"}
                control={control}
              />
              <BaseInput
                placeholder={"Description"}
                name={"description"}
                type={"text"}
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
        cols={DESIGNATION_COLS}
        key={"asset-type"}
        topContent={topContent}
        pages={assetType?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={assetType?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
