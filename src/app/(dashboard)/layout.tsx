import "@/styles/globals.css";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getSidebarItems } from "@/_utils/helpers/has-permissions";
import { userPermissionsApiResponse } from "@/_utils/types";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { fetchUserPermissions } from "@/services/auth/auth.api";
import { fetchIPAddress } from "@/services/misc/ipfy.api";

export const metadata: Metadata = {
  title: "TrackX",
  description: "Welcome To TrackX",
};

export default async function Layout({
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
  let ip;
  try {
    ip = await fetchIPAddress();
  } catch (e) {
    console.log(e);
  }

  return (
    <DashboardLayout ip={ip} items={sidebarItems}>
      {children}
    </DashboardLayout>
  );
}
