import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { EditIcon } from "@nextui-org/shared-icons";

import { capitalizeAfterSpace } from "@/_utils/helpers";
import { employeeType } from "@/_utils/types/employees";

const EmployeeInformationSection = ({
  employeeData,
}: {
  employeeData: employeeType;
}) => {
  return (
    <div className={"p-4 text-left"}>
      <div className={"mb-2 flex justify-between item-center gap-x-4"}>
        <h2 className={"text-xl font-[700]"}>Personal Information</h2>
        <Button color={"primary"} isIconOnly={true}>
          <EditIcon />
        </Button>
      </div>
      <div className={"grid grid-cols-2"}>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Department:</span>{" "}
          {employeeData?.department?.name ?? "No Department"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Employment Status:</span>{" "}
          <Chip
            className={`!bg-[${employeeData?.employmentStatus?.colourValue}]`}
          >
            {employeeData?.employmentStatus?.name}
          </Chip>
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Leave Policy:</span>{" "}
          {employeeData?.leavePolicy?.name ?? "No Policy Allotted"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Weekly Holiday:</span>{" "}
          {employeeData?.weeklyHoliday?.name ?? "-"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Shift:</span>{" "}
          {employeeData?.shift?.name ?? "No Shift Assigned"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Join Date:</span>{" "}
          {employeeData.joinDate?.split("T")[0] ?? "-"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>End Date:</span>{" "}
          {employeeData.leaveDate?.split("T")[0] ?? "-"}
        </h2>
        <h2 className={"mb-2"}>
          <span className={"text-primary"}>Role:</span>{" "}
          {capitalizeAfterSpace(employeeData.role.name) ?? "No Role"}
        </h2>
      </div>
    </div>
  );
};
export default EmployeeInformationSection;
