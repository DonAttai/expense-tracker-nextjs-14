export { auth as middleware } from "@/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   const pathname = req.nextUrl.pathname;
//   // const publicPath = path === "/login" || path === "/register";
//   const publicPath = ["/login", "/register"];
//   const getCookies = cookies();
//   const token = getCookies.get("access-token")?.value || "";

//   if (publicPath.includes(pathname) && token !== "") {
//     return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
//   }

//   if (!publicPath.includes(pathname) && token === "") {
//     return NextResponse.redirect(new URL("/login", req.nextUrl));
//   }
// }
// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
