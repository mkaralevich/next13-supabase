"use client";

import type { Session } from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useState } from "react";
import { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import supabaseBrowser from "../utils/supabase-browser";

type MaybeSession = Session | null;

type SupabaseContext = {
	supabase: SupabaseClient;
	session: MaybeSession;
};

// @ts-ignore
const Context = createContext<SupabaseContext>();

export default function SupabaseProvider({
	children,
	session,
}: {
	children: React.ReactNode;
	session: MaybeSession;
}) {
	const [supabase] = useState(() => supabaseBrowser);

	console.log("session from provider:", session?.access_token);

	return (
		<Context.Provider value={{ supabase, session }}>
			<>{children}</>
		</Context.Provider>
	);
}

export function useSupabase() {
	return useContext(Context);
}
