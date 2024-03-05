import { allocatedAssetType } from "@/_utils/types/assets";

export type renderAssetType = {
  id: string;
  name: string;
  description: string;
  idNo: number;
  taxable: boolean;
  condition: string;
  manufacturer: string;
  model: string;
  currentValue: number;
  assetTypeId: number;
  createdAt: string;
  isAllocated: boolean;
  actions: React.ReactNode;
};
export type renderAlocatedAssetType = {
  id: string;
  description: string;
  allocatedDate: string;
  access: number;
  actions: React.ReactNode;
  user: React.ReactNode | string;
  asset: string;
};

type assetsColsType = {
  name: string;
  uid: keyof renderAssetType;
};
type allocatedAssetsColsType = {
  name: string;
  uid: keyof renderAlocatedAssetType;
};
export const ASSETS_COLS: assetsColsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Description",
    uid: "description",
  },
  {
    name: "Identification",
    uid: "idNo",
  },
  {
    name: "Taxable?",
    uid: "taxable",
  },
  {
    name: "Condition",
    uid: "condition",
  },
  {
    name: "Manufacturer",
    uid: "manufacturer",
  },
  {
    name: "Model",
    uid: "model",
  },
  {
    name: "Current Value",
    uid: "currentValue",
  },
  {
    name: "Asset Type",
    uid: "assetTypeId",
  },
  {
    name: "Created At",
    uid: "createdAt",
  },
  {
    name: "Is Allocated",
    uid: "isAllocated",
  },
  {
    name: "Actions",
    uid: "actions",
  },
];

export const ALLOCATED_ASSETS_COLS: allocatedAssetsColsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "Employee",
    uid: "user",
  },
  {
    name: "Asset",
    uid: "asset",
  },
  {
    name: "Description",
    uid: "description",
  },
  {
    name: "Allocated Date",
    uid: "allocatedDate",
  },
  {
    name: "Access",
    uid: "access",
  },
  {
    name: "Actions",
    uid: "actions",
  },
];

export const employeeStatusColorMap: employeeStatusColorMapType = {
  lead: "success",
  Intern: "danger",
  vacation: "warning",
};

export type employeeStatusColorMapType = {
  [key: string]: "success" | "danger" | "warning";
  lead: "success" | "danger" | "warning";
  Intern: "success" | "danger" | "warning";
  vacation: "success" | "danger" | "warning";
};
