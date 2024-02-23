import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { notFound } from "next/navigation";

import { capitalizeAfterSpace } from "@/_utils/helpers";
import SingleLeaveDetails from "@/components/modules/leave-management/single-leave";
import { fetchSingleLeave } from "@/services/leaves/server/leaves.api";

const SingleLeavePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const leave = await fetchSingleLeave(id);
  console.log(leave, "leave");
  if (!leave) {
    notFound();
  }
  return (
    <Card className={"w-full md:w-1/2 m-auto"}>
      <CardHeader className={"text center"}>
        <h2 className={"text-center text-lg font-[600]"}>
          Leave Application # {leave.data.id}
        </h2>
      </CardHeader>
      <CardBody>
        <SingleLeaveDetails readonly={false} leave={leave} />
      </CardBody>
    </Card>
  );
};
export default SingleLeavePage;
