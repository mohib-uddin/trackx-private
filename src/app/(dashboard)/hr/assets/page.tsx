import Breadcrumb from "@/components/common/breadcrumbs";
import Assets from "@/components/modules/hr/assets";
import { fetchUserPermissions } from "@/services/auth/auth.api";

const AssetPage = async () => {
  const permissions = await fetchUserPermissions();
  return (
    <div>
      <Breadcrumb pageName={"Assets Management"} />
      <Assets />
    </div>
  );
};
export default AssetPage;
