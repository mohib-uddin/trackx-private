import EmployeeCard from "@/components/common/cards/employee-card";
import BaseServerModal from "@/components/common/modal/base-server-modal";
import { fetchEmployeeByDesignation } from "@/services/designation/server/designation.api";

const EmployeeByDesignationModal = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const employees = await fetchEmployeeByDesignation(id);
  return (
    <BaseServerModal title={employees.name}>
      <h3 className={"font-semibold text-lg mb-2"}>Employees</h3>
      {employees?.user?.map((el) => {
        return <EmployeeCard key={el.id} employee={el} />;
      })}
      <h3 className={"font-semibold text-lg my-2"}>Sub Ordinates</h3>

      {employees?.subordinates.map((el, index) => (
        <div key={index}>{el.name}</div>
      ))}
    </BaseServerModal>
  );
};
export default EmployeeByDesignationModal;
