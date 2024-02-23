export type permissionType = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type fetchPermissionsByDepartmentType = {
  message: string;
  data: {
    category: string;
    permissions: permissionType[];
  }[];
  page: number;
  limit: number;
  total: number;
  lastPage: number;
};

export type rolePermissionsType = {
  data: {
    id: number;
    name: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    rolePermission: {
      id: number;
      role_id: number;
      permission_id: number;
      status: boolean;
      createdAt: string;
      updatedAt: string;
      permission: {
        id: number;
        name: string;
        createdAt: string;
        updatedAt: string;
      };
    }[];
  };
};
