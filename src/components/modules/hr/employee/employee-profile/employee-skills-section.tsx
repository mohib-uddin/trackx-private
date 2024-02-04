import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import { employeeType } from "@/_utils/types/employees";

const EmployeeSkillSection = ({
  employeeData,
}: {
  employeeData: employeeType;
}) => {
  return (
    <Card className={"w-1/2 max-w-[600px]"}>
      <CardBody className={"p-4"}>
        <h2 className={"mb-2 font-[600]"}>Employee Skills:</h2>
        {employeeData.skill.map((el, index) => (
          <Chip size={"lg"} key={index} color={"primary"}>
            {el}
          </Chip>
        ))}
      </CardBody>
    </Card>
  );
};
export default EmployeeSkillSection;
