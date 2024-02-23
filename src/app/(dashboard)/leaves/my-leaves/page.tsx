import { cookies } from "next/headers";

import MyLeaves from "@/components/modules/leave-management/my-leaves";

const MyLeavesPage = () => {
  let user;
  const userData = cookies().get("user")?.value;
  if (userData) {
    user = JSON.parse(userData);
  }

  return <MyLeaves userId={user.id} />;
};
export default MyLeavesPage;
