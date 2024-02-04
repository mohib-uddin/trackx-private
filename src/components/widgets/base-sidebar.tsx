"use client";
import { sidebarItemsType } from "@/_utils/helpers/has-permissions";
import SidebarDesktop from "@/components/widgets/sidebar-desktop";
import SidebarMobile from "@/components/widgets/sidebar-mobile";
import { useMediaQuery } from "@/hooks/use-media-query";

const BaseSidebar = ({ items }: { items: sidebarItemsType[] }) => {
  const desktop = "(min-width: 1024px)";
  const isDesktop = useMediaQuery(desktop);
  return (
    <>{isDesktop ? <SidebarDesktop items={items} /> : <SidebarMobile />}</>
  );
};
export default BaseSidebar;
