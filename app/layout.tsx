import "server-only";

import Header from "../components/header";
import SupabaseListener from "../components/supabase-listener";
import SupabaseProvider from "../components/supabase-provider";
import supabaseServer from "../utils/supabase-server";
import Providers from "./providers";

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
				<Providers supabaseSession={session}>
					<Header />
					{children}
				</Providers>
			</body>
		</html>
	);
}
