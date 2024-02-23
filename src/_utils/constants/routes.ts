import { GrUserAdmin } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";

import { PERMISSIONS } from "@/_utils/enums";

export const ROUTES = [
  {
    title: "Dashboard",
    route: "/dashboard",
    permissions: [],
    icon: MdDashboard,
  },
  {
    route: "/hr",
    icon: GrUserAdmin,
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
      // {
      //   route: "/hr/roles",
      //   permissions: [PERMISSIONS.READ_ALL_ROLE],
      //   title: "Roles",
      // },
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
    ],
  },
  {
    route: "/leaves",
    icon: GrUserAdmin,
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
    icon: GrUserAdmin,
    permissions: [PERMISSIONS.CREATE_PAYROLL, PERMISSIONS.READ_ALL_PAYROLL],
    title: "Payroll",
    children: [
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
  {
    route: "/configurations",
    icon: GrUserAdmin,
    permissions: [],
    title: "Configurations",
  },
  {
    route: "/roles",
    icon: GrUserAdmin,
    permissions: [PERMISSIONS.READ_ALL_ROLE],
    title: "Roles",
  },
  {
    route: "/announcements",
    icon: GrUserAdmin,
    permissions: [PERMISSIONS.CREATE_PAYROLL, PERMISSIONS.READ_ALL_PAYROLL],
    title: "Announcements",
    children: [
      {
        route: "/announcements/general",
        permissions: [PERMISSIONS.READ_ALL_ANNOUNCEMENT],
        title: "Announcements",
      },
      {
        route: "/announcements/newsletter",
        permissions: [PERMISSIONS.READ_ALL_ANNOUNCEMENT],
        title: "News Letters",
      },
    ],
  },
];
