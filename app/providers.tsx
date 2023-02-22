"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SupabaseProvider from "../components/supabase-provider";
import SupabaseListener from "../components/supabase-listener";

export default function Providers({ children, supabaseSession }) {
	const [queryClient] = React.useState(() => new QueryClient());

	return (
		<SupabaseProvider session={supabaseSession}>
			<SupabaseListener serverAccessToken={supabaseSession?.access_token} />
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SupabaseProvider>
	);
}
