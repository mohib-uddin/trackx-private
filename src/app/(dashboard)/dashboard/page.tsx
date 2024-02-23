import CheckInOut from "@/components/modules/attendance/automatic/check-in-out";
import AdminDashboard from "@/components/modules/dashboard/admin-dashboard";
import { fetchIPAddress } from "@/services/misc/ipfy.api";

const Dashboard = async () => {
  return (
    <div>
      <AdminDashboard />
    </div>
  );
};
export default Dashboard;
