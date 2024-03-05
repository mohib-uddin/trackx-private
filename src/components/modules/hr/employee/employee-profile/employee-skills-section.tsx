import "react-vertical-timeline-component/style.min.css";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
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
import BaseFormModal from "@/components/common/modal/base-form-modal";
import EmployeeService from "@/services/employees/client/employee.service";

export const educationFormSchema = z.object({
  degree: z.string({ required_error: "Degree Is Required" }),
  institution: z.string({ required_error: "Institution Is Required" }),
  fieldOfStudy: z.string({ required_error: "Field Of Study Is Required" }),
  result: z.string({ required_error: "Result Is Required" }).min(2),
  startDate: z.string({ required_error: "Start Date Is Required" }),
  endDate: z.string({ required_error: "End Date is Required" }),
  userId: z.number(),
});
const EmployeeInformationSection = ({
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
  } = useForm<z.infer<typeof educationFormSchema>>({
    resolver: zodResolver(educationFormSchema),
    shouldUnregister: true,
  });
  const { useHandleAddEmployeeEducation } = EmployeeService();
  const { mutate: handleAddEducation, isPending } =
    useHandleAddEmployeeEducation();
  useEffect(() => {
    setValue("userId", Number(employeeData.id));
  }, []);
  return (
    <div className={"p-4 text-left"}>
      <div className={"mb-2 flex justify-between item-center gap-x-4"}>
        <h2 className={"text-xl font-[700]"}>Skills</h2>
        <Button color={"primary"} isIconOnly={true}>
          <PlusIcon size={15} />
        </Button>
      </div>
      {employeeData.skill.length > 0 ? (
        employeeData.skill.map((el, index) => {
          return (
            <Chip key={index} color={"primary"}>
              {el}
            </Chip>
          );
        })
      ) : (
        <div>No Skills Added</div>
      )}
      <div className={"mt-4 mb-2 flex justify-between item-center gap-x-4"}>
        <h2 className={"text-xl font-[700]"}>Education History</h2>
        <BaseFormModal
          name={"Education"}
          title={"Education"}
          isIconButton={true}
          isLoading={isPending}
          icon={<PlusIcon />}
          handleSubmit={handleSubmit}
          action={handleAddEducation}
        >
          <div>
            <BaseInput
              placeholder={"Enter Degree Name"}
              name={"degree"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Field Of Study"}
              name={"fieldOfStudy"}
              type={"text"}
              control={control}
            />
            <BaseInput
              placeholder={"Enter Institution Name"}
              name={"institution"}
              type={"text"}
              control={control}
            />
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
            <BaseInput
              placeholder={"Enter Result"}
              name={"result"}
              type={"text"}
              control={control}
            />
          </div>
        </BaseFormModal>
      </div>
      {employeeData.educations.length > 0 ? (
        <section ref={ref}>
          <VerticalTimeline lineColor="#e4e4e7" className={"!bg-red-400"}>
            {employeeData.educations.map((el, index) => (
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
                  Degree : {el.degree}
                </h3>
                <h4 className="vertical-timeline-element-subtitle">
                  Institution : {el.institution}
                </h4>
                <p>Result : {el.result}</p>
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
export default EmployeeInformationSection;
