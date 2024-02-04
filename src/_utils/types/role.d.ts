export type roleType = {
  id: string;
  name: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
};

export type fetchAllRolesApiResponse = roleType[];
