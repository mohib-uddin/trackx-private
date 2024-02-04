"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { sidebarItemsType } from "@/_utils/helpers/has-permissions";

const SidebarDesktop = ({ items }: { items: sidebarItemsType[] }) => {
  const [opened, setOpened] = useState("");
  const pathname = usePathname();
  console.log(items, "item");
  return (
    <div
      className={
        "!min-h-[100vh] flex  !rounded-tr-3xl !rounded-br-3xl bg-primary w-[220px]"
      }
    >
      <div className={"text-white flex w-full flex-col p-4 mt-10 gap-1"}>
        {items?.map((el, index) => {
          return (
            <>
              {!el.children ? (
                <Link
                  className={`cursor-pointer hover:bg-white hover:text-black flex w-full rounded-sm py-2 px-4 items-center gap-2.5 duration-300 ease-in-out ${pathname.includes(el.route) && "bg-white text-primary"}`}
                  href={el.route}
                >
                  <span>{el.icon}</span>
                  <span>{el.title}</span>
                </Link>
              ) : (
                <span
                  className={`cursor-pointer  hover:bg-white hover:text-black flex w-full rounded-sm py-2 px-4 items-center gap-2.5 duration-300 ease-in-out ${opened === el.title && "bg-white text-primary"}`}
                  onClick={() => setOpened(el.title)}
                >
                  <span>{el.icon}</span>
                  <span>{el.title}</span>
                </span>
              )}

              {opened === el.title && (
                <div className={"flex flex-col gap-2 ml-6 my-2"}>
                  {el.children &&
                    el.children?.map((innerEl, innerIndex) => {
                      return (
                        <Link
                          className={
                            "group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:opacity-50"
                          }
                          key={innerIndex}
                          href={innerEl.route}
                        >
                          {innerEl.title}
                        </Link>
                      );
                    })}
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};
export default SidebarDesktop;
