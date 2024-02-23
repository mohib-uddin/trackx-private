"use client";
import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/modal";
import { EyeIcon } from "@nextui-org/shared-icons";
import React, { Key, useState } from "react";
import { useForm } from "react-hook-form";

import { PAYROLL_DETAILS_COLS } from "@/_utils/data/tables/payroll";
import { capitalizeAfterSpace } from "@/_utils/helpers";
import { payrollDetailsType } from "@/_utils/types/payroll";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseInput from "@/components/common/form/base-input";
import BaseHeader from "@/components/common/header/base-header";
import BaseModal from "@/components/common/modal/base-modal";
import BaseTable from "@/components/common/tables/base-table";
import PayrollService from "@/services/payroll/client/payroll.service";

type formType = {
  fields: {
    salaryPayable: string;
    bonus: number;
    bonusComment: string;
    deduction: number;
    deductionComment: string;
  }[];
};

export default function CreatePayrollForm() {
  const [salaryMonth, setSalaryMonth] = useState(new Date().getMonth() + 1);
  const [salaryYear, setSalaryYear] = useState(new Date().getFullYear());
  const [selectedEmployee, setSelectedEmployee] =
    useState<payrollDetailsType>();

  const { useFetchAllEmployeePayrollDetails, useHandleCreatePayroll } =
    PayrollService();
  const [page, setPage] = useState(1);

  const {
    handleSubmit,
    control,
    formState: { isValid },
    register,
  } = useForm<formType>({
    shouldUnregister: false,
    defaultValues: {
      fields: [
        {
          salaryPayable: "",
          bonus: 0,
          bonusComment: "",
          deduction: 0,
          deductionComment: "",
        },
      ],
    },
  });
  const { data: payrollData, isLoading: isPayrollDataLoading } =
    useFetchAllEmployeePayrollDetails(salaryMonth.toString(), salaryYear);
  const {
    mutate: handleGeneratePayroll,
    isPending: isHandleGeneratePayrollPending,
  } = useHandleCreatePayroll();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const renderCell = React.useCallback(
    (payrolLDetail: payrollDetailsType, columnKey: Key) => {
      const cellValue = payrolLDetail[columnKey as keyof payrollDetailsType];
      const index =
        payrollData?.data.findIndex(
          (el) => el.firstName === payrolLDetail.firstName,
        ) || 0;
      switch (columnKey) {
        case "name":
          return (
            <p>
              {capitalizeAfterSpace(
                payrolLDetail.firstName + " " + payrolLDetail.lastName,
              )}
            </p>
          );
        case "bonus":
          return (
            <div className={"w-28"}>
              <BaseInput
                {...register(`fields.${index}.bonus`)}
                type={"number"}
                control={control}
                variant={"faded"}
                size={"xs"}
                extraClass={"!py-1"}
              />
            </div>
          );
        case "bonusComment":
          return (
            <div>
              <BaseInput
                {...register(`fields.${index}.bonusComment`)}
                type={"text"}
                control={control}
                variant={"faded"}
                size={"xs"}
              />
            </div>
          );
        case "deduction":
          return (
            <div className={"w-28"}>
              <BaseInput
                {...register(`fields.${index}.deduction`)}
                type={"number"}
                control={control}
                variant={"faded"}
                size={"xs"}
              />
            </div>
          );
        case "deductionComment":
          return (
            <div>
              <BaseInput
                {...register(`fields.${index}.deductionComment`)}
                type={"text"}
                variant={"faded"}
                size={"xs"}
                control={control}
              />
            </div>
          );
        case "salaryPayable":
          return (
            <div className={"w-28"}>
              <BaseInput
                {...register(`fields.${index}.salaryPayable`)}
                type={"number"}
                control={control}
                variant={"faded"}
                size={"xs"}
              />
            </div>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <span
                onClick={() => {
                  setSelectedEmployee(payrolLDetail);
                  onOpen();
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </span>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );
  const loadingState = isPayrollDataLoading ? "loading" : "idle";
  const handleGeneratePayrollSubmit = (data: formType) => {
    const payrollFields = payrollData?.data.map((el, index) => {
      return {
        bonus: data.fields[index].bonus || 0,
        bonusComment: data.fields[index].bonusComment || "",
        deduction: data.fields[index].deduction || 0,
        deductionComment: data.fields[index].deductionComment || "",
        hourlySalary: el.hourlySalary,
        monthlyHoliday: el.monthlyHoliday,
        monthlyWorkHour: el.monthlyWorkHour,
        paidLeave: el.paidLeave,
        publicHoliday: el.publicHoliday,
        salary: el.salary,
        salaryMonth: salaryMonth,
        salaryPayable: Number(data.fields[index].salaryPayable),
        salaryYear: salaryYear,
        shiftWiseWorkHour: el.shiftWiseWorkHour,
        totalPayable:
          Number(data.fields[index].salaryPayable) +
          Number(data.fields[index].bonus) -
          Number(data.fields[index].deduction),
        unpaidLeave: el.unpaidLeave,
        userId: el.id,
        workDay: el.workDay,
        workingHour: el.workingHour,
      };
    });
    console.log(payrollFields);
    if (payrollFields) {
      handleGeneratePayroll(payrollFields);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleGeneratePayrollSubmit)}
      className={"flex flex-col justify-center"}
    >
      <Breadcrumb pageName={"Calculate Payroll"} />
      <BaseTable
        cols={PAYROLL_DETAILS_COLS}
        key={"payroll"}
        topContent={<></>}
        pages={1}
        page={page}
        setPage={setPage}
        data={payrollData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
      <div className={"flex justify-end mt-4"}>
        <Button
          isLoading={isHandleGeneratePayrollPending}
          color={"primary"}
          type={"submit"}
        >
          Generate Pay Slip
        </Button>
      </div>
      <BaseModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        actionTitle={"OK"}
        title={capitalizeAfterSpace(
          selectedEmployee?.firstName + " " + selectedEmployee?.lastName,
        )}
      >
        <div className={"flex flex-col gap-y-2"}>
          <div className={"flex justify-between items-center"}>
            <p>Paid Leaves</p>
            <p className={"font-[600]"}>{selectedEmployee?.paidLeave}</p>
          </div>
          <div className={"flex justify-between items-center"}>
            <p>Unpaid Leaves</p>
            <p className={"font-[600]"}>{selectedEmployee?.unpaidLeave}</p>
          </div>
          <div className={"flex justify-between items-center"}>
            <p>Monthly Holiday</p>
            <p className={"font-[600]"}>{selectedEmployee?.monthlyHoliday}</p>
          </div>
          <div className={"flex justify-between items-center"}>
            <p>Public Holiday</p>
            <p className={"font-[600]"}>{selectedEmployee?.publicHoliday}</p>
          </div>
          <div className={"flex justify-between items-center"}>
            <p>Work Day</p>
            <p className={"font-[600]"}>{selectedEmployee?.workDay}</p>
          </div>
          <div className={"flex justify-between items-center"}>
            <p>Shift Work Hours</p>
            <p className={"font-[600]"}>
              {selectedEmployee?.shiftWiseWorkHour}
            </p>
          </div>
          <div className={"flex justify-between items-center"}>
            <p>Monthly Work Hours</p>
            <p className={"font-[600]"}>{selectedEmployee?.monthlyWorkHour}</p>
          </div>
          <div className={"flex justify-between items-center"}>
            <p>Hourly Salary</p>
            <p className={"font-[600]"}>{selectedEmployee?.hourlySalary}</p>
          </div>
        </div>
      </BaseModal>
    </form>
  );
}
