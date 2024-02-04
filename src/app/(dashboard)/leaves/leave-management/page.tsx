import ManagePendingLeaves from "@/components/modules/leave-management/manage-pending-leaves";
import ViewAllLeaves from "@/components/modules/leave-management/view-all-leaves";

const LeaveManagement = () => {
  return (
    <div>
      <ManagePendingLeaves />
      <ViewAllLeaves />
    </div>
  );
};
export default LeaveManagement;
