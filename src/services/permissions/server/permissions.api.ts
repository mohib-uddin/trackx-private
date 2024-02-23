import serverFetch from "@/_utils/config/server-fetch";
import {
  fetchPermissionsByDepartmentType,
  rolePermissionsType,
} from "@/_utils/types/permissions";

export function fetchPermissionsByDepartment(): Promise<fetchPermissionsByDepartmentType> {
  return serverFetch(`/permission/by-category?page=1&limit=1000`, [
    "permissions-by-category",
  ]);
}
export function fetchRolePermissions(id: number): Promise<rolePermissionsType> {
  return serverFetch(`/role/${id}`, ["permissions-by-role"]);
}
