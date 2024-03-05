"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon, EyeIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import { useRouter } from "next/navigation";
import React, { Key, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import { WEEKDAYS } from "@/_utils/constants";
import { DESIGNATION_COLS } from "@/_utils/data/tables/designation";
import { weeklyHolidayType } from "@/_utils/types/weekly-holiday";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import BaseTable from "@/components/common/tables/base-table";
import WeeklyHolidayService from "@/services/weekly-holiday/client/weekly-holiday.service";

const holidaySchema = z.object({
  name: z.string({ required_error: "Holiday Name Is Required" }),
  date: z.string({ required_error: "Date Is Required" }),
});
const editHolidaySchema = holidaySchema.extend({ id: z.string() });
export type publicHolidayFormType = z.infer<typeof holidaySchema>;
export type editPublicHolidayFormType = z.infer<typeof editHolidaySchema>;

export default function PublicHolidayManagement() {
  const {
    useFetchAllPublicHolidays,
    useHandleUpdatePublicHoliday,
    useHandleCreatePublicHoliday,
    useHandleDeletePublicHoliday,
  } = WeeklyHolidayService();
  const [page, setPage] = useState(1);

  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(holidaySchema),
    shouldUnregister: false,
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm({
    resolver: zodResolver(editHolidaySchema),
    shouldUnregister: false,
  });

  const { data: weeklyHolidayData, isLoading: isWeeklyHolidayDataLoading } =
    useFetchAllPublicHolidays("all", page);
  const {
    mutate: handleCreateWeeklyHoliday,
    isPending: isCreateWeeklyHolidayPending,
  } = useHandleCreatePublicHoliday();
  const {
    mutate: handleUpdateWeeklyHoliday,
    isPending: isUpdateWeeklyHolidayPending,
  } = useHandleUpdatePublicHoliday();
  const {
    mutate: handleDeleteWeeklyHoliday,
    isPending: isDeleteWeeklyHolidayPending,
  } = useHandleDeletePublicHoliday();
  const router = useRouter();
  const renderCell = React.useCallback(
    (weeklyHoliday: weeklyHolidayType, columnKey: Key) => {
      const cellValue = weeklyHoliday[columnKey as keyof weeklyHolidayType];

      switch (columnKey) {
        case "name":
          return <p>{weeklyHoliday.name}</p>;
        case "createdAt":
          return (
            <Moment format={"YYYY/MM/DD"} date={weeklyHoliday.createdAt} />
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Details">
                <span
                  onClick={() =>
                    router.push(`/hr/designations/${weeklyHoliday.id}`)
                  }
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit user">
                <BaseFormModal
                  isLoading={isCreateWeeklyHolidayPending}
                  name={"Edit Public Holiday"}
                  title={"Edit Public Holiday"}
                  isIconButton={true}
                  openCallback={() => {
                    setEditValue("name", weeklyHoliday.name);
                    setEditValue("date", weeklyHoliday.startDay);
                    setEditValue("id", weeklyHoliday.id.toString());
                  }}
                  icon={<EditIcon />}
                  handleSubmit={handleEditSubmit}
                  action={handleUpdateWeeklyHoliday}
                >
                  <div className={"flex flex-col gap-y-4"}>
                    <BaseInput
                      label={"Holiday"}
                      placeholder={"Enter Holiday Name"}
                      name={"name"}
                      type={"text"}
                      control={editControl}
                    />
                    <BaseInput
                      label={"Date"}
                      placeholder={"Enter Holiday Date"}
                      name={"date"}
                      type={"date"}
                      control={editControl}
                    />
                  </div>
                </BaseFormModal>
              </Tooltip>
              <Tooltip color="danger" content="Delete user">
                <DeleteConfirmationModal
                  deleteCallback={() =>
                    handleDeleteWeeklyHoliday(weeklyHoliday.id)
                  }
                  isLoading={isDeleteWeeklyHolidayPending}
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

  const loadingState = isWeeklyHolidayDataLoading ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        <div className={"w-3/4"}></div>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          <BaseFormModal
            handleSubmit={handleSubmit}
            action={handleCreateWeeklyHoliday}
            isLoading={isUpdateWeeklyHolidayPending}
            name={"Add"}
            title={"New Public Holiday"}
          >
            <div className={"flex flex-col gap-y-4"}>
              <BaseInput
                label={"Holiday"}
                placeholder={"Enter Holiday Name"}
                name={"name"}
                type={"text"}
                control={control}
              />
              <BaseInput
                label={"Date"}
                placeholder={"Enter Holiday Date"}
                name={"date"}
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
        cols={DESIGNATION_COLS}
        key={"designation"}
        topContent={topContent}
        pages={weeklyHolidayData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={weeklyHolidayData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
