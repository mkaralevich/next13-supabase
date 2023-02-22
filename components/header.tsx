"use client";

import { useSupabase } from "./supabase-provider";

export default function Header() {
	const { supabase, session } = useSupabase();

	async function handleLogout() {
		const { error } = await supabase.auth.signOut();
		if (error) console.log(error);
	}

	async function handleLoginWithGithub() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "github",
		});
		if (error) console.log(error);
	}

	return (
		<header>
			<div>
				{session && <button onClick={handleLogout}>Logout</button>}
				{!session && <button onClick={handleLoginWithGithub}>Log in</button>}
				<div>{session && session.user.email}</div>
			</div>
		</header>
	);
}
