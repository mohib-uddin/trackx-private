import { useFieldArray } from "react-hook-form";

import { EMPLOYEE_FORM_STEPPERS } from "@/_utils/enums";
import BaseButton from "@/components/common/button/base-button";
import BaseInput from "@/components/common/form/base-input";
import BaseTagInput from "@/components/common/form/base-tag-input";
import {
  employeeFormControl,
  employeeFormTrigger,
} from "@/components/modules/hr/employee/add-employee/index";
import addEmployeeState from "@/store";

export default function QualificationForm({
  control,
  trigger,
  register,
}: {
  control: employeeFormControl;
  trigger: employeeFormTrigger;
  register: any;
}) {
  const { fields, append, remove } = useFieldArray({
    name: "education",
    control: control,
  });
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4 mb-4">
        <BaseTagInput
          type="text"
          control={control}
          name="skill"
          label="Skills"
          placeholder="eg: Reactjs Nextjs"
        />
      </div>
      {/*<span*/}
      {/*  onClick={() =>*/}
      {/*    append({*/}
      {/*      degree: "",*/}
      {/*      institution: "",*/}
      {/*      startDate: "",*/}
      {/*      endDate: "",*/}
      {/*      field: "",*/}
      {/*    })*/}
      {/*  }*/}
      {/*>*/}
      {/*  Add Education*/}
      {/*</span>*/}
      {/*<div className={"mb-4"}>*/}
      {/*  {fields.map((el, index) => {*/}
      {/*    return (*/}
      {/*      <div className={"flex gap-2"} key={index}>*/}
      {/*        <BaseInput*/}
      {/*          control={control}*/}
      {/*          {...register(`education.${index}.degree`)}*/}
      {/*          type={"text"}*/}
      {/*          placeholder={"Degree"}*/}
      {/*        />*/}
      {/*        <BaseInput*/}
      {/*          control={control}*/}
      {/*          {...register(`education.${index}.institution`)}*/}
      {/*          type={"text"}*/}
      {/*          placeholder={"Institution"}*/}
      {/*        />*/}
      {/*        <BaseInput*/}
      {/*          control={control}*/}
      {/*          {...register(`education.${index}.startDate`)}*/}
      {/*          type={"text"}*/}
      {/*          placeholder={"Start Date"}*/}
      {/*        />*/}
      {/*        <BaseInput*/}
      {/*          control={control}*/}
      {/*          {...register(`education.${index}.endDate`)}*/}
      {/*          type={"text"}*/}
      {/*          placeholder={"End Date"}*/}
      {/*        />*/}
      {/*        <BaseInput*/}
      {/*          control={control}*/}
      {/*          {...register(`education.${index}.field`)}*/}
      {/*          type={"text"}*/}
      {/*          placeholder={"Field"}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}

      <BaseButton
        onClick={async () => {
          const isValid = await trigger();
          if (isValid) {
            addEmployeeState.step = EMPLOYEE_FORM_STEPPERS.EMPLOYEE;
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
