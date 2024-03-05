export type renderAttendanceType = {
  id: string;
  inTime: string;
  outTime: string;
  comment: string;
  inTimeStatus: string;
  outTimeStatus: string;
  currentValue: number;
  createdAt: string;
  actions: React.ReactNode;
  user: React.ReactNode;
  totalHour: string;
};

type attendanceColsType = {
  name: string;
  uid: keyof renderAttendanceType;
};

export const ATTENDANCE_COLS: attendanceColsType[] = [
  {
    name: "ID",
    uid: "id",
  },
  {
    name: "PunchedBy",
    uid: "user",
  },
  {
    name: "In Time",
    uid: "inTime",
  },
  {
    name: "InTime Status",
    uid: "inTimeStatus",
  },
  {
    name: "Out Time",
    uid: "outTime",
  },
  {
    name: "OutTime Status",
    uid: "outTimeStatus",
  },
  {
    name: "Hours Logged",
    uid: "totalHour",
  },
  {
    name: "Comment",
    uid: "comment",
  },

  {
    name: "Actions",
    uid: "actions",
  },
];

export const attendanceStatusColorMap: employeeStatusColorMapType = {
  lead: "success",
  Late: "danger",
  Early: "warning",
};

export type employeeStatusColorMapType = {
  [key: string]: "success" | "danger" | "warning";
  lead: "success" | "danger" | "warning";
  Late: "success" | "danger" | "warning";
  Early: "success" | "danger" | "warning";
};
