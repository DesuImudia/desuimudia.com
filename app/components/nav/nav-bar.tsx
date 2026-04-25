import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { href, useLocation, useNavigate } from "react-router"
import { cn } from "~/lib/utils"
import { Link } from "~/library/link"
import { supportedLanguages } from "~/localization/resource"

export default function NavBar() {
	const { t, i18n } = useTranslation()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const homeHref = href("/")
	const [scrolled, setScrolled] = useState(false)
	const [menuOpen, setMenuOpen] = useState(false)

	const ANCHOR_LINKS = [
		{ label: t("navigation.about_tab"), hash: "about", accent: "var(--olive)" },
		{ label: t("navigation.experience_tab"), hash: "experience", accent: "var(--blush)" },
		{ label: t("navigation.contact_tab"), hash: "contact", accent: "var(--crimson)" },
	]

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24)
		window.addEventListener("scroll", onScroll, { passive: true })
		return () => window.removeEventListener("scroll", onScroll)
	}, [])

	useEffect(() => {
		setMenuOpen(false)
	}, [pathname])

	const scrollToSection = (hash: string) => {
		setMenuOpen(false)
		if (pathname === "/") {
			document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" })
		} else {
			navigate(`/#${hash}`)
		}
	}

	return (
		<>
			<header
				className={cn(
					"fixed top-0 left-0 right-0 z-50 transition-all duration-300",
					scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent",
				)}
			>
				<div className="w-full px-6 md:px-12">
					<div className="flex h-16 items-center justify-between">
						{/* Logo */}
						<Link
							to={homeHref}
							className="font-display text-xl font-bold tracking-wider text-foreground hover:opacity-70 transition-opacity"
						>
							DESU
						</Link>

						{/* Desktop nav */}
						<nav className="hidden md:flex items-center gap-8">
							{ANCHOR_LINKS.map(({ label, hash, accent }) => (
								<button
									key={hash}
									type="button"
									onClick={() => scrollToSection(hash)}
									className="font-sans text-sm text-muted-foreground transition-colors"
									onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = accent }}
									onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "" }}
								>
									{label}
								</button>
							))}
							<span className="font-mono text-xs text-border select-none">|</span>
							<span className="flex items-center gap-1">
								{supportedLanguages.map((lang, i) => (
									<span key={lang} className="flex items-center gap-1">
										{i > 0 && <span className="font-mono text-xs text-border select-none">/</span>}
										<Link
											to={pathname}
											language={lang}
											keepSearchParams
											onClick={() => i18n.changeLanguage(lang)}
											className={cn(
												"font-mono text-xs tracking-widest uppercase transition-colors",
												i18n.language === lang
													? "text-foreground"
													: "text-muted-foreground hover:text-foreground",
											)}
										>
											{lang}
										</Link>
									</span>
								))}
							</span>
						</nav>

						{/* Mobile hamburger */}
						<button
							type="button"
							onClick={() => setMenuOpen((v) => !v)}
							className="md:hidden flex flex-col gap-1.5 p-2 text-foreground"
							aria-label="Toggle menu"
						>
							<span className={cn("block h-px w-5 bg-current transition-all duration-200", menuOpen && "rotate-45 translate-y-[7px]")} />
							<span className={cn("block h-px w-5 bg-current transition-all duration-200", menuOpen && "opacity-0")} />
							<span className={cn("block h-px w-5 bg-current transition-all duration-200", menuOpen && "-rotate-45 -translate-y-[7px]")} />
						</button>
					</div>
				</div>
			</header>

			{/* Mobile menu */}
			{menuOpen && (
				<div className="fixed inset-0 z-40 bg-background pt-16 md:hidden">
					<nav className="container-site flex flex-col py-8 gap-1">
						<Link
							to={homeHref}
							className="py-4 text-2xl font-display border-b border-border text-muted-foreground hover:text-foreground transition-colors"
						>
							{t("navigation.home_tab")}
						</Link>
						{ANCHOR_LINKS.map(({ label, hash }) => (
							<button
								key={hash}
								type="button"
								onClick={() => scrollToSection(hash)}
								className="py-4 text-2xl font-display border-b border-border text-muted-foreground hover:text-foreground transition-colors text-left"
							>
								{label}
							</button>
						))}
						<div className="pt-6 flex gap-4">
							{supportedLanguages.map((lang) => (
								<Link
									key={lang}
									to={pathname}
									language={lang}
									keepSearchParams
									onClick={() => { i18n.changeLanguage(lang); setMenuOpen(false) }}
									className={cn(
										"font-mono text-sm tracking-widest uppercase transition-colors",
										i18n.language === lang
											? "text-foreground"
											: "text-muted-foreground hover:text-foreground",
									)}
								>
									{lang}
								</Link>
							))}
						</div>
					</nav>
				</div>
			)}
		</>
	)
}
