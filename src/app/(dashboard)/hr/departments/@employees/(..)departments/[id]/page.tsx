import EmployeeCard from "@/components/common/cards/employee-card";
import BaseServerModal from "@/components/common/modal/base-server-modal";
import { fetchEmployeeByDepartment } from "@/services/department/server/department.api";

const EmployeeByDesignationModal = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const department = await fetchEmployeeByDepartment(id);
  console.log(department, "dep");
  return (
    <BaseServerModal title={department.name}>
      {department?.user?.map((el) => {
        // @ts-ignore
        return <EmployeeCard key={el.id} employee={el} />;
      })}
    </BaseServerModal>
  );
};
export default EmployeeByDesignationModal;
