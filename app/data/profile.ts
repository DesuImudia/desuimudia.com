/* ─── Profile ───────────────────────────────────────────────────────────────
   Central source of truth for personal info, bio copy, and social links.
   Update this file to change anything that appears across multiple pages.
   ─────────────────────────────────────────────────────────────────────────── */

export const profile = {
	name: "Desu Imudia",

	resumeUrl: "/resume.pdf",
	location: "New York, NY",
	email: "desu.imudia@gmail.com",
	phone: "(504) 261-8006",

	social: [
		{
			platform: "LinkedIn",
			url: "https://www.linkedin.com/in/desuimudia",
			handle: "desuimudia",
			icon: "linkedin",
		},
		{
			platform: "Instagram",
			url: "https://www.instagram.com/desuimudia",
			handle: "desuimudia",
			icon: "instagram",
		},
		{
			platform: "Letterboxd",
			url: "https://boxd.it/RW6N",
			handle: "desuii",
			icon: "film",
		},
	],
} as const
