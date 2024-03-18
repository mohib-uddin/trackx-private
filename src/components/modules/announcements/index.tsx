"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Select, SelectItem } from "@nextui-org/select";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoDocumentAttachOutline } from "react-icons/io5";
import * as z from "zod";

import Breadcrumb from "@/components/common/breadcrumbs";
import BaseInput from "@/components/common/form/base-input";
import BaseSelect from "@/components/common/form/base-select";
import BaseTextArea from "@/components/common/form/base-textarea";
import BaseFormModal from "@/components/common/modal/base-form-modal";
import DeleteConfirmationModal from "@/components/common/modal/delete-confirmation-modal";
import AnnouncementService from "@/services/announcements/client/announcement.service";
import DepartmentService from "@/services/department/client/department.service";

enum ANNOUNCEMENT_TYPE {
  GENERAL = "General",
  DEPARTMENT = "Department Wise",
}
export const announcementFormSchema = z.object({
  title: z.string({ required_error: "Title Is Required" }),
  description: z.string().min(3, "Minimum 3 Characters"),
  type: z.nativeEnum(ANNOUNCEMENT_TYPE),
  endDate: z.string(),
  departmentIds: z.array(z.string()).optional(),
});

const AllAnnouncements = () => {
  const {
    useFetchAllAnnouncements,
    useHandleCreateAnnouncement,
    useHandleDeleteAnnouncement,
  } = AnnouncementService();
  const { useFetchAllDepartments } = DepartmentService();
  const [page, setPage] = useState(1);
  const { data: announcementData } = useFetchAllAnnouncements(page);
  const { mutate: handleCreateAnnouncement } = useHandleCreateAnnouncement();
  const {
    mutate: handleDeleteAnnouncement,
    isPending: isDeleteAnnouncementPending,
  } = useHandleDeleteAnnouncement();

  const { data: departmentData } = useFetchAllDepartments("", 1, true);

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(announcementFormSchema),
  });
  const announcementType = watch("type");
  return (
    <>
      <Breadcrumb pageName={"Announcements"} />
      <BaseFormModal
        handleSubmit={handleSubmit}
        action={handleCreateAnnouncement}
        name={"Create An Announcement"}
        title={"New Announcement"}
      >
        <div className={"flex flex-col gap-y-3"}>
          <BaseInput
            label={"Title"}
            placeholder={"Enter Title"}
            name={"title"}
            type={"text"}
            control={control}
          />
          <BaseInput
            label={"End Date"}
            placeholder={"Enter End Date"}
            name={"endDate"}
            type={"date"}
            control={control}
          />
          <BaseSelect
            control={control}
            name={"type"}
            isString={true}
            placeholder={"Announcement Type"}
            variant={"underlined"}
            values={[
              { id: ANNOUNCEMENT_TYPE.GENERAL.toString(), name: "General" },
              {
                id: ANNOUNCEMENT_TYPE.DEPARTMENT.toString(),
                name: "Department Wise",
              },
            ]}
            label={"Announcement Type"}
          />
          {departmentData &&
            departmentData.data &&
            announcementType === ANNOUNCEMENT_TYPE.DEPARTMENT && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Select
                    onChange={(e) => {
                      onChange(e.target.value.split(","));
                    }}
                    value={value}
                    items={departmentData?.data}
                    label="DepartmentIds"
                    variant="bordered"
                    isMultiline={true}
                    selectionMode="multiple"
                    placeholder="Select a department"
                    labelPlacement="outside"
                    classNames={{
                      base: "max-w-xs",
                      trigger: "min-h-unit-12 py-2",
                    }}
                    renderValue={(items) => {
                      return (
                        <div className="flex flex-wrap gap-2">
                          {items.map((item) => (
                            <Chip color={"primary"} key={item.key}>
                              {item?.data?.name}
                            </Chip>
                          ))}
                        </div>
                      );
                    }}
                  >
                    {(department) => (
                      <SelectItem
                        key={department.id}
                        textValue={department.name}
                      >
                        {department.name}
                      </SelectItem>
                    )}
                  </Select>
                )}
                name={"departmentIds"}
              />
            )}
          <BaseTextArea
            label={"Description"}
            placeholder={"Enter Description"}
            name={"description"}
            control={control}
          />
        </div>
      </BaseFormModal>
      <div className={"flex mt-4 gap-4 flex-wrap"}>
        {announcementData?.data.map((el, index) => {
          return (
            // <Card key={index} className="w-[350px] max-w-[400px]">
            //   <CardHeader className="flex gap-3 !w-full">
            //     <div className="flex justify between !w-full items-center">
            //       <p className="text-md font-[600]">{el.title}</p>
            //     </div>
            //     <DeleteConfirmationModal
            //       deleteCallback={() => handleDeleteAnnouncement(el.id)}
            //       isLoading={isDeleteAnnouncementPending}
            //     />
            //   </CardHeader>
            //   <CardBody>
            //     <p>{el.description}</p>
            //   </CardBody>
            // </Card>
            <Card key={index} className="max-w-[340px] w-full pb-2">
              <CardHeader className="justify-between">
                <div className="flex gap-5">
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">
                      {el.title}
                    </h4>
                  </div>
                </div>
                <DeleteConfirmationModal
                  deleteCallback={() => handleDeleteAnnouncement(el.id)}
                  isLoading={isDeleteAnnouncementPending}
                />
              </CardHeader>
              <CardBody className="px-3 py-0 text-small text-default-400">
                <p>{el.description}</p>
              </CardBody>
              <CardFooter>
                <Button
                  isIconOnly={true}
                  color="primary"
                  radius="full"
                  size="sm"
                  variant={"solid"}
                >
                  <IoDocumentAttachOutline />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </>
  );
};
export default AllAnnouncements;
