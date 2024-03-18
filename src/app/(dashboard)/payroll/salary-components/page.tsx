import Breadcrumb from "@/components/common/breadcrumbs";
import ManageSalaryComponents from "@/components/modules/payroll/salary-components/manage-salary-components";

const SalaryComponents = () => {
  return (
    <main>
      <Breadcrumb pageName={"Salary Components"} />
      <ManageSalaryComponents />
    </main>
  );
};
export default SalaryComponents;
