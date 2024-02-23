import { capitalizeAfterSpace } from "@/_utils/helpers";
import BaseServerModal from "@/components/common/modal/base-server-modal";
import SingleLeaveDetails from "@/components/modules/leave-management/single-leave";
import { fetchSingleLeave } from "@/services/leaves/server/leaves.api";

const SingleLeave = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const leave = await fetchSingleLeave(id);
  return (
    <BaseServerModal title={`Leave Application # ${leave.data.id}`}>
      <SingleLeaveDetails readonly={true} leave={leave} />
    </BaseServerModal>
  );
};
export default SingleLeave;
