import Breadcrumb from "@/components/common/breadcrumbs";
import Configurations from "@/components/modules/configurations";

const ConfigurationsPage = () => {
  return (
    <div>
      <Breadcrumb pageName={"Configurations"} />
      <Configurations />
    </div>
  );
};
export default ConfigurationsPage;
