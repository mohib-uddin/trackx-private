import "react-vertical-timeline-component/style.min.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, WorkflowIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import * as z from "zod";

import { PERMISSIONS } from "@/_utils/enums";
import { userPermissionsApiResponse } from "@/_utils/types";
import { employeeType } from "@/_utils/types/employees";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DesignationService from "@/services/designation/client/designation.service";
import EmployeeService from "@/services/employees/client/employee.service";

export const designationFormSchema = z.object({
  designationId: z.number({ required_error: "Designation Is Required" }),
  startDate: z.string({ required_error: "Start Date Is Required" }),
  endDate: z.string({ required_error: "End Date is Required" }),
  userId: z.number(),
  comment: z.string(),
});
export type designationHistoryFormType = z.infer<typeof designationFormSchema>;
const EmployeeDesignationSection = ({
  employeeData,
  permissions,
}: {
  employeeData: employeeType;
  permissions: userPermissionsApiResponse;
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  const {
    handleSubmit,
    setValue,
    control,
    formState: { isValid },
  } = useForm<designationHistoryFormType>({
    resolver: zodResolver(designationFormSchema),
    shouldUnregister: true,
  });
  const { useHandleAddEmployeeDesignation } = EmployeeService();
  const { mutate: handleAddDesignation, isPending } =
    useHandleAddEmployeeDesignation();
  const { useFetchAllDesignations } = DesignationService();
  const { data: designationData, isLoading: isDesignationDataLoading } =
    useFetchAllDesignations(1, "", true);
  useEffect(() => {
    setValue("userId", Number(employeeData.id));
  }, []);
  console.log(employeeData.designationHistory);
  return (
    <div className={"p-4 text-left"}>
      {permissions.data.includes(PERMISSIONS.CREATE_USER) && (
        <div className={"mt-4 mb-2 flex justify-between item-center gap-x-4"}>
          <h2 className={"text-xl font-[700]"}>Designation History</h2>
          <BaseFormModal
            name={"Designation"}
            title={"Designation"}
            isIconButton={true}
            isLoading={isPending}
            icon={<PlusIcon />}
            handleSubmit={handleSubmit}
            action={handleAddDesignation}
          >
            <div className={"flex flex-col gap-y-4"}>
              <BaseInput
                placeholder={"Enter Start Date"}
                name={"startDate"}
                label={"Start Date"}
                type={"date"}
                control={control}
              />
              <BaseInput
                placeholder={"Enter End Date"}
                name={"endDate"}
                label={"End Date"}
                type={"date"}
                control={control}
              />
              <BaseSelect
                name={"designationId"}
                placeholder={"Select Designation"}
                variant={"underlined"}
                control={control}
                values={designationData?.data}
                label={"Designation"}
              />
              <BaseInput
                placeholder={"Enter Comment"}
                name={"comment"}
                label={"Comment"}
                type={"text"}
                control={control}
              />
            </div>
          </BaseFormModal>
        </div>
      )}
      {employeeData.designationHistory.length > 0 ? (
        <section ref={ref}>
          <VerticalTimeline lineColor="#e4e4e7" className={"!bg-red-400"}>
            {employeeData.designationHistory.map((el, index) => (
              <VerticalTimelineElement
                key={index}
                visible={inView}
                className="vertical-timeline-element--work"
                contentStyle={{
                  background: index % 2 !== 0 ? "#F4F4F5" : "#006FEE",
                  color: index % 2 !== 0 ? "black" : "#fff",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid  rgb(33, 150, 243)",
                }}
                date={`${el.startDate.split("T")[0]} To ${el.endDate.split("T")[0]}`}
                iconStyle={{ background: "#006FEE", color: "#fff" }}
                icon={<WorkflowIcon />}
              >
                <h3 className="vertical-timeline-element-title">
                  {el.designation.name}
                </h3>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </section>
      ) : (
        <p>No Designation History</p>
      )}
    </div>
  );
};
export default EmployeeDesignationSection;
