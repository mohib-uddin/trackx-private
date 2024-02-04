"use client";
import { AnimatePresence, motion, useCycle, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosClose } from "react-icons/io";

import BaseButton from "@/components/common/button/base-button";

const links = [
  { name: "Home", to: "#", id: 1 },
  { name: "About", to: "#", id: 2 },
  { name: "Blog", to: "#", id: 3 },
  { name: "Contact", to: "#", id: 4 },
];
const secondaryLinks = [
  { name: "Privacy Policy", to: "#", id: 1 },
  { name: "Privacy Settings", to: "#", id: 2 },
  { name: "Terms of Use", to: "#", id: 3 },
  { name: "Accessibility", to: "#", id: 4 },
];
const sideVariants = {
  closed: {
    transition: {
      staggerChildren: 0,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      staggerChildren: 0,
      staggerDirection: 1,
    },
  },
};
const itemVariants: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      delay: 0.3,
    },
  },
};
export default function SidebarMobile() {
  const [open, cycleOpen] = useCycle(false, true);
  useEffect(() => {
    if (open) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1000);
    }
  }, [open]);
  return (
    <>
      <button onClick={() => cycleOpen()} type="button" className="absolute">
        <BiMenuAltLeft className="text-cadet-grey-accent w-6 h-6 md:w-10 md:h-10" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="min-h-screen w-full bg-[rgba(0,0,0,0.4)] absolute top-0 left-0 z-[9998]"
              exit={{
                transition: { delay: 0.2, duration: 0.3 },
                opacity: 0,
              }}
              onClick={() => cycleOpen()}
            />
            <motion.aside
              initial={{ width: 0 }}
              animate={{ width: window.innerWidth <= 1024 ? 320 : 400 }}
              exit={{
                width: 0,
                transition: { delay: 0.2, duration: 0.3 },
              }}
              className="absolute z-[9999] left-0 top-0 min-h-screen h-full overflow-x-hidden overflow-y-auto bg-white"
            >
              <div className="relative mb-10">
                <div className="p-5 lg:p-10 mb-5 w-full border-primary-border border-b flex items-center justify-center">
                  <div className="h-3 w-full max-w-[90px] relative lg:h-7 lg:max-w-[120px]">
                    <Image
                      src={"/logo.svg"}
                      alt={"Hier Im Ort"}
                      fill
                      quality={100}
                      className="object-contain"
                    />
                  </div>
                  <motion.button
                    onClick={() => cycleOpen()}
                    type="button"
                    className="absolute top-0 right-0"
                    exit="closed"
                    variants={itemVariants}
                  >
                    <IoIosClose className="text-cadet-grey-accent w-6 h-6 md:w-8 md:h-8" />
                  </motion.button>
                </div>
                <div className="px-5 lg:px-10">
                  <motion.div
                    className="border-b border-primary-border pb-5 mb-5"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={itemVariants}
                  >
                    <div className="max-w-[80%]">
                      <p className="pb-2.5 text-xs text-main lg:text-sm 2xl:text-lg">
                        <span className="font-bold">Sign up</span> to save your
                        progress & track orders
                      </p>
                      <BaseButton extraClass="h-9 !py-0 px-2 rounded-md w-fit text-sm lg:!text-base 2xl:!text-lg ">
                        Login Or Signup
                      </BaseButton>
                    </div>
                  </motion.div>
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={itemVariants}
                    className="border-b border-primary-border pb-5 mb-5 flex flex-col gap-2.5"
                  >
                    {links.map(({ name, to, id }) => (
                      <Link
                        href={to}
                        key={id}
                        className="py-1 lg:p-2.5 w-full transition-all duration-500 lg:hover:bg-alice-blue"
                      >
                        <span className="text-sm text-main lg:text-base 2xl:text-lg">
                          {name}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={itemVariants}
                    className="flex flex-col gap-5"
                  >
                    {secondaryLinks.map(({ name, to, id }) => (
                      <Link href={to} key={id}>
                        <span className="transition-all duration-500 hover:text-crystal-blue-main text-xs text-main lg:text-sm 2xl:text-lg">
                          {name}
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
