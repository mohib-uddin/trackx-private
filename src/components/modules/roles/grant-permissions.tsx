"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useState } from "react";

import {
  fetchPermissionsByDepartmentType,
  rolePermissionsType,
} from "@/_utils/types/permissions";
import { Switch } from "@/components/common/switch/base-switch";
import RolesService from "@/services/roles/client/roles.service";

const GrantPermissions = ({
  permissions,
  rolePermissions,
}: {
  permissions: fetchPermissionsByDepartmentType;
  rolePermissions: rolePermissionsType;
}) => {
  const allowed = rolePermissions.data.rolePermission.map(
    (el) => el.permission_id,
  );
  const [allowedPermissions, setAllowedPermissions] = useState(allowed);
  const { useHandleUpdateRolePermissions } = RolesService();
  const {
    mutate: handleUpdateRolePermissions,
    isPending: isHandleUpdateRolePending,
  } = useHandleUpdateRolePermissions();
  const permissionSwitchHandler = (checked: boolean, id: number) => {
    if (checked) {
      const isIncluded = allowedPermissions.find((el) => el === id);
      if (isIncluded) {
        return;
      } else {
        const temp = [...allowedPermissions];
        setAllowedPermissions(temp);
      }
    }
    if (!checked) {
      const isIncluded = allowedPermissions.find((el) => el === id);
      if (!isIncluded) {
        return;
      } else {
        const temp = allowedPermissions.filter((el) => el !== id);
        setAllowedPermissions(temp);
      }
    }
  };
  return (
    <div className={"flex flex-col items-center justify-center gap-y-4"}>
      <div className={"grid grid-cols-2 gap-4 w-full"}>
        {permissions.data.map((el, index) => {
          return (
            <Card shadow={"sm"} radius={"sm"} key={index}>
              <CardHeader>
                <h2 className={"text-xl font-[700]"}>{el.category}</h2>
              </CardHeader>
              <CardBody className={"grid gap-y-2 grid-cols-2 "}>
                {el.permissions.map((innerEl, index) => {
                  return (
                    <div className={"flex gap-4 items-center"} key={index}>
                      <Switch
                        onCheckedChange={(checked: boolean) =>
                          permissionSwitchHandler(checked, innerEl.id)
                        }
                        defaultChecked={
                          !!rolePermissions?.data.rolePermission?.find(
                            (el) => el.permission_id === innerEl.id,
                          )
                        }
                      />
                      <p className={"text-default-700"}>
                        {innerEl.description}
                      </p>
                    </div>
                  );
                })}
              </CardBody>
            </Card>
          );
        })}
      </div>
      <Button
        isLoading={isHandleUpdateRolePending}
        onClick={() =>
          handleUpdateRolePermissions({
            role_id: rolePermissions.data.id,
            permission_id: allowedPermissions,
          })
        }
        color={"primary"}
      >
        Save Changes
      </Button>
    </div>
  );
};
export default GrantPermissions;
