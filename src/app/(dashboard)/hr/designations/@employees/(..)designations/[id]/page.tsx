import EmployeeCard from "@/components/common/cards/employee-card";
import BaseFormModal from "@/components/common/modal/base-form-modal";
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
    <BaseServerModal title={employees.designationName}>
      {employees.employee.map((el) => {
        return <EmployeeCard key={el.id} employee={el} />;
      })}
    </BaseServerModal>
  );
};
export default EmployeeByDesignationModal;
