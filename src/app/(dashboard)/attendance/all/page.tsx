import AllAttendance from "@/components/modules/attendance/all-attendance";
import { fetchIPAddress } from "@/services/misc/ipfy.api";

const AttendancePage = async () => {
  const { ip } = await fetchIPAddress();
  return <AllAttendance ip={ip} />;
};
export default AttendancePage;
