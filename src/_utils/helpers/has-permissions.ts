import React from "react";

import { ROUTES } from "@/_utils/constants/routes";
import { PERMISSIONS } from "@/_utils/enums";
import { userPermissionsApiResponse } from "@/_utils/types";

export type sidebarItemsType = {
  route: string;
  title: string;
  icon?: React.ReactNode;
  children?: {
    route: string;
    title: string;
  }[];
};
export const getSidebarItems = (permissions: PERMISSIONS[]) => {
  let sideBarItems: sidebarItemsType[] = [];
  ROUTES.forEach((el, index) => {
    const flag = el.permissions?.some((permission) =>
      permissions.includes(permission),
    );
    if (flag && el.title) {
      let item: sidebarItemsType = {
        route: el.route,
        title: el.title,
        children: [],
      };
      el?.children?.forEach((innerEl) => {
        innerEl.permissions.forEach((permission) => {
          if (permissions?.includes(permission)) {
            item?.children?.push({
              route: innerEl.route,
              title: innerEl.title,
            });
          }
        });
      });
      sideBarItems.push(item);
    }
  });
  console.log(sideBarItems, "side");
  return sideBarItems;
};
