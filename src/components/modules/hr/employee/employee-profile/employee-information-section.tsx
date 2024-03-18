import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { EditIcon } from "@nextui-org/shared-icons";
import { Tooltip } from "@nextui-org/tooltip";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { PERMISSIONS } from "@/_utils/enums";
import { capitalizeAfterSpace } from "@/_utils/helpers";
import { getMedia } from "@/_utils/helpers/get-media";
import { userPermissionsApiResponse } from "@/_utils/types";
import { employeeType } from "@/_utils/types/employees";
import BaseSelect from "@/components/common/form/base-select";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DepartmentService from "@/services/department/client/department.service";
import EmployeeService from "@/services/employees/client/employee.service";
import LeavePolicyService from "@/services/leave-policy/client/leave-policy.service";
import RolesService from "@/services/roles/client/roles.service";
import ShiftService from "@/services/shift/client/shifts.service";
import WeeklyHolidayService from "@/services/weekly-holiday/client/weekly-holiday.service";

export const personalInfoSchema = z.object({
  departmentId: z.string(),
  roleId: z.string(),
  weeklyHolidayId: z.string(),
  leavePolicyId: z.string(),
  shiftId: z.string(),
  employmentStatusId: z.string(),
});

const EmployeeInformationSection = ({
  employeeData,
  permissions,
}: {
  employeeData: employeeType;
  permissions: userPermissionsApiResponse;
}) => {
  const { useFetchAllDepartments } = DepartmentService();
  const { useFetchAllRoles } = RolesService();
  const { useFetchAllShifts } = ShiftService();
  const { useFetchAllWeeklyHolidays } = WeeklyHolidayService();
  const { useFetchAllEmploymentStatus, useHandleCreateNewEmployee } =
    EmployeeService();
  const { useFetchAllLeavePolicies } = LeavePolicyService();
  const { data: departmentData } = useFetchAllDepartments("", 1, true);
  const { data: rolesData } = useFetchAllRoles("all", 1);
  const { data: shiftData } = useFetchAllShifts("true");
  const { data: employmentStatus } = useFetchAllEmploymentStatus(true);
  const { data: leavePolicies } = useFetchAllLeavePolicies(1, "all");
  const { data: weeklyHoliday } = useFetchAllWeeklyHolidays("all", 1);
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
    trigger,
    register,
    watch,
  } = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    shouldUnregister: false,
    mode: "onChange",
    defaultValues: {
      roleId: employeeData.roleId?.toString(),
      leavePolicyId: employeeData.leavePolicyId?.toString(),
      weeklyHolidayId: employeeData.weeklyHolidayId?.toString(),
      shiftId: employeeData.shiftId?.toString(),
      employmentStatusId: employeeData.employmentStatusId?.toString(),
      departmentId: employeeData.departmentId?.toString(),
    },
  });
  const { useHandleUpdateEmployee } = EmployeeService();
  const { mutate: handleUpdateEmployee, isPending: isUpdateEmployeePending } =
    useHandleUpdateEmployee(Number(employeeData.id));
  return (
    <div className={"p-4 text-left"}>
      <div className={"mb-2 flex justify-between item-center gap-x-4"}>
        <h2 className={"text-xl font-[700]"}>Personal Information</h2>
        {permissions.data.includes(PERMISSIONS.CREATE_USER) && (
          <BaseFormModal
            title={"Update Personal Info"}
            name={"Personal Information"}
            isIconButton={true}
            isLoading={isUpdateEmployeePending}
            icon={<EditIcon />}
            action={handleUpdateEmployee}
            handleSubmit={handleSubmit}
            actionTitle={"Update"}
          >
            <BaseSelect
              variant={"underlined"}
              values={departmentData?.data}
              control={control}
              name="departmentId"
              isString={true}
              label="Department"
              placeholder="Department"
              rules={{
                required: "Department is required",
              }}
            />
            <BaseSelect
              variant={"underlined"}
              values={leavePolicies?.data}
              control={control}
              isString={true}
              name="leavePolicyId"
              label="Leave Policy"
              placeholder="Leave Policy"
              rules={{
                required: "Leave Policy is required",
              }}
            />
            <BaseSelect
              variant={"underlined"}
              values={shiftData?.data}
              isString={true}
              control={control}
              name="shiftId"
              label="Shift"
              placeholder="Shift"
              rules={{
                required: "Shift is required",
              }}
            />
            <BaseSelect
              variant={"underlined"}
              isString={true}
              values={employmentStatus?.data}
              control={control}
              name="employmentStatusId"
              label="Employment Status"
              placeholder="Employment Status"
              rules={{
                required: "Employment Status is required",
              }}
            />
            <BaseSelect
              variant={"underlined"}
              isString={true}
              values={weeklyHoliday?.data}
              control={control}
              name="weeklyHolidayId"
              label="Weekly Holiday"
              placeholder="Weekly Holiday"
              rules={{
                required: "Weekly Holiday is required",
              }}
            />
            <BaseSelect
              variant={"underlined"}
              values={rolesData?.data}
              control={control}
              name="roleId"
              label="Role"
              placeholder="Role"
              isString={true}
              rules={{
                required: "Role is required",
              }}
            />
          </BaseFormModal>
        )}
      </div>
      <div className={"grid grid-cols-2"}>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Department:</span>{" "}
          {employeeData?.department?.name ?? "No Department"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Employment Status:</span>{" "}
          <Chip
            className="capitalize"
            size="sm"
            variant="flat"
            classNames={{
              base: `!bg-[${employeeData?.employmentStatus?.colourValue}]`,
              // content: "text-black",
            }}
          >
            {employeeData?.employmentStatus?.name}
          </Chip>
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Leave Policy:</span>{" "}
          {employeeData?.leavePolicy?.name ?? "No Policy Allotted"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Weekly Holiday:</span>{" "}
          {employeeData?.weeklyHoliday?.name ?? "-"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Shift:</span>{" "}
          {employeeData?.shift?.name ?? "No Shift Assigned"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Join Date:</span>{" "}
          {employeeData.joinDate?.split("T")[0] ?? "-"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>End Date:</span>{" "}
          {employeeData.leaveDate?.split("T")[0] ?? "-"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Role:</span>{" "}
          {employeeData?.role?.name}
        </h2>
      </div>
      <div className={"flex flex-col "}>
        <h2 className={"text-xl font-[700] mt-2"}>Reports To:</h2>
        <AvatarGroup>
          {employeeData.designationHistory[0]?.designation.superior?.user?.map(
            (el: any, index: number) => (
              <Tooltip
                content={
                  <div className="px-1 py-2">
                    <div className="text-tiny">
                      {capitalizeAfterSpace(`${el.firstName} ${el.lastName}`)}
                    </div>
                  </div>
                }
                color={"primary"}
                key={index}
              >
                <Avatar
                  classNames={{
                    base: "bg-gradient-to-br from-[#3494E6] to-[#EC6EAD]",
                    icon: "text-black/60",
                  }}
                  size={"lg"}
                  src={
                    el.image
                      ? getMedia(`/user/${el.id}/profile-image/${el.image}`)
                      : undefined
                  }
                  isBordered={true}
                >
                  M
                </Avatar>
              </Tooltip>
            ),
          )}
        </AvatarGroup>
      </div>
    </div>
  );
};
export default EmployeeInformationSection;
