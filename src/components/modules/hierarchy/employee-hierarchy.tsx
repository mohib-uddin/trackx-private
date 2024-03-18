"use client";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Tooltip } from "@nextui-org/tooltip";
import { motion, Variants } from "framer-motion";
import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import { Tree, TreeNode } from "react-organizational-chart";

import { capitalizeAfterSpace } from "@/_utils/helpers";
import { getMedia } from "@/_utils/helpers/get-media";
import { userDataType } from "@/_utils/types";
import {
  employeeHierarchyType,
  heirarchyUserType,
} from "@/_utils/types/heirarchy";
import HierarchyService from "@/services/heirarchy/heirarchy.service";

const variants: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1 },
};

const EmployeeCard = ({
  name,
  position,
  onClick,
  color,
  user,
  subCount,
  isVisible,
}: {
  name: string;
  position?: string;
  onClick: () => void;
  color?: string;
  isVisible?: boolean;
  subCount: number;
  user: heirarchyUserType[] | undefined;
}) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      transition={{ type: "linear" }}
      className={"flex  flex-col justify-center w-full items-center"}
      onClick={onClick}
    >
      <div
        className={
          "bg-white cursor-pointer hover:opacity-85 transition-all duration-500 shadow-lg p-2 max-w-[300px] rounded-xl w-full"
        }
      >
        <div className={"flex flex-col justify-center items-center"}>
          <div className={"w-full flex flex-col justify-center items-center"}>
            {user && user?.length > 1 ? (
              <AvatarGroup>
                {user?.map((el, index) => (
                  <Tooltip
                    content={
                      <div className="px-1 py-2">
                        <div className="text-tiny">
                          {capitalizeAfterSpace(
                            `${el.firstName} ${el.lastName}`,
                          )}
                        </div>
                      </div>
                    }
                    color={"primary"}
                    key={index}
                  >
                    <Avatar
                      classNames={{
                        base: "bg-gradient-to-br from-[#3494E6] to-[#EC6EAD]",
                        icon: "text-black/60",
                      }}
                      size={"lg"}
                      src={
                        el.image
                          ? getMedia(`/user/${el.id}/profile-image/${el.image}`)
                          : undefined
                      }
                      isBordered={true}
                    >
                      M
                    </Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            ) : (
              <Avatar
                classNames={{
                  base: "bg-gradient-to-br from-[#3494E6] to-[#EC6EAD]",
                  icon: "text-black/60",
                }}
                size={"lg"}
                src={
                  user && user.length > 0 && user[0].image
                    ? getMedia(
                        `/user/${user[0].id}/profile-image/${user[0].image}`,
                      )
                    : undefined
                }
                isBordered={true}
              >
                M
              </Avatar>
            )}
            {user && user?.length > 1 ? (
              <h2 className={"font-[700] text-lg"}>Employees</h2>
            ) : (
              <h2 className={"font-[700] text-lg"}>
                {user && user.length > 0
                  ? capitalizeAfterSpace(
                      user[0].firstName + " " + user[0].lastName,
                    )
                  : "Vacant"}
              </h2>
            )}
          </div>
          {position && (
            <h2 className={"font-[700] text-default-400 text-base"}>
              {position}
            </h2>
          )}
          {subCount > 0 ? (
            <div
              className={
                "flex gap-4 text-default-600 justify-center items-center"
              }
            >
              {isVisible ? (
                <FaCaretUp className={"bg-black  text-white"} />
              ) : (
                <FaCaretDown className={"bg-primary  text-white"} />
              )}
              <div className={"flex gap-2 justify-center items-center"}>
                <IoPeople />
                {subCount}
              </div>
            </div>
          ) : (
            <div
              className={
                "flex gap-4 text-default-600 justify-center items-center"
              }
            >
              <div className={"flex gap-2 justify-center items-center"}>
                <IoPeople />
                {subCount}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const EmployeeNodes = ({
  data,
}: {
  data: employeeHierarchyType[] | undefined;
}) => {
  const [showSubordinates, setShowSubordinates] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSubordinates = (name: string) => {
    setShowSubordinates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  return (
    <>
      {data?.map((el, index) => {
        const isSubordinatesVisible = showSubordinates[el.name] || false;
        return (
          <>
            <TreeNode
              key={index}
              label={
                <EmployeeCard
                  onClick={() => toggleSubordinates(el.name)}
                  name={el.name}
                  isVisible={isSubordinatesVisible}
                  subCount={el.subordinates.length}
                  position={el.name}
                  user={el.user}
                />
              }
            >
              {isSubordinatesVisible && el?.subordinates?.length > 0 && (
                <EmployeeNodes data={el.subordinates} />
              )}
            </TreeNode>
          </>
        );
      })}
    </>
  );
};

const EmployeeHierarchy = () => {
  const { useFetchEmployeeHierarchy } = HierarchyService();
  const { data: hierarchyData } = useFetchEmployeeHierarchy();
  return (
    <Tree
      lineColor={"#A1A1AA"}
      label={
        <EmployeeCard
          isVisible={true}
          subCount={hierarchyData?.subordinates.length || 0}
          name={hierarchyData?.name || ""}
          position={hierarchyData?.name || ""}
          onClick={() => {}}
          user={hierarchyData?.user}
        />
      }
    >
      <EmployeeNodes data={hierarchyData?.subordinates} />
    </Tree>
  );
};

export default EmployeeHierarchy;
