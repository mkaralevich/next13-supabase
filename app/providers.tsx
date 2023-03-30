"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SupabaseProvider from "../components/supabase-provider";
import SupabaseListener from "../components/supabase-listener";
import { Provider as JotaiProvider } from "jotai";

export default function Providers({ children, supabaseSession }) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<SupabaseProvider session={supabaseSession}>
			<SupabaseListener serverAccessToken={supabaseSession?.access_token} />
			<QueryClientProvider client={queryClient}>
				<JotaiProvider>{children}</JotaiProvider>
			</QueryClientProvider>
		</SupabaseProvider>
	);
}
