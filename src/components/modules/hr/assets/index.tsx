"use client";
import BaseTabs from "@/components/common/tabs/base-tabs";
import AllAssets from "@/components/modules/hr/assets/all-assets";
import AllocatedAssets from "@/components/modules/hr/assets/allocated-assets";
import AssetsType from "@/components/modules/hr/assets/assets-type";

const AssetManagement = () => {
  const tabs = [
    {
      title: "Assets",
      children: <AllAssets />,
    },
    {
      title: "Asset Allocations",
      children: <AllocatedAssets />,
    },
    {
      title: "Asset Types",
      children: <AssetsType />,
    },
  ];

  return (
    <div className={"mt-6"}>
      <BaseTabs color={"primary"} variant={"underlined"} tabs={tabs} />
    </div>
  );
};
export default AssetManagement;
