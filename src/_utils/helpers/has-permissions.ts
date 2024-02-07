import React from "react";

import { ROUTES } from "@/_utils/constants/routes";
import { PERMISSIONS } from "@/_utils/enums";

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
    if ((flag || el.permissions.length === 0) && el.title) {
      let item: sidebarItemsType;
      if (el.children) {
        item = {
          route: el.route,
          title: el.title,
          children: [],
        };
      } else {
        item = {
          route: el.route,
          title: el.title,
        };
      }
      el?.children?.forEach((innerEl) => {
        let childrenFlag = false;
        innerEl.permissions.forEach((permission) => {
          if (permissions?.includes(permission)) {
            childrenFlag = true;
          }
        });
        if (childrenFlag) {
          item?.children?.push({
            route: innerEl.route,
            title: innerEl.title,
          });
        }
      });
      sideBarItems.push(item);
    }
  });
  console.log(sideBarItems, "side");
  return sideBarItems;
};
