"use client";
import LeaveCard from "@/components/common/cards/leave-card";
import LeaveManagementService from "@/services/leaves/client/leave.service";

const ManagePendingLeaves = () => {
  const { useFetchAllLeaves } = LeaveManagementService();
  const { data: leaveData } = useFetchAllLeaves("PENDING", 1, 100);
  return (
    <div>
      <h2 className={"font-[700] text-2xl mt-4 mb-6"}>Pending Leaves</h2>
      {leaveData && leaveData?.data?.length > 0 ? (
        <div
          className={"grid-cols-1 md:grid-cols-2 grid lg:grid-cols-3 gap-y-4"}
        >
          {leaveData.data?.map((el) => {
            return <LeaveCard leave={el} key={el.id} />;
          })}
        </div>
      ) : (
        <p className={"text-gray-500 ml-1"}>No Leaves Are Pending</p>
      )}
    </div>
  );
};
export default ManagePendingLeaves;
