import { Card, CardBody } from "@nextui-org/card";
import { Link } from "@nextui-org/link";
import { User } from "@nextui-org/user";

import { employeeType } from "@/_utils/types/employees";

const EmployeeCard = ({ employee }: { employee: employeeType }) => {
  return (
    <Card>
      <CardBody>
        <User
          name={`${employee.firstName} ${employee.lastName}`}
          description={
            <Link href={`/hr/employee/${employee.id}`} size="sm" isExternal>
              @{employee.firstName}
            </Link>
          }
          avatarProps={{
            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
          }}
        />
      </CardBody>
    </Card>
  );
};
export default EmployeeCard;
