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

import { employeeType } from "@/_utils/types/employees";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseTextarea from "@/components/common/form/base-textarea";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DesignationService from "@/services/designation/client/designation.service";
import EmployeeService from "@/services/employees/client/employee.service";

export const designationFormSchema = z.object({
  designationId: z.string({ required_error: "Designation Is Required" }),
  startDate: z.string({ required_error: "Start Date Is Required" }),
  endDate: z.string({ required_error: "End Date is Required" }),
  userId: z.number(),
  comment: z.string(),
});
export type designationHistoryFormType = z.infer<typeof designationFormSchema>;
const EmployeeDesignationSection = ({
  employeeData,
}: {
  employeeData: employeeType;
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
  const { useHandleAddEmployeeEducation } = EmployeeService();
  const { useFetchAllDesignations } = DesignationService();
  const { data: designationData, isLoading: isDesignationDataLoading } =
    useFetchAllDesignations(1, "all", true);
  const { mutate: handleAddEducation, isPending } =
    useHandleAddEmployeeEducation();
  useEffect(() => {
    setValue("userId", Number(employeeData.id));
  }, []);
  return (
    <div className={"p-4 text-left"}>
      <div className={"mt-4 mb-2 flex justify-between item-center gap-x-4"}>
        <h2 className={"text-xl font-[700]"}>Designation History</h2>
        <BaseFormModal
          name={"Designation"}
          title={"Designation"}
          isIconButton={true}
          isLoading={isPending}
          icon={<PlusIcon />}
          handleSubmit={handleSubmit}
          action={handleAddEducation}
        >
          <div>
            <BaseInput
              placeholder={"Enter Start Date"}
              name={"startDate"}
              type={"date"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter End Date"}
              name={"endDate"}
              type={"date"}
              control={control}
            />
          </div>
        </BaseFormModal>
      </div>
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
                <h3 className="vertical-timeline-element-title">Degree</h3>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </section>
      ) : (
        <p>No Education History</p>
      )}
    </div>
  );
};
export default EmployeeDesignationSection;
