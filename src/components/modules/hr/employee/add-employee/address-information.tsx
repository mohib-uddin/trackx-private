import { EMPLOYEE_FORM_STEPPERS } from "@/_utils/enums";
import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import {
  employeeFormControl,
  employeeFormTrigger,
} from "@/components/modules/hr/employee/add-employee/index";
import addEmployeeState from "@/store";

export default function AddressInformationForm({
  control,
  trigger,
}: {
  control: employeeFormControl;
  trigger: employeeFormTrigger;
}) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <BaseInput
          type="text"
          control={control}
          name="street"
          label="Street"
          placeholder="Enter Your Street"
          rules={{
            required: "Street is required",
          }}
        />
        <BaseInput
          type="text"
          control={control}
          name="city"
          label="City"
          placeholder="Enter Your City"
          rules={{
            required: "City is required",
          }}
        />
        <BaseInput
          type="text"
          control={control}
          name="state"
          label="State"
          placeholder="Enter Your State"
          rules={{
            required: "State is required",
          }}
        />
        <BaseInput
          type="text"
          control={control}
          name="zipCode"
          label="Zip Code"
          placeholder="Enter Your Zip Code"
          rules={{
            required: "Zip Code is required",
          }}
        />
        <BaseInput
          type="text"
          control={control}
          name="country"
          label="Country"
          placeholder="Enter Your Country"
          rules={{
            required: "Country is required",
          }}
        />
      </div>
      <BaseButton
        onClick={async () => {
          const isValid = await trigger();
          if (isValid) {
            addEmployeeState.step = EMPLOYEE_FORM_STEPPERS.QUALIFICATION;
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
