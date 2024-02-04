export type renderLeavesType = {
  id: string;
  name: string;
  leaveType: string;
  leaveFrom: string;
  leaveTo: string;
  leaveDuration: string;
  status: string;
  actions: React.ReactNode;
};

type employeeColumnsType = {
  name: string;
  uid: keyof renderLeavesType;
};
export const LEAVE_COLS: employeeColumnsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Leave Type",
    uid: "leaveType",
  },
  {
    name: "Leave Form",
    uid: "leaveFrom",
  },
  {
    name: "Leave To",
    uid: "leaveTo",
  },
  {
    name: "Leave Duration",
    uid: "leaveDuration",
  },
  {
    name: "Status",
    uid: "status",
  },

  {
    name: "Actions",
    uid: "actions",
  },
];

export const leaveStatusColorMap: leaveStatusColorMapType = {
  ACCEPTED: "success",
  REJECTED: "danger",
  PENDING: "warning",
};

export type leaveStatusColorMapType = {
  [key: string]: "success" | "danger" | "warning";
  ACCEPTED: "success" | "danger" | "warning";
  REJECTED: "success" | "danger" | "warning";
  PENDING: "success" | "danger" | "warning";
};
