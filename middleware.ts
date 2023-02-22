import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
	const res = NextResponse.next();

	const supabase = createMiddlewareSupabaseClient({ req, res });

	const {
		data: { session },
	} = await supabase.auth.getSession();

	console.log("MIDDLEWARE SESSION =", session ? "TRUE" : "FALSE");
	console.log("MIDDLEWARE PATHNAME =", req.nextUrl.pathname);

	if (!session && !req.nextUrl.pathname.endsWith("login")) {
		console.log("REDIRECT TO LOGIN");
		return NextResponse.redirect(new URL("/login", req.url));
	}

	if (session && req.nextUrl.pathname.startsWith("/login")) {
		console.log("REDIRECT TO MAIN");
		return NextResponse.redirect(new URL("/", req.url));
	}

	return res;
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
	// matcher: ["/:path*"],
};
