import { EMPLOYEE_FORM_STEPPERS } from "@/_utils/enums";
import { fetchAllDepartmentsApiResponse } from "@/_utils/types/department";
import { fetchAllEmploymentStatusApiResponse } from "@/_utils/types/employees";
import { fetchAllLeavePoliciesApiResponse } from "@/_utils/types/leave-policy";
import { fetchAllRolesApiResponse } from "@/_utils/types/role";
import { fetchAllShiftsApiResponse } from "@/_utils/types/shift";
import { fetchWeeklyHolidayApiResponse } from "@/_utils/types/weekly-holiday";
import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import {
  employeeFormControl,
  employeeFormTrigger,
} from "@/components/modules/hr/employee/add-employee/index";
import addEmployeeState from "@/store";

export default function EmployeeInformation({
  control,
  departmentData,
  rolesData,
  shiftData,
  leavePolicies,
  employmentStatus,
  weeklyHoliday,
  trigger,
}: {
  control: employeeFormControl;
  weeklyHoliday: fetchWeeklyHolidayApiResponse | undefined;
  rolesData: fetchAllRolesApiResponse | undefined;
  departmentData: fetchAllDepartmentsApiResponse | undefined;
  shiftData: fetchAllShiftsApiResponse | undefined;
  leavePolicies: fetchAllLeavePoliciesApiResponse | undefined;
  employmentStatus: fetchAllEmploymentStatusApiResponse | undefined;
  trigger: employeeFormTrigger;
}) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <BaseInput
          type="date"
          control={control}
          name="joinDate"
          label="Join Date"
          placeholder="Enter  Join Date"
          rules={{
            required: "Join Date is required",
          }}
        />
        <BaseInput
          type="date"
          control={control}
          name="leaveDate"
          label="Leave Date"
          placeholder="Enter  Leave Date"
          rules={{
            required: "Leave Date is required",
          }}
        />
        <BaseInput
          type="text"
          control={control}
          name="employeeId"
          label="Employee ID"
          placeholder="OE-012"
          rules={{
            required: "Employee ID Is Required",
          }}
        />
        <BaseSelect
          variant={"underlined"}
          values={employmentStatus}
          control={control}
          name="employmentStatusId"
          label="Employee Status"
          placeholder="Employee Status"
          rules={{
            required: "Employee Status is required",
          }}
        />
        <BaseSelect
          variant={"underlined"}
          values={departmentData}
          control={control}
          name="departmentId"
          label="Department"
          placeholder="Department"
          rules={{
            required: "Department is required",
          }}
        />
        <BaseSelect
          variant={"underlined"}
          values={rolesData}
          control={control}
          name="roleId"
          label="Role"
          placeholder="Role"
          rules={{
            required: "Role is required",
          }}
        />
        <BaseSelect
          variant={"underlined"}
          values={shiftData}
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
          values={leavePolicies}
          control={control}
          name="leavePolicyId"
          label="Leave Policy"
          placeholder="Leave Policy"
          rules={{
            required: "Leave Policy is required",
          }}
        />
        <BaseSelect
          variant={"underlined"}
          values={weeklyHoliday}
          control={control}
          name="weeklyHolidayId"
          label="Weekly Holiday"
          placeholder="Weekly Holiday"
          rules={{
            required: "Weekly Holiday is required",
          }}
        />
      </div>
      <BaseButton
        onClick={async () => {
          const isValid = await trigger();
          if (isValid) {
            addEmployeeState.step = EMPLOYEE_FORM_STEPPERS.DESIGNATION;
          }
        }}
        isLoading={false}
        type="button"
      >
        {`Next`}
      </BaseButton>
    </div>
  );
}
