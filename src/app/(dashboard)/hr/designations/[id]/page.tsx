import { Card, CardBody } from "@nextui-org/card";

import EmployeeCard from "@/components/common/cards/employee-card";
import { fetchEmployeeByDesignation } from "@/services/designation/server/designation.api";

const EmployeeByDesignation = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const designation = await fetchEmployeeByDesignation(id);
  console.log(designation, "designation");
  return (
    <div>
      <h2 className={"font-[700] text-2xl"}>{designation.name}</h2>
      <h3 className={"font-semibold text-lg mb-4 mt-10"}>Employees</h3>

      <div className={"w-full gap-x-4 flex flex-wrap"}>
        {designation?.user?.map((el) => (
          <EmployeeCard key={el.id} employee={el} />
        ))}
      </div>
      <h3 className={"font-semibold text-lg mt-10 mb-4"}>Sub Ordinates</h3>

      {designation?.subordinates.map((el, index) => (
        <div key={index}>{el.name}</div>
      ))}
    </div>
  );
};
export default EmployeeByDesignation;
