export type renderEmployeeType = {
  id: string;
  name: string;
  userName: string;
  designation: string;
  status: string;
  shift: string;
  actions: React.ReactNode;
  createdAt: string;
  startTime: string;
  endTime: string;
  workHour: string;
};

type employeeColumnsType = {
  name: string;
  uid: keyof renderEmployeeType;
};
export const SHIFT_COLS: employeeColumnsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Start Time",
    uid: "startTime",
  },
  {
    name: "End Time",
    uid: "endTime",
  },
  {
    name: "Work Hours",
    uid: "workHour",
  },
  {
    name: "Actions",
    uid: "actions",
  },
];

export const employeeStatusColorMap: employeeStatusColorMapType = {
  lead: "success",
  Intern: "danger",
  vacation: "warning",
};

export type employeeStatusColorMapType = {
  [key: string]: "success" | "danger" | "warning";
  lead: "success" | "danger" | "warning";
  Intern: "success" | "danger" | "warning";
  vacation: "success" | "danger" | "warning";
};
