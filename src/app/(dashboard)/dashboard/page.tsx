import { fetchIPAddress } from "@/services/misc/ipfy.api";

const Dashboard = async () => {
  let ip;
  try {
    ip = await fetchIPAddress();
  } catch (e) {
    console.log(e);
  }
  console.log(ip);
  return (
    <div>
      <h2>This Is Dashboard</h2>
    </div>
  );
};
export default Dashboard;
