import EmployeeCard from "@/components/common/cards/employee-card";
import { fetchEmployeeByDesignation } from "@/services/designation/server/designation.api";

const EmployeeByDesignation = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const designation = await fetchEmployeeByDesignation(id);
  return (
    <div>
      <h2 className={"font-[700] text-2xl"}>{designation.designationName}</h2>
      <div
        className={
          "grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {designation.employee.map((el) => (
          <EmployeeCard key={el.id} employee={el} />
        ))}
      </div>
    </div>
  );
};
export default EmployeeByDesignation;
