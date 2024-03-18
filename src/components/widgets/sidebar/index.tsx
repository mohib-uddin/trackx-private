"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { sidebarItemsType } from "@/_utils/helpers/has-permissions";
import Logo from "@/assets/logo.png";

import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  items: sidebarItemsType[];
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, items }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 shadow-md flex h-screen w-65 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6">
        <Link href="/">
          <Image width={176} height={32} src={Logo} alt="Logo" priority />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- sidebar Menu --> */}
        <nav className=" px-4   lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {items.map((el, index) => {
                return (
                  <React.Fragment key={index}>
                    {el.children && el.children.length > 0 ? (
                      <SidebarLinkGroup
                        activeCondition={
                          pathname === el.route || pathname.includes(el.route)
                        }
                      >
                        {(handleClick, open) => {
                          return (
                            <React.Fragment>
                              <Link
                                href="#"
                                className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black-2 duration-300 ease-in-out hover:bg-primary hover:text-white  ${
                                  (pathname === el.route ||
                                    pathname.includes(el.route)) &&
                                  "bg-primary !text-white"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  sidebarExpanded
                                    ? handleClick()
                                    : setSidebarExpanded(true);
                                }}
                              >
                                {el.icon}
                                {el.title}
                                <svg
                                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                    open && "rotate-180"
                                  }`}
                                  width="20"
                                  height="20"
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                    fill=""
                                  />
                                </svg>
                              </Link>
                              {/* <!-- Dropdown Menu Start --> */}
                              <div
                                className={`translate transform overflow-hidden ${
                                  !open && "hidden"
                                }`}
                              >
                                <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
                                  {el.children?.map((innerEl, index) => {
                                    return (
                                      <li key={index}>
                                        <Link
                                          href={innerEl.route}
                                          className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-meta-4 duration-300 ease-in-out hover:opacity-70 ${
                                            pathname === innerEl.route &&
                                            "!text-primary !font-[700]"
                                          }`}
                                        >
                                          {innerEl.title}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              {/* <!-- Dropdown Menu End --> */}
                            </React.Fragment>
                          );
                        }}
                      </SidebarLinkGroup>
                    ) : (
                      <li>
                        <Link
                          href={el.route}
                          className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-black-2 duration-300 ease-in-out hover:text-white hover:bg-primary ${
                            pathname.includes(el.route) &&
                            "bg-primary !text-white"
                          }`}
                        >
                          {el.icon}
                          {el.title}
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}

              {/* <!-- Menu Item Settings --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
