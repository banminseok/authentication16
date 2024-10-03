import { NextRequest, NextResponse } from 'next/server'
import getSession from './lib/session'

interface Routes {
  [key: string]: boolean;
}

const publicOnlyUrls: Routes = {
  "/home": true,
  "/login": true,
  "/create-account": true,
};

export async function middleware(request:NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else {
    if (exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

}

export const config={
  matcher: ["/((?!_next/static|_next/image|images|favicon.ico).*)"],
  //matcher: ['profile', '/about/:path*', '/dashboard/:path*'],
};