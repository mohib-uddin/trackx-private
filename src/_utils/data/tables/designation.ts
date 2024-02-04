export type renderEmployeeType = {
  id: string;
  name: string;
  userName: string;
  designation: string;
  status: string;
  shift: string;
  actions: React.ReactNode;
  createdAt: string;
};

type employeeColumnsType = {
  name: string;
  uid: keyof renderEmployeeType;
};
export const DESIGNATION_COLS: employeeColumnsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Created At",
    uid: "createdAt",
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
