"use client";

import { Fingerprint } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { clockInType } from "@/_utils/types/attendance";
import BaseInput from "@/components/common/form/base-input";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import AttendanceService from "@/services/attendance/client/attendance.service";
import TokenService from "@/services/token/token.service";

const CheckInOut = ({ ip }: { ip: string | undefined }) => {
  const user = TokenService.getUser();
  console.log(user);
  const {
    useFetchLastAttendance,
    useHandleClockOutService,
    useHandleClockInService,
  } = AttendanceService();
  const { data: clockInStatus } = useFetchLastAttendance(user?.id);
  const { mutate: handleCheckIn, isPending: isHandleCheckInPending } =
    useHandleClockInService();
  const { mutate: handleCheckOut, isPending: isHandleCheckoutPending } =
    useHandleClockOutService();
  const { handleSubmit, control, reset } = useForm<clockInType>({
    defaultValues: {
      ip: ip ?? "",
      userId: user?.id ?? "",
    },
  });
  const CheckInSubmit = (data: clockInType) => {
    handleCheckIn(data);
    reset();
  };
  const CheckoutSubmit = (data: clockInType) => {
    handleCheckOut(data);
    reset();
  };
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [inTime, setInTime] = useState("");
  useEffect(() => {
    if (clockInStatus?.data.inTime && !clockInStatus.data.outTime) {
      setIsCheckedIn(true);
      const inTime = clockInStatus?.data.inTime;
      const diff = moment().diff(moment(inTime));
      const diffDuration = moment.utc(diff).format("HH:mm");
      setInTime(diffDuration);
    } else {
      setIsCheckedIn(false);
    }
  }, [clockInStatus]);
  useEffect(() => {
    const today = moment();
    const dateToCompare = moment(clockInStatus?.data.inTime);
    if (!dateToCompare.isSame(today, "day")) {
      toast.info("Attendance Not Marked", {
        description: "Check In To Mark Your Today's Attendance",
      });
    }
  }, [clockInStatus]);
  useEffect(() => {
    const updateInTime = () => {
      if (isCheckedIn && clockInStatus?.data.inTime) {
        const inTime = clockInStatus?.data.inTime;
        const diff = moment().diff(moment(inTime));
        const diffDuration = moment.utc(diff).format("HH:mm");
        setInTime(diffDuration);
      }
      setTimeout(updateInTime, 60000); // Schedule update every minute
    };

    updateInTime(); // Initial invocation
  }, [isCheckedIn, clockInStatus]);

  return (
    <>
      <div className={"flex gap-4"}>
        {!isCheckedIn && (
          <BaseFormModal
            actionTitle={"Check In"}
            name={
              <span className={"flex items-center gap-2"}>
                <Fingerprint />{" "}
                <span className={"hidden md:block"}>Check In</span>
              </span>
            }
            title={"Check In"}
            action={CheckInSubmit}
            handleSubmit={handleSubmit}
          >
            <p>Current IP Address: {ip}</p>
            <BaseInput
              type="text"
              control={control}
              name="comment"
              label="Comments"
              placeholder="Enter your Comments"
              rules={{
                required: "Comments is required",
              }}
            />
          </BaseFormModal>
        )}

        {isCheckedIn && (
          <BaseFormModal
            actionTitle={"Check Out"}
            name={
              <span className={"flex items-center gap-2"}>
                <Fingerprint />{" "}
                <span className={"hidden md:block"}>{inTime}</span>
              </span>
            }
            title={"Check Out"}
            action={CheckoutSubmit}
            handleSubmit={handleSubmit}
          >
            <p>Current IP Address: {ip}</p>
            <BaseInput
              type="text"
              control={control}
              name="comment"
              label="Comments"
              placeholder="Enter your Comments"
              rules={{
                required: "Comments is required",
              }}
            />
          </BaseFormModal>
        )}
      </div>
    </>
  );
};
export default CheckInOut;
