import { NextRequest, NextResponse } from "next/server";

import { cookieAuth } from "@/_utils/constants";
import { ROUTES } from "@/_utils/constants/routes";
import { PERMISSIONS } from "@/_utils/enums";
import { fetchUserPermissions } from "@/services/auth/auth.api";

type routeType = {
  title?: string;
  route: string;
  permissions: PERMISSIONS[];
  children?: {
    title?: string;
    route: string;
    permissions: PERMISSIONS[];
  }[];
};

export const PUBLIC = ["/login", "/unauthorized"];
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(cookieAuth);
  if (!token?.value && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (!PUBLIC.includes(pathname)) {
    const userPermissions = await fetchUserPermissions();
    const filterRoutes = (routes: routeType[]) => {
      let isAllowed = false;

      routes.forEach((route) => {
        if (route.permissions.length === 0) {
          console.log(route.route);
          NextResponse.next();
        }
        const hasPermission =
          ((route.children && route.route === pathname) ||
            (!route.children && pathname.includes(route.route))) &&
          (route.permissions === null ||
            route.permissions.some((permission) =>
              userPermissions.data.includes(permission),
            ));

        if (hasPermission) {
          console.log(route.route, "current");
          isAllowed = true;
          return;
        } else if (route.children) {
          // Recursively check children routes
          const childResult = filterRoutes(route.children);
          if (childResult) {
            isAllowed = true;
          }
        } else if (!route.children) {
          if (pathname.includes(route.route)) {
            isAllowed = true;
          }
        }
      });

      return isAllowed;
    };
    const isAllowed = filterRoutes(ROUTES);
    if (!isAllowed) {
      return NextResponse.rewrite(new URL("/unauthorized", request.nextUrl));
    }
  }

  return NextResponse.rewrite(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
