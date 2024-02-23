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
export type renderMyLeavesType = {
  id: string;
  leaveType: string;
  acceptLeaveFrom: string;
  acceptLeaveTo: string;
  reviewComment: string;
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
type myLeaveColumnsType = {
  name: string;
  uid: keyof renderMyLeavesType;
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

export const MY_LEAVE_COLS: myLeaveColumnsType[] = [
  {
    name: "ID",
    uid: "id",
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
    name: "Accept Leave From",
    uid: "acceptLeaveFrom",
  },
  {
    name: "Accept Leave To",
    uid: "acceptLeaveTo",
  },
  {
    name: "Review Comment",
    uid: "reviewComment",
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
  APPROVED: "success",
  REJECTED: "danger",
  PENDING: "warning",
};

export type leaveStatusColorMapType = {
  [key: string]: "success" | "danger" | "warning";
  APPROVED: "success" | "danger" | "warning";
  REJECTED: "success" | "danger" | "warning";
  PENDING: "success" | "danger" | "warning";
};
