/* ─── Experience ─────────────────────────────────────────────────────────────
   Work history and education — populates the experience section on home.
   ─────────────────────────────────────────────────────────────────────────── */

export interface WorkEntry {
	company: string
	role: string
	period: string
	location: string
	description: string
	bullets: string[]
	tags: string[]
}

export interface EducationEntry {
	school: string
	degree: string
	field: string
	period: string
}

export const workHistory: WorkEntry[] = [
	{
		company: "BlackRock",
		role: "Product Manager — Aladdin AI Engineering",
		period: "Feb 2024 – Present",
		location: "New York, NY",
		description:
			"Took ownership of a fragmented generative AI pilot and scaled it into a coordinated capability deployed across 20+ Aladdin applications, enabling users to surface platform answers and pull contextual data on demand.",
		bullets: [
			"Scaled a generative AI chat experience across 20+ Aladdin apps and 5+ production languages, driving a ~19% reduction in L1 support inquiries",
			"Led 10+ enterprise releases as the coordination point across engineering, platform, and partner teams — introducing enhancement review ceremonies and standardized release practices",
			"Authored AI platform PRDs and a platform migration plan defining model inference paths, security checks, benchmarking milestones, and enterprise service requirements",
			"Designed a Power BI telemetry dashboard and end-to-end KPI framework covering adoption, grounded-answer rate, latency, and action conversion — adopted as a model across partner teams",
			"Drove roadmap planning for AI use cases across client servicing, inquiry deflection, and agentic workflows",
		],
		tags: ["Product Strategy", "Generative AI", "Enterprise", "Roadmapping", "Aladdin", "Telemetry"],
	},
	{
		company: "BlackRock",
		role: "Software Engineering Analyst — Aladdin Engineering",
		period: "Aug 2022 – Aug 2024",
		location: "New York, NY",
		description:
			"Rotated across three Aladdin product areas — Sustainability, Risk & Investment Oversight, and Trading — building production features used by portfolio managers, risk analysts, and trading teams.",
		bullets: [
			"Shipped front-end and analytics features using Angular, Java, HTML/CSS, and SQL across the Aladdin ecosystem",
			"Built a widget selection gallery for portfolio reporting, climate risk visualizations, and Snowflake-backed telemetry instrumentation",
			"Developed message flow components for early-stage trading workflows",
			"Collaborated across product, UX, and data modeling teams to deliver production-ready software across multiple platform systems",
		],
		tags: ["Angular", "Java", "SQL", "Snowflake", "Full-Stack", "Aladdin"],
	},
]

export const education: EducationEntry[] = [
	{
		school: "Columbia University",
		degree: "Bachelor of Arts",
		field: "Computer Science — Specialization in Applications & UX Design",
		period: "2018 – 2022",
	},
]
