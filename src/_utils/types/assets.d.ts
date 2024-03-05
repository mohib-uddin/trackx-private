import { z } from "zod";

import { employeeType } from "@/_utils/types/employees";
import { assetSchema } from "@/components/modules/hr/assets/all-assets";
import { assetTypeSchema } from "@/components/modules/hr/assets/assets-type";

export type createAssetTypeType = z.infer<typeof assetTypeSchema>;
export type assetTypeType = {
  id: number;
  name: string;
  description: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type fetchAllAssetTypeApiResponse = {
  message: string;
  data: assetTypeType[];
  page: number;
  lastPage: number;
  total: number;
};

export type createAssetType = z.infer<typeof assetSchema>;

type assetType = {
  id: number;
  name: string;
  description: string;
  idNo: number;
  taxable: boolean;
  condition: string;
  manufacturer: string;
  model: string;
  attachment: string;
  status: boolean;
  currentValue: number;
  createdAt: string;
  updatedAt: string;
  assetTypeId: number;
  isAllocated: boolean;
};

type fetchAllAssetApiResponse = {
  message: string;
  data: assetType[];
  page: number;
  limit: string;
  total: number;
  lastPage: number;
};

export type allocatedAssetType = {
  id: number;
  allocatedDate: string;
  attachment: string;
  description: string;
  access: "Granted" | "Revoked";
  status: boolean;
  assetId: number;
  userId: number;
  asset: assetType;
  user: employeeType;
};
export type fetchAllAllocatedAssetsApiResponse = {
  message: string;
  data: allocatedAssetType[];
  page: number;
  limit: number;
  lastPage: number;
  total: number;
};
