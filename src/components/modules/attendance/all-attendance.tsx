"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import { User } from "@nextui-org/user";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { Key, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import * as z from "zod";

import {
  ATTENDANCE_COLS,
  attendanceStatusColorMap,
} from "@/_utils/data/tables/attendance";
import { capitalizeAfterSpace } from "@/_utils/helpers";
import { getMedia } from "@/_utils/helpers/get-media";
import { attendanceType } from "@/_utils/types/attendance";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseInput from "@/components/common/form/base-input";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import BaseTable from "@/components/common/tables/base-table";
import AttendanceService from "@/services/attendance/client/attendance.service";
import TokenService from "@/services/token/token.service";

const manualAttendanceSchema = z.object({
  inTime: z.string({ required_error: "In Time Is Required" }),
  outTime: z.string({ required_error: "Out Time Is Required" }),
  ip: z.string({ required_error: "IP Address Is Required" }),
  comment: z.string().optional(),
  userId: z.number({ required_error: "User ID Is Required" }),
});
export type manualAttendanceFormType = z.infer<typeof manualAttendanceSchema>;
export default function AllAttendance({ ip }: { ip: string }) {
  const { useFetchAllAttendance, useHandleCreateManualAttendance } =
    AttendanceService();
  const [page, setPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date("4-1-24"));
  const user = TokenService.getUser();

  const {
    setValue,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<manualAttendanceFormType>({
    resolver: zodResolver(manualAttendanceSchema),
    defaultValues: { ip: ip, userId: Number(user?.id) },
    shouldUnregister: false,
  });
  useEffect(() => {
    if (user) {
      setValue("userId", Number(user.id));
    }
  }, [user]);
  const { data: attendanceData, isLoading: isAttendanceDataPending } =
    useFetchAllAttendance(
      page,
      moment(startDate).format().split("T")[0],
      moment(endDate).format().split("T")[0],
    );
  const {
    mutate: handleCreateAttendance,
    isPending: isCreateAttendancePending,
  } = useHandleCreateManualAttendance();
  const router = useRouter();
  const renderCell = React.useCallback(
    (attendance: attendanceType, columnKey: Key) => {
      const cellValue = attendance[columnKey as keyof attendanceType];

      switch (columnKey) {
        case "user":
          return (
            <User
              description={attendance.user.email}
              name={`${attendance.user.firstName}${attendance.user.lastName}`}
              avatarProps={{
                src: attendance.user.image
                  ? getMedia(
                      `/user/${attendance.user.id}/profile-image/${attendance.user.image}`,
                    )
                  : undefined,
                isBordered: true,
                fallback: (
                  <div>{attendance.user.firstName[0].toUpperCase()}</div>
                ),
              }}
            >
              {user?.email}
            </User>
          );
        case "inTime":
          return <Moment format={"YYYY/MM/DD"} date={attendance.inTime} />;
        case "inTimeStatus":
          return (
            <Chip
              className="capitalize"
              color={attendanceStatusColorMap[attendance.inTimeStatus]}
              size="sm"
              variant="flat"
            >
              {attendance.inTimeStatus}
            </Chip>
          );
        case "outTime":
          return <Moment format={"YYYY/MM/DD"} date={attendance.outTime} />;
        case "outTimeStatus":
          return (
            <Chip
              className="capitalize"
              color={attendanceStatusColorMap[attendance.outTimeStatus]}
              size="sm"
              variant="flat"
            >
              {attendance.outTimeStatus}
            </Chip>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const loadingState = isAttendanceDataPending ? "loading" : "idle";
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex w-full justify-between"}>
        <div className={"w-3/4 flex flex-col md:flex-row gap-x-4 "}>
          <DatePicker
            customInput={<Input variant={"faded"} size={"sm"} />}
            onChange={(el) => {
              if (el) {
                setStartDate(el);
              }
            }}
            dateFormat={"MM-dd-yyyy"}
            placeholderText={"Select Start Date"}
            peekNextMonth
            // showMonthDropdown
            // showYearDropdown
            dropdownMode="select"
            selected={startDate}
          />
          <DatePicker
            customInput={<Input variant={"faded"} size={"sm"} />}
            placeholderText={"Select End Date"}
            peekNextMonth
            // showMonthDropdown
            // showYearDropdown
            dateFormat={"MM-dd-yyyy"}
            dropdownMode="select"
            onChange={(el) => {
              if (el) {
                setEndDate(el);
              }
            }}
            selected={endDate}
          />
        </div>
        <div className={"flex flex-col md:flex-row gap-4 items-center"}>
          <BaseFormModal
            handleSubmit={handleSubmit}
            action={handleCreateAttendance}
            name={"Manual Attendance"}
            title={"Manual Attendance"}
          >
            <div>
              <BaseInput
                placeholder={"Select In Time"}
                name={"inTime"}
                type={"datetime-local"}
                control={control}
                label={"In Time"}
              />
              <BaseInput
                placeholder={"Select Out Time"}
                name={"outTime"}
                type={"datetime-local"}
                control={control}
                label={"Out Time"}
              />
              <BaseTextArea
                placeholder={"Comments"}
                name={"comment"}
                control={control}
                label={"Comments"}
              />
            </div>
          </BaseFormModal>
        </div>
      </div>
    );
  }, [page, startDate, endDate]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"View Attendance"} />
      <BaseTable
        cols={ATTENDANCE_COLS}
        key={"designation"}
        topContent={topContent}
        pages={attendanceData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={attendanceData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
