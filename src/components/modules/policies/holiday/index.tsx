"use client";
import Breadcrumb from "@/components/common/breadcrumbs";
import BaseTabs from "@/components/common/tabs/base-tabs";
import PublicHolidayManagement from "@/components/modules/policies/holiday/public-holiday";
import WeeklyHolidayManagement from "@/components/modules/policies/holiday/weekly-holiday";

const HolidayManagement = () => {
  const tabs = [
    {
      title: "Public Holiday",
      children: <PublicHolidayManagement />,
    },
    {
      title: "Weekly Holiday",
      children: <WeeklyHolidayManagement />,
    },
  ];

  return (
    <>
      <Breadcrumb pageName={"Holiday Policy"} />
      <div className={"mt-6"}>
        <BaseTabs color={"primary"} variant={"underlined"} tabs={tabs} />
      </div>
    </>
  );
};
export default HolidayManagement;
