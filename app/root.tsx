import { clsx } from "clsx"
import { useTranslation } from "react-i18next"
import type { LinksFunction } from "react-router"
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useRouteError } from "react-router"
import favicon from "./assets/favicon.png"

import { ThemeProvider, useTheme } from "next-themes"
import { ClientHintCheck } from "./services/client-hints"
import tailwindcss from "./tailwind.css?url"

export const links: LinksFunction = () => [
	/* Google Fonts preconnect for performance */
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
	{ rel: "stylesheet", href: tailwindcss },
	{ rel: "icon", href: favicon, type: "image/png" },
]

export const handle = {
	i18n: "common",
}

export default function App() {
	const clientEnv = { NODE_ENV: import.meta.env.MODE }
	return (
		<ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
			<ThemedLayout clientEnv={clientEnv}>
				<Outlet />
			</ThemedLayout>
		</ThemeProvider>
	)
}

// biome-ignore lint/suspicious/noExplicitAny: Temporary for theme toggling
export function ThemedLayout({ children, clientEnv }: { children: React.ReactNode; clientEnv: any }) {
	const { i18n } = useTranslation()
	const { resolvedTheme } = useTheme()
	return (
		<html
			suppressHydrationWarning
			className={clsx("overflow-y-auto overflow-x-hidden", resolvedTheme)}
			lang={i18n.language}
			dir={i18n.dir()}
			style={{ colorScheme: resolvedTheme }}
		>
			<head>
				<ClientHintCheck />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body className="h-full w-full">
				{children}
				<ScrollRestoration />
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: We set the window.env variable to the client env */}
				<script dangerouslySetInnerHTML={{ __html: `window.env = ${JSON.stringify(clientEnv ?? {})}` }} />
				<Scripts />
			</body>
		</html>
	)
}

export const ErrorBoundary = () => {
	const error = useRouteError()
	const { t } = useTranslation()
	const statusCode = () => {
		if (!isRouteErrorResponse(error)) return "500"
		switch (error.status) {
			case 200: return "200"
			case 403: return "403"
			case 404: return "404"
			default:  return "500"
		}
	}
	const errorStatusCode = statusCode()

	return (
		<div className="relative flex h-full min-h-screen w-screen items-center justify-center bg-background">
			<div className="text-center">
				<p className="font-mono text-sm text-gold mb-4">{errorStatusCode}</p>
				<h1 className="font-display text-4xl text-foreground mb-3">{t(`error.${errorStatusCode}.title`)}</h1>
				<p className="text-muted-foreground">{t(`error.${errorStatusCode}.description`)}</p>
				<a href="/" className="mt-8 inline-block text-sm text-gold hover:text-gold-light transition-colors">
					← Back home
				</a>
			</div>
		</div>
	)
}
