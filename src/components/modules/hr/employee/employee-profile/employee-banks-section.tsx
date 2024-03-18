"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { EditIcon } from "@nextui-org/shared-icons";
import { PlusIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { employeeType } from "@/_utils/types/employees";
import BaseInput from "@/components/common/form/base-input";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import BankService from "@/services/banks/client/banks.service";

export const bankDetailsSchema = z.object({
  bankName: z.string({ required_error: "Bank Name Is Required" }),
  type: z.string({ required_error: "Type Is Required" }),
  bankCode: z.string({ required_error: "Bank Code Is Required" }),
  branchName: z.string({ required_error: "Branch Name Is Required" }).min(2),
  branchCode: z.string({ required_error: "Branch Code Is Required" }),
  accTitle: z.string({ required_error: "Account Title is Required" }),
  accNo: z.string(),
  effectiveDate: z.string({ required_error: "Effective Date Is Required" }),
  userId: z.number(),
});
export const editBankDetailsSchema = bankDetailsSchema.extend({
  id: z.string(),
});

const EmployeeBanks = ({ employeeData }: { employeeData: employeeType }) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<z.infer<typeof bankDetailsSchema>>({
    resolver: zodResolver(bankDetailsSchema),
    shouldUnregister: false,
    defaultValues: { type: "Employee", userId: Number(employeeData.id) },
  });
  const {
    handleSubmit: handleEditSubmit,
    control: editControl,
    setValue: setEditValue,
  } = useForm<z.infer<typeof editBankDetailsSchema>>({
    resolver: zodResolver(editBankDetailsSchema),
    shouldUnregister: false,
    defaultValues: { type: "Employee", userId: Number(employeeData.id) },
  });

  const {
    useHandleAddBankDetails,
    useHandleUpdateBankDetails,
    useHandleDeleteBankDetails,
  } = BankService();
  const {
    mutate: handleUpdateBankDetails,
    isPending: isHandleUpdateBankDetailsPending,
  } = useHandleUpdateBankDetails();
  const {
    mutate: handleAddBankDetails,
    isPending: isHandleAddBankDetailsPending,
  } = useHandleAddBankDetails();
  console.log(employeeData.bank, "ba");
  const {
    mutate: handleDeleteBankDetails,
    isPending: isHandleDeleteBankDetailsPending,
  } = useHandleDeleteBankDetails();
  return (
    <main className={"w-full p-4"}>
      <div className={"mb-2 flex justify-between item-center gap-x-4"}>
        <h2 className={"text-xl font-[700]"}>Employee Banks:</h2>
        <BaseFormModal
          name={"Add Bank Details"}
          title={"Add Bank Details"}
          isIconButton={true}
          icon={<PlusIcon size={15} />}
          handleSubmit={handleSubmit}
          action={handleAddBankDetails}
          isLoading={isHandleAddBankDetailsPending}
        >
          <div className={"flex flex-col gap-4"}>
            <BaseInput
              placeholder={"Enter Bank Name"}
              label={"Bank Name"}
              name={"bankName"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Account Title"}
              label={"Account Title"}
              name={"accTitle"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Account Number"}
              label={"Account Number"}
              name={"accNo"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Bank Code"}
              label={"Bank Code"}
              name={"bankCode"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Branch Name"}
              label={"Branch Name"}
              name={"branchName"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Branch Code"}
              label={"Branch Code"}
              name={"branchCode"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Effective Date"}
              label={"Effective Date"}
              name={"effectiveDate"}
              type={"date"}
              control={control}
            />
          </div>
        </BaseFormModal>
      </div>
      <div className={"flex flex-wrap w-full  gap-4"}>
        {employeeData?.bank?.map((el, index) => (
          <Card key={index} className="bg-[#CCE3FD] w-full max-w-[400px]">
            <CardHeader className="flex items-center justify-between">
              <p className="text-lg text-left font-bold">{el.bankName}</p>
              <BaseFormModal
                name={"Edit Bank Details"}
                title={"Edit Bank Details"}
                isIconButton={true}
                openCallback={() => {
                  setEditValue("id", el.id.toString());
                  setEditValue("bankName", el.bankName);
                  setEditValue("bankCode", el.bankCode);
                  setEditValue("branchName", el.branchName);
                  setEditValue("branchCode", el.branchCode);
                  setEditValue("accTitle", el.accTitle);
                  setEditValue("accNo", el.accNo);
                  setEditValue("effectiveDate", el.effectiveDate);
                }}
                icon={<EditIcon />}
                handleSubmit={handleEditSubmit}
                action={handleUpdateBankDetails}
                isLoading={isHandleUpdateBankDetailsPending}
              >
                <div className={"flex flex-col gap-4"}>
                  <BaseInput
                    placeholder={"Enter Bank Name"}
                    label={"Bank Name"}
                    name={"bankName"}
                    type={"text"}
                    control={editControl}
                  />
                  <BaseInput
                    placeholder={"Enter Account Title"}
                    label={"Account Title"}
                    name={"accTitle"}
                    type={"text"}
                    control={editControl}
                  />
                  <BaseInput
                    placeholder={"Enter Account Number"}
                    label={"Account Number"}
                    name={"accNo"}
                    type={"text"}
                    control={editControl}
                  />
                  <BaseInput
                    placeholder={"Enter Bank Code"}
                    label={"Bank Code"}
                    name={"bankCode"}
                    type={"text"}
                    control={editControl}
                  />
                  <BaseInput
                    placeholder={"Enter Branch Name"}
                    label={"Branch Name"}
                    name={"branchName"}
                    type={"text"}
                    control={editControl}
                  />
                  <BaseInput
                    placeholder={"Enter Branch Code"}
                    label={"Branch Code"}
                    name={"branchCode"}
                    type={"text"}
                    control={editControl}
                  />
                  <BaseInput
                    placeholder={"Enter Effective Date"}
                    label={"Effective Date"}
                    name={"effectiveDate"}
                    type={"date"}
                    control={editControl}
                  />
                </div>
              </BaseFormModal>
            </CardHeader>
            <CardBody className={"w-full"}>
              <p>
                <span className={"font-bold"}>Account No:</span> {el?.accNo}
              </p>
              <p>
                <span className={"font-bold"}>Account Title:</span>{" "}
                {el?.accTitle}
              </p>
              <p>
                <span className={"font-bold"}>Branch Name:</span>{" "}
                {el?.branchName}
              </p>
              <p>
                <span className={"font-bold"}>Branch Code:</span>
                {el?.branchCode}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </main>
  );
};
export default EmployeeBanks;
