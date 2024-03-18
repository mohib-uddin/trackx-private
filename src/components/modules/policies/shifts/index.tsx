"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { SHIFT_COLS } from "@/_utils/data/tables/shifts";
import { shiftType } from "@/_utils/types/shift";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseInput from "@/components/common/form/base-input";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import { Switch } from "@/components/common/switch/base-switch";
import BaseTable from "@/components/common/tables/base-table";
import ShiftService from "@/services/shift/client/shifts.service";

const limit = 10;

export const shiftSchema = z.object({
  name: z.string({ required_error: "Shift Name Is Required" }),
  startTime: z.string({ required_error: "Start Time Is Required" }),
  endTime: z.string({ required_error: "End Time Is Required" }),
});
export const editShiftSchema = z.object({
  name: z.string({ required_error: "Shift Name Is Required" }),
  startTime: z.string({ required_error: "Start Time Is Required" }),
  endTime: z.string({ required_error: "End Time Is Required" }),
  id: z.string(),
});

export default function Shifts() {
  const {
    useFetchAllShifts,
    useHandleCreateShift,
    useHandleUpdateShift,
    useHandleDeleteShift,
  } = ShiftService();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(shiftSchema),
    shouldUnregister: false,
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm({
    resolver: zodResolver(editShiftSchema),
    shouldUnregister: false,
  });

  const { data: shiftData, isLoading: isShiftDataLoading } = useFetchAllShifts(
    isActive.toString(),
    page,
  );
  const { mutate: handleCreateShift, isPending: isCreateShiftPending } =
    useHandleCreateShift();
  const { mutate: handleUpdateShift, isPending: isHandleUpdateShiftPending } =
    useHandleUpdateShift();
  const { mutate: handleDeleteShift, isPending: isDeleteShiftPending } =
    useHandleDeleteShift();
  const router = useRouter();
  const renderCell = React.useCallback(
    (shift: shiftType, columnKey: Key) => {
      const cellValue = shift[columnKey as keyof shiftType];

      switch (columnKey) {
        case "name":
          return <p>{shift.name}</p>;
        case "startTime":
          return <Moment format={"HH:mm"} date={shift.startTime} />;
        case "endTime":
          return <Moment format={"HH:mm"} date={shift.endTime} />;
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Edit shift">
                <BaseFormModal
                  name={"Edit Shift"}
                  title={"Edit Shift"}
                  isIconButton={true}
                  openCallback={() => {
                    setEditValue("name", shift.name);
                    setEditValue("id", shift.id.toString());
                    setEditValue("startTime", shift.startTime.toString());
                    setEditValue("endTime", shift.endTime.toString());
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateShift}
                >
                  <div className={"flex flex-col gap-y-4"}>
                    <BaseInput
                      placeholder={"Enter Designation Name"}
                      name={"name"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Start Time"}
                      name={"startTime"}
                      type={"time"}
                      control={editControl}
                    />
                    <BaseInput
                      placeholder={"Start Time"}
                      name={"endTime"}
                      type={"time"}
                      control={editControl}
                    />
                  </div>
                </BaseFormModal>
              </Tooltip>
              <Tooltip color="danger" content="Delete shift">
                <DeleteConfirmationModal
                  deleteCallback={() => handleDeleteShift(shift.id)}
                  isLoading={isDeleteShiftPending}
                />
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [isShiftDataLoading],
  );

  const loadingState = isShiftDataLoading ? "loading" : "idle";
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
          <div className={"flex gap-4 items-center"}>
            <p>Is Active?</p>
            <Switch defaultChecked={true} onCheckedChange={setIsActive} />
          </div>
          <BaseFormModal
            handleSubmit={handleSubmit}
            action={handleCreateShift}
            name={"Add"}
            title={"New Shift"}
          >
            <div className={"flex flex-col gap-y-4"}>
              <BaseInput
                placeholder={"Enter Shift Name"}
                name={"name"}
                type={"text"}
                control={control}
              />
              <BaseInput
                placeholder={"Start Time"}
                name={"startTime"}
                type={"time"}
                control={control}
              />
              <BaseInput
                placeholder={"Start Time"}
                name={"endTime"}
                type={"time"}
                control={control}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [searchQuery, page, isActive, isShiftDataLoading]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"View Shifts"} />
      <BaseTable
        cols={SHIFT_COLS}
        key={"shift"}
        topContent={topContent}
        pages={shiftData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={shiftData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
