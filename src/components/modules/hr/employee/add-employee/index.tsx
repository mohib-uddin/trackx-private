"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody } from "@nextui-org/card";
import { useState } from "react";
import {
  Control,
  FieldPath,
  SubmitErrorHandler,
  SubmitHandler,
  TriggerConfig,
  useForm,
} from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSnapshot } from "valtio";
import * as z from "zod";

import { EMPLOYEE_FORM_STEPPERS } from "@/_utils/enums";
import { employeeFormType } from "@/_utils/types/employees";
import FormStepperPanel from "@/components/common/form/form-stepper-panel";
import AddressInformationForm from "@/components/modules/hr/employee/add-employee/address-information";
import DesignationInformation from "@/components/modules/hr/employee/add-employee/designation-information";
import EmployeeInformation from "@/components/modules/hr/employee/add-employee/employee-information";
import QualificationForm from "@/components/modules/hr/employee/add-employee/qualifications";
import UserInformationForm from "@/components/modules/hr/employee/add-employee/user-information";
import DepartmentService from "@/services/department/client/department.service";
import DesignationService from "@/services/designation/client/designation.service";
import EmployeeService from "@/services/employees/client/employee.service";
import LeavePolicyService from "@/services/leave-policy/client/leave-policy.service";
import RolesService from "@/services/roles/client/roles.service";
import ShiftService from "@/services/shift/client/shifts.service";
import WeeklyHolidayService from "@/services/weekly-holiday/client/weekly-holiday.service";
import addEmployeeState from "@/store";

export type employeeFormTrigger = (
  name?: FieldPath<employeeFormType> | FieldPath<employeeFormType>[],
  options?: TriggerConfig,
) => Promise<boolean>;

export type employeeFormControl = Control<employeeFormType, any>;
export type employeeFormSubmitType = (
  onValid: SubmitHandler<employeeFormType>,
  onInvalid?: SubmitErrorHandler<employeeFormType>,
) => (e?: React.BaseSyntheticEvent) => Promise<void>;

const steps = [
  {
    id: "Step 1",
    name: "User Information",
  },
  {
    id: "Step 2",
    name: "Address",
  },
  {
    id: "Step 3",
    name: "Qualifications",
  },
  {
    id: "Step 4",
    name: "Employee Details",
  },
  {
    id: "Step 4",
    name: "Designation",
  },
];

const formSchema = [
  z.object({
    firstName: z.string().min(1, "First Name Is Required"),
    lastName: z.string().min(1, "Last Name Is Required"),
    userName: z.string().min(1, "Username Is Required"),
    password: z.string().min(8, "Password Must Atleast Be Of 8 Characters"),
    email: z.string().email("Invalid Email"),
    // file: z
    //   .any()
    //   .refine((files) => files?.length == 1, "Image is required.")
    //   .refine(
    //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //     `Max file size is 5MB.`,
    //   )
    //   .refine(
    //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
    //     ".jpg, .jpeg and, .png files are accepted.",
    //   ),
    file: z.any(),
  }),
  z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string(),
  }),
  z.object({
    skill: z.string(),
  }),
  z.object({
    joinDate: z.string(),
    leaveDate: z.string(),
    employmentStatusId: z.number(),
    departmentId: z.number(),
    roleId: z.number(),
    shiftId: z.number(),
    leavePolicyId: z.number(),
    weeklyHolidayId: z.number(),
  }),
  z.object({
    designationId: z.number(),
    designationStartDate: z.string(),
    designationEndDate: z.string(),
    salary: z.number().optional(),
    salaryStartDate: z.string().optional(),
    salaryEndDate: z.string().optional(),
    salaryComment: z.string().optional(),
  }),
];

export const mergedFormSchema = z.object({
  designationId: z.number(),
  designationStartDate: z.string(),
  designationEndDate: z.string(),
  salary: z.number().optional(),
  salaryStartDate: z.string().optional(),
  salaryEndDate: z.string().optional(),
  salaryComment: z.string().optional(),
  joinDate: z.string(),
  leaveDate: z.string(),
  employmentStatusId: z.number(),
  departmentId: z.number(),
  roleId: z.number(),
  shiftId: z.number(),
  skill: z.string(),
  leavePolicyId: z.number(),
  weeklyHolidayId: z.number(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  country: z.string(),
  firstName: z.string().min(1, "First Name Is Required"),
  lastName: z.string().min(1, "Last Name Is Required"),
  userName: z.string().min(1, "Username Is Required"),
  password: z.string().min(8, "Password Must Atleast Be Of 8 Characters"),
  email: z.string().email("Invalid Email"),
  file: z.any(),
  // file: z
  //   .any()
  //   .refine((files) => files?.length == 1, "Image is required.")
  //   .refine(
  //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
  //     `Max file size is 5MB.`,
  //   )
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //     ".jpg, .jpeg and, .png files are accepted.",
  //   ),
});

const AddEmployeeForm = () => {
  const snap = useSnapshot(addEmployeeState);
  const currentValidationSchema = formSchema[snap.step];
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
    trigger,
    register,
    watch,
  } = useForm<employeeFormType>({
    resolver: zodResolver(
      snap.step === EMPLOYEE_FORM_STEPPERS.DESIGNATION
        ? mergedFormSchema
        : currentValidationSchema,
    ),
    shouldUnregister: false,
    mode: "onChange",
  });
  const { useFetchAllDesignations } = DesignationService();
  const { useFetchAllDepartments } = DepartmentService();
  const { useFetchAllRoles } = RolesService();
  const { useFetchAllShifts } = ShiftService();
  const { useFetchAllWeeklyHolidays } = WeeklyHolidayService();
  const { useFetchAllEmploymentStatus, useHandleCreateNewEmployee } =
    EmployeeService();
  const { useFetchAllLeavePolicies } = LeavePolicyService();
  const { data: designationData } = useFetchAllDesignations(1, "", true);
  const { data: departmentData } = useFetchAllDepartments("", 1, true);
  const { data: rolesData } = useFetchAllRoles("all", 1);
  const { data: shiftData } = useFetchAllShifts("true");
  const { data: employmentStatus } = useFetchAllEmploymentStatus(true);
  const { data: leavePolicies } = useFetchAllLeavePolicies(1, "all");
  const { data: weeklyHoliday } = useFetchAllWeeklyHolidays("all", 1);
  const [skills, setSkills] = useState<string[]>([]);
  const {
    mutate: handleCreateEmployee,
    isPending: isHandleCreateEmployeePending,
  } = useHandleCreateNewEmployee();
  const onSubmit = (data: any) => {
    const formData = new FormData();
    const keys = Object.keys(data);
    keys.forEach((el) => {
      if (el.includes("designation") || el.includes("salary")) {
      } else if (el == "file") {
        formData.append(el, data[el][0]);
      } else if (el === "skill") {
        skills.forEach((el, index) => {
          formData.append(`skill[${index}]`, el);
        });
      } else {
        formData.append(el, data[el]);
      }
    });
    formData.append("designationHistory[designationId]", data.designationId);
    formData.append("designationHistory[startDate]", data.designationStartDate);
    formData.append("designationHistory[endDate]", data.designationEndDate);
    formData.append("salaryHistory[startDate]", data.salaryStartDate);
    formData.append("salaryHistory[endDate]", data.salaryEndDate);
    formData.append("salaryHistory[comment]", data.salaryComment);
    formData.append("salaryHistory[salary]", data.salary);

    handleCreateEmployee(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"w-full md:w-[80%] xl:w-[60%] m-auto"}
    >
      <Card>
        <CardBody className={"p-8"}>
          <div className={"flex  gap-4"}>
            {snap.step > EMPLOYEE_FORM_STEPPERS.USER && (
              <IoMdArrowRoundBack
                className={"mt-2 cursor-pointer"}
                size={20}
                onClick={() => (addEmployeeState.step -= 1)}
              />
            )}
            <h3 className="mt-0 main-page-heading">{"Add A Employee"}</h3>
          </div>

          <FormStepperPanel currentStep={snap.step} steps={steps} />
          {snap.step === EMPLOYEE_FORM_STEPPERS.USER && (
            <UserInformationForm
              watch={watch}
              trigger={trigger}
              control={control}
            />
          )}
          {snap.step === EMPLOYEE_FORM_STEPPERS.ADDRESS && (
            <AddressInformationForm trigger={trigger} control={control} />
          )}
          {snap.step === EMPLOYEE_FORM_STEPPERS.QUALIFICATION && (
            <QualificationForm
              register={register}
              trigger={trigger}
              control={control}
              skills={skills}
              setSkills={setSkills}
            />
          )}
          {snap.step === EMPLOYEE_FORM_STEPPERS.EMPLOYEE && (
            <EmployeeInformation
              departmentData={departmentData}
              rolesData={rolesData}
              shiftData={shiftData}
              employmentStatus={employmentStatus?.data}
              leavePolicies={leavePolicies?.data}
              control={control}
              weeklyHoliday={weeklyHoliday}
              trigger={trigger}
            />
          )}
          {snap.step === EMPLOYEE_FORM_STEPPERS.DESIGNATION && (
            <DesignationInformation
              designationData={designationData}
              control={control}
              trigger={trigger}
              handleSubmit={handleSubmit}
            />
          )}
        </CardBody>
      </Card>
    </form>
  );
};
export default AddEmployeeForm;
