import { useEffect, useState } from "react";

import { EMPLOYEE_FORM_STEPPERS } from "@/_utils/enums";
import BaseButton from "@/components/common/button/base-button";
import BaseDropzone from "@/components/common/form/base-dropzone";
import BaseFile from "@/components/common/form/base-file";
import BaseInput from "@/components/common/form/base-input";
import {
  employeeFormControl,
  employeeFormTrigger,
} from "@/components/modules/hr/employee/add-employee/index";
import addEmployeeState from "@/store";

export default function UserInformationForm({
  control,
  trigger,
  watch,
}: {
  control: employeeFormControl;
  trigger: employeeFormTrigger;
  watch: any;
}) {
  const [selectedImage, setSelectedImage] = useState<null | File[]>(null);
  const image = watch("file");
  useEffect(() => {
    if (image) {
      setSelectedImage(image);
    }
  }, [image]);
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseInput
          type="text"
          control={control}
          name="firstName"
          label="First Name"
          placeholder="Enter Your First Name"
        />
        <BaseInput
          type="text"
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Enter Your Last Name"
        />
        <BaseInput
          type="text"
          control={control}
          name="userName"
          label="User Name"
          placeholder="Enter Your User Name"
        />
        <BaseInput
          type="password"
          control={control}
          name="password"
          label="Password"
          placeholder="Enter Your Password"
        />
        <BaseInput
          type="email"
          control={control}
          name="email"
          label="Email"
          placeholder="Enter Your Email"
        />
      </div>
      <div className={"mt-4 w-full md:w-1/2"}>
        <p className={"mb-2 font-semibold text-primary"}>Employee Image:</p>
        <BaseDropzone
          control={control}
          name={"file"}
          multiple={true}
          maxFiles={1}
        />
      </div>

      <BaseButton
        onClick={async () => {
          const isValid = await trigger();
          if (isValid) {
            addEmployeeState.step = EMPLOYEE_FORM_STEPPERS.ADDRESS;
          }
        }}
        isLoading={false}
        extraClass={"mt-4"}
        type="button"
      >
        {`Next`}
      </BaseButton>
    </div>
  );
}
