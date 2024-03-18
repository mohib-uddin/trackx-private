export enum EMPLOYEE_FORM_STEPPERS {
  USER,
  ADDRESS,
  QUALIFICATION,
  EMPLOYEE,
  DESIGNATION,
}

export enum PERMISSIONS {
  CREATE_USER = "create-user",
  READ_ALL_USER = "readAll-user",
  READ_ALL_ROLE = "readAll-role",
  READ_ALL_DESIGNATION = "readAll-designation",
  READ_ALL_DEPARTMENT = "readAll-department",
  CREATE_ATTENDANCE = "create-attendance",
  READ_ALL_ATTENDANCE = "readAll-attendance",
  READ_SINGLE_ATTENDANCE = "readSingle-attendance",
  CREATE_PAYROLL = "create-payroll",
  READ_ALL_PAYROLL = "readAll-payroll",
  READ_ALL_SHIFT = "readAll-shift",
  READ_ALL_EMPLOYMENT_STATUS = "readAll-employmentStatus",
  CREATE_LEAVE_APPLICATION = "create-leaveApplication",
  READ_ALL_LEAVE_APPLICATION = "readAll-leaveApplication",
  READ_SINGLE_LEAVE_APPLICATION = "readSingle-leaveApplication",
  READ_ALL_WEEKLY_HOLIDAY = "readAll-weeklyHoliday",
  READ_ALL_PUBLIC_HOLIDAY = "readAll-publicHoliday",
  READ_ALL_LEAVE_POLICY = "readAll-leavePolicy",
  READ_ALL_ANNOUNCEMENT = "readAll-announcement",
  READ_ALL_ACCOUNT = "readAll-account",
  READ_ALL_TRANSACTION = "readAll-transaction",
  CREATE_TRANSACTION = "create-transaction",
  CREATE_AWARD = "crate-award", // Note: There might be a typo here, it says "crate-award"
  READ_ALL_AWARD = "readAll-award",
  CREATE_PROJECT = "create-project",
  READ_ALL_PROJECT = "readAll-project",
  CREATE_PROJECT_TEAM = "create-projectTeam",
  CREATE_MILESTONE = "create-milestone",
  READ_ALL_PRIORITY = "readAll-priority",
  CREATE_TASK_STATUS = "create-task-Status", // Note: There might be a typo here, it says "create-task-Status"
  READ_ALL_SETTING = "readAll-setting",
}

enum CALCULATION_TYPE {
  FLAT = "flat",
  PERCENTAGE = "percentage",
}
