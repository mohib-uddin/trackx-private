import { fetchAllDesignationApiResponse } from "@/_utils/types/designation";
import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseTextArea from "@/components/common/form/base-textarea";
import {
  employeeFormControl,
  employeeFormSubmitType,
  employeeFormTrigger,
} from "@/components/modules/hr/employee/add-employee/index";

export default function DesignationInformation({
  control,
  designationData,
}: {
  control: employeeFormControl;
  designationData: fetchAllDesignationApiResponse | undefined;
  trigger: employeeFormTrigger;
  handleSubmit: employeeFormSubmitType;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 mb-4">
        <BaseSelect
          variant={"underlined"}
          values={designationData?.data}
          control={control}
          name="designationId"
          label="Designation"
          placeholder="Employee Designation"
          rules={{
            required: "Designation is required",
          }}
        />
        <BaseInput
          type="date"
          control={control}
          name="designationStartDate"
          label="Start Date"
          placeholder="Designation Start Date"
          rules={{
            required: "Designation Start Date is required",
          }}
        />
        <BaseInput
          type="date"
          control={control}
          name="designationEndDate"
          label="End Date"
          placeholder="Designation End Date"
          rules={{
            required: "Designation End Date is required",
          }}
        />
        <BaseInput
          type="number"
          control={control}
          name="salary"
          label="Salary"
          placeholder="Enter Employee Salary"
          rules={{
            required: "Salary is required",
          }}
        />
        <BaseInput
          type="date"
          control={control}
          name="salaryStartDate"
          label="Salary Start Date"
          placeholder="Salary Start Date"
          rules={{
            required: "Salary Start Date is required",
          }}
        />
        <BaseInput
          type="date"
          control={control}
          name="salaryEndDate"
          label="Salary End Date"
          placeholder="Salary End Date"
          rules={{
            required: "Salary End Date is required",
          }}
        />
        <BaseTextArea
          control={control}
          name="salaryComment"
          label="Salary Comments"
          placeholder="Comments"
          rules={{
            required: "Salary Comments is required",
          }}
        />
      </div>
      <BaseButton type="submit">{`Submit`}</BaseButton>
    </div>
  );
}
