import { PERMISSIONS } from "@/_utils/enums";

import AnnouncementLogo from "../../../public/icons/Announcement_b.svg";
import AttendanceLogo from "../../../public/icons/Attendance_b.svg";
import ConfigurationLogo from "../../../public/icons/Configurations_b.svg";
import DashboardLogo from "../../../public/icons/Dashboard_b.svg";
import HRLogo from "../../../public/icons/HR_b.svg";
import LeaveLogo from "../../../public/icons/leave_b.svg";
import OrganizationLogo from "../../../public/icons/organization_b.svg";
import PayrollLogo from "../../../public/icons/Payroll_b.svg";
import PolicyLogo from "../../../public/icons/Policy_b.svg";
import RolesLogo from "../../../public/icons/Roles_b.svg";

export const ROUTES = [
  {
    title: "Dashboard",
    route: "/dashboard",
    permissions: [],
    icon: <DashboardLogo />,
  },
  {
    route: "/hr",
    icon: <HRLogo />,
    permissions: [
      PERMISSIONS.CREATE_USER,
      PERMISSIONS.READ_ALL_USER,
      PERMISSIONS.READ_ALL_ROLE,
      PERMISSIONS.READ_ALL_DESIGNATION,
      PERMISSIONS.READ_ALL_DEPARTMENT,
    ],
    title: "HR",
    children: [
      {
        route: "/hr/add-employee",
        permissions: [PERMISSIONS.CREATE_USER],
        title: "Add Employee",
      },
      {
        route: "/hr/view-employees",
        permissions: [PERMISSIONS.READ_ALL_USER],
        title: "View Employees",
      },
      {
        route: "/hr/employee",
        permissions: [PERMISSIONS.READ_ALL_USER],
      },
      {
        route: "/hr/employment-status",
        permissions: [PERMISSIONS.READ_ALL_EMPLOYMENT_STATUS],
        title: "Employment Status",
      },
      {
        route: "/hr/designations",
        permissions: [PERMISSIONS.READ_ALL_DESIGNATION],
        title: "Designations",
      },
      {
        route: "/hr/departments",
        permissions: [PERMISSIONS.READ_ALL_DEPARTMENT],
        title: "Departments",
      },
      {
        route: "/hr/assets",
        permissions: [PERMISSIONS.READ_ALL_ROLE],
        title: "Assets",
      },
    ],
  },
  {
    route: "/organization",
    icon: <OrganizationLogo />,
    permissions: [
      PERMISSIONS.CREATE_LEAVE_APPLICATION,
      PERMISSIONS.READ_ALL_LEAVE_APPLICATION,
      PERMISSIONS.READ_SINGLE_LEAVE_APPLICATION,
    ],
    title: "Organization",
    children: [
      {
        route: "/organization/hierarchy",
        permissions: [PERMISSIONS.READ_ALL_DESIGNATION],
        title: "Employee Hierarchy",
      },
    ],
  },
  {
    route: "/leaves",
    icon: <LeaveLogo />,
    permissions: [
      PERMISSIONS.CREATE_LEAVE_APPLICATION,
      PERMISSIONS.READ_ALL_LEAVE_APPLICATION,
      PERMISSIONS.READ_SINGLE_LEAVE_APPLICATION,
    ],
    title: "Leaves",
    children: [
      {
        route: "/leaves/leave-management",
        permissions: [PERMISSIONS.READ_ALL_LEAVE_APPLICATION],
        title: "Leave Status",
      },
      {
        route: "/leaves/new",
        permissions: [PERMISSIONS.CREATE_LEAVE_APPLICATION],
        title: "New Leave",
      },
      {
        route: "/leaves/my-leaves",
        permissions: [PERMISSIONS.READ_SINGLE_LEAVE_APPLICATION],
        title: "My Leaves",
      },
    ],
  },
  {
    route: "/payroll",
    icon: <PayrollLogo />,
    permissions: [PERMISSIONS.CREATE_PAYROLL, PERMISSIONS.READ_ALL_PAYROLL],
    title: "Payroll",
    children: [
      {
        route: "/payroll/salary-components",
        permissions: [PERMISSIONS.CREATE_PAYROLL],
        title: "Salary Components",
      },
      {
        route: "/payroll/new",
        permissions: [PERMISSIONS.CREATE_PAYROLL],
        title: "Calculate Payroll",
      },
      {
        route: "/payroll/list",
        permissions: [PERMISSIONS.READ_ALL_PAYROLL],
        title: "Payslip List",
      },
    ],
  },
  // {
  //   route: "/configurations",
  //   icon: <ConfigurationLogo className={"text-white"} />,
  //   permissions: [],
  //   title: "Configurations",
  // },
  {
    route: "/roles",
    icon: <RolesLogo />,
    permissions: [PERMISSIONS.READ_ALL_ROLE],
    title: "Roles",
  },
  {
    route: "/announcements",
    icon: <AnnouncementLogo />,
    permissions: [PERMISSIONS.READ_ALL_ANNOUNCEMENT],
    title: "Announcements",
    children: [
      {
        route: "/announcements/general",
        permissions: [PERMISSIONS.READ_ALL_ANNOUNCEMENT],
        title: "Announcements",
      },
      // {
      //   route: "/announcements/newsletter",
      //   permissions: [PERMISSIONS.READ_ALL_ANNOUNCEMENT],
      //   title: "News Letters",
      // },
    ],
  },
  {
    route: "/policies",
    icon: <PolicyLogo />,
    permissions: [
      PERMISSIONS.READ_ALL_LEAVE_POLICY,
      PERMISSIONS.READ_ALL_PUBLIC_HOLIDAY,
      PERMISSIONS.READ_ALL_WEEKLY_HOLIDAY,
      PERMISSIONS.READ_ALL_SHIFT,
    ],
    title: "Policies",
    children: [
      // {
      //   route: "/policies/policy-documents",
      //   permissions: [PERMISSIONS.READ_ALL_LEAVE_POLICY],
      //   title: "Policy Documents",
      // },
      {
        route: "/policies/leave-policy",
        permissions: [PERMISSIONS.READ_ALL_LEAVE_POLICY],
        title: "Leave Policy",
      },
      // {
      //   route: "/policies/payroll-policy",
      //   permissions: [PERMISSIONS.READ_ALL_LEAVE_POLICY],
      //   title: "Payroll Policy",
      // },
      {
        route: "/policies/holiday-policy",
        permissions: [
          PERMISSIONS.READ_ALL_PUBLIC_HOLIDAY,
          PERMISSIONS.READ_ALL_WEEKLY_HOLIDAY,
        ],
        title: "Holidays",
      },
      {
        route: "/policies/shift-policy",
        permissions: [PERMISSIONS.READ_ALL_SHIFT],
        title: "Shifts",
      },
    ],
  },
  {
    route: "/attendance",
    icon: <AttendanceLogo />,
    permissions: [
      PERMISSIONS.READ_ALL_ATTENDANCE,
      PERMISSIONS.CREATE_ATTENDANCE,
      PERMISSIONS.READ_SINGLE_ATTENDANCE,
    ],
    title: "Attendance",
    children: [
      {
        route: "/attendance/all",
        permissions: [PERMISSIONS.READ_ALL_ATTENDANCE],
        title: "View Attendance",
      },
    ],
  },
];
