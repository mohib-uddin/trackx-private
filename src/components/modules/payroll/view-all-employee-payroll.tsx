"use client";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import React, { Key, useState } from "react";

import { PAYSLIP_COLS } from "@/_utils/data/tables/payroll";
import { capitalizeAfterSpace } from "@/_utils/helpers";
import { payslipType } from "@/_utils/types/payroll";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseSearch from "@/components/common/form/base-search";
import BaseHeader from "@/components/common/header/base-header";
import BaseTable from "@/components/common/tables/base-table";
import InvoicePDF from "@/components/modules/payroll/payslip-pdf";
import GeneratePDF from "@/components/widgets/pdf/pdf-download";
import PayrollService from "@/services/payroll/client/payroll.service";

const STATUS_FILTER = ["ALL", "PAID", "UNPAID"];

export const dummyInvoiceData = {
  data: {
    user: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1234567890",
      address: "123 Main St, Anytown, USA",
    },
    _id: "INV123456789",
    createdAt: "2024-02-13T08:00:00.000Z",
    consignment: {
      _id: "CON123456789",
      order: {
        _id: "ORD123456789",
        total: 500,
        products: [
          {
            product: {
              name: "Product 1",
            },
            soldQuantity: 2,
            amount: 100,
          },
          {
            product: {
              name: "Product 2",
            },
            soldQuantity: 1,
            amount: 200,
          },
          {
            product: {
              name: "Product 3",
            },
            soldQuantity: 3,
            amount: 300,
          },
        ],
      },
    },
  },
};

export default function ViewAllEmployeePayroll() {
  const { useFetchAllPaySlips, useHandleMakePayment } = PayrollService();
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [salaryMonth, setSalaryMonth] = useState(new Date().getMonth() + 1);
  const [salaryYear, setSalaryYear] = useState(new Date().getFullYear());

  const { data: payslipData, isLoading: isPaySlipDataLoading } =
    useFetchAllPaySlips(salaryMonth.toString(), salaryYear, page);
  const { mutate: makePayment, isPending: isHandleMakePaymentPending } =
    useHandleMakePayment();
  const renderCell = React.useCallback(
    (payslip: payslipType, columnKey: Key) => {
      const cellValue = payslip[columnKey as keyof payslipType];

      switch (columnKey) {
        case "name":
          return (
            <p>
              {capitalizeAfterSpace(
                payslip.user.firstName + " " + payslip.user.lastName,
              )}
            </p>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {payslip.paymentStatus === "UNPAID" && (
                <Button
                  isLoading={isHandleMakePaymentPending}
                  onPress={() =>
                    makePayment({
                      salaryYear: payslip.salaryYear.toString(),
                      salaryMonth: payslip.salaryMonth.toString(),
                      paymentStatus: payslip.paymentStatus,
                      value: "monthWise",
                      id: payslip.user.id.toString(),
                    })
                  }
                  color={"primary"}
                >
                  Pay
                </Button>
              )}
              <GeneratePDF filename={payslip.user.firstName}>
                <InvoicePDF invoice={dummyInvoiceData} />
              </GeneratePDF>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [],
  );

  const loadingState = isPaySlipDataLoading ? "loading" : "idle";
  const [status, setStatus] = useState("ALL");
  const topContent = React.useMemo(() => {
    return (
      <div className={"flex flex-col md:flex-row w-full justify-between"}>
        <div className={"w-3/4"}>
          <BaseSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setPage={setPage}
            placeholder={"Search"}
          />
        </div>
        <div
          className={
            "flex flex-col md:flex-row gap-4 mt-4 md:mt-0 items-left md:items-center"
          }
        >
          <Tabs
            selectedKey={status}
            // @ts-ignore
            onSelectionChange={setStatus}
            color={"primary"}
            aria-label="Tabs variants"
          >
            {STATUS_FILTER.map((el) => (
              <Tab
                className={`${status === el && "text-white"}`}
                key={el}
                title={el}
              />
            ))}
          </Tabs>
        </div>
      </div>
    );
  }, [searchQuery, page, isActive]);
  return (
    <div className={"flex flex-col justify-center"}>
      <Breadcrumb pageName={"View Pay Slips"} />
      <BaseTable
        cols={PAYSLIP_COLS}
        key={"designation"}
        topContent={topContent}
        pages={payslipData?.lastPage || 1}
        page={page}
        setPage={setPage}
        data={payslipData?.data || []}
        loadingState={loadingState}
        renderCell={renderCell}
      />
    </div>
  );
}
