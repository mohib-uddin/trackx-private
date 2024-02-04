import "@/styles/globals.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PERMISSIONS } from "@/_utils/enums";
import { getSidebarItems } from "@/_utils/helpers/has-permissions";
import { userPermissionsApiResponse } from "@/_utils/types";
import BaseSidebar from "@/components/widgets/base-sidebar";
import { fetchUserPermissions } from "@/services/auth/auth.api";

export const metadata: Metadata = {
  title: "TrackX",
  description: "Welcome To TrackX",
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let permissions: userPermissionsApiResponse;
  let sidebarItems;
  try {
    permissions = await fetchUserPermissions();
    sidebarItems = getSidebarItems(permissions.data);
  } catch (e) {
    console.log(e);
  }
  if (!sidebarItems) {
    notFound();
  }

  return (
    <div className={"flex"}>
      <BaseSidebar items={sidebarItems} />
      <div className={"w-[90%] md:w-[80%] mt-10 m-auto"}>{children}</div>
    </div>
  );
}
