import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";
import React from "react";

import { getMedia } from "@/_utils/helpers/get-media";
import { designationUserType } from "@/_utils/types/designation";

const EmployeeCard = ({ employee }: { employee: designationUserType }) => {
  return (
    <Card>
      <CardBody>
        <User
          description={
            <Link href={`/hr/employee/${employee.id}`} size="sm" isExternal>
              @{employee.firstName}
            </Link>
          }
          name={`${employee.firstName}${employee.lastName}`}
          avatarProps={{
            src: employee?.image
              ? getMedia(
                  `/user/${employee?.id}/profile-image/${employee?.image}`,
                )
              : undefined,
            isBordered: true,
            fallback: <div>{employee?.firstName[0].toUpperCase()}</div>,
          }}
        >
          {employee?.email}
        </User>
        {/*<User*/}
        {/*  name={`${employee.firstName} ${employee.lastName}`}*/}
        {/*description=*/}
        {/*{*/}
        {/*  <Link href={`/hr/employee/${employee.id}`} size="sm" isExternal>*/}
        {/*    @{employee.firstName}*/}
        {/*  </Link>*/}
        {/*}*/}
        {/*  }*/}
        {/*  avatarProps={{*/}
        {/*    src: "https://avatars.githubusercontent.com/u/30373425?v=4",*/}
        {/*  }}*/}
        {/*/>*/}
      </CardBody>
    </Card>
  );
};
export default EmployeeCard;
