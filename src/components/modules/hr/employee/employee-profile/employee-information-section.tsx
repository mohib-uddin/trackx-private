import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";

import { employeeType } from "@/_utils/types/employees";

const EmployeeInformationSection = ({
  employeeData,
}: {
  employeeData: employeeType;
}) => {
  return (
    <Card className={"w-1/2 max-w-[600px]"}>
      <CardBody className={"p-4"}>
        <h2 className={"mb-2"}>Department: {employeeData?.department?.name}</h2>
        <h2 className={"mb-2"}>
          Employment Status:{" "}
          <Chip
            className={`!bg-[${employeeData?.employmentStatus?.colourValue}]`}
          >
            {employeeData?.employmentStatus?.name}
          </Chip>
        </h2>
        <h2 className={"mb-2"}>
          Leave Policy: {employeeData?.leavePolicy?.name}
        </h2>
        <h2 className={"mb-2"}>
          Weekly Holiday: {employeeData?.weeklyHoliday?.name}
        </h2>
        <h2 className={"mb-2"}>Shift: {employeeData?.shift?.name}</h2>
      </CardBody>
    </Card>
  );
};
export default EmployeeInformationSection;
