import GrantPermissions from "@/components/modules/roles/grant-permissions";
import {
  fetchPermissionsByDepartment,
  fetchRolePermissions,
} from "@/services/permissions/server/permissions.api";

const SingleRolePage = async ({ params }: { params: { roleId: string } }) => {
  const { roleId } = params;
  const permissions = await fetchPermissionsByDepartment();
  const rolePrivileges = await fetchRolePermissions(Number(roleId));
  return (
    <GrantPermissions
      permissions={permissions}
      rolePermissions={rolePrivileges}
    />
  );
};
export default SingleRolePage;
