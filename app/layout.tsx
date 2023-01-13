import "server-only";

import Header from "../components/header";
import SupabaseListener from "../components/supabase-listener";
import SupabaseProvider from "../components/supabase-provider";
import supabaseServer from "../utils/supabase-server";

// do not cache this layout
export const revalidate = 0;

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const supabase = supabaseServer();

	const {
		data: { session },
	} = await supabase.auth.getSession();

	return (
		<html lang="en">
			<head />
			<body>
				<SupabaseProvider session={session}>
					<SupabaseListener serverAccessToken={session?.access_token} />
					<Header />
					{children}
				</SupabaseProvider>
			</body>
		</html>
	);
}
