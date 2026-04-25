import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import desuPhoto1 from "~/assets/desuimudia-1.png"
import desuPhoto2 from "~/assets/desuimudia-2.png"
import desuPhotoExperience from "~/assets/desuimudia.png"
import { workHistory, education } from "~/data/experience"
import type { FridgeMagnet, FridgeItem } from "~/data/fridge"
import { magnets, insideItems } from "~/data/fridge"
import { profile } from "~/data/profile"
import { useScrollReveal, useWaterfallReveal } from "~/hooks/useScrollReveal"

export function links() {
	return [
		{ rel: "preload", href: "/fridge/fridge-full-transparent.webp", as: "image" },
		{ rel: "preload", href: "/fridge/fridge-open.webp", as: "image" },
		{ rel: "preload", href: "/fridge/fridge-inside-door-open.webp", as: "image" },
	]
}

export function meta() {
	return [
		{ title: "Desu Imudia" },
		{ name: "description", content: "Product Manager & Creative Technologist." },
	]
}

const MAGNET_IMAGES: Record<string, string> = {
	"calendar-2026":       "/fridge/magnets/calendar 2026.webp",
	"chilis":              "/fridge/magnets/chilis.webp",
	"costa-rica":          "/fridge/magnets/costa-rica-sticker.webp",
	"cowboy-boots":        "/fridge/magnets/cowboy-boots.webp",
	"delroy-lindo":        "/fridge/magnets/delroy-lindo.webp",
	"desu-australia":      "/fridge/magnets/desu-in-austrailia.webp",
	"desu-racetrack":      "/fridge/magnets/desu-racetrack.webp",
	"desu-sports":         "/fridge/magnets/desu-sports.webp",
	"do-it-for-the-plot":  "/fridge/magnets/do-it-for-the-plot.webp",
	"f1-watch-party":      "/fridge/magnets/f1-watch-party.webp",
	"fleabag":             "/fridge/magnets/fleabag-poster.webp",
	"friends-coffee-chat": "/fridge/magnets/friends-coffee-chat.webp",
	"good-times-tickets":  "/fridge/magnets/good-times-tickets.webp",
	"guitar-pick":         "/fridge/magnets/guitar-pick.webp",
	"iluvny-button":       "/fridge/magnets/iluvny-button.webp",
	"march-note-to-self":  "/fridge/magnets/march-note-to-self.webp",
	"metrocard":           "/fridge/magnets/metrocard.webp",
	"mockingjay-pin":      "/fridge/magnets/mockingjay-pin.webp",
	"music-sheet":         "/fridge/magnets/music-sheet.webp",
	"nicole-kidman-amc":   "/fridge/magnets/nicole-kidman-amc.webp",
	"parents":             "/fridge/magnets/parents.webp",
	"photo-booth":         "/fridge/magnets/photo-booth.webp",
	"roomies":             "/fridge/magnets/roomies.webp",
}

const ITEM_IMAGES: Record<string, string> = {
	"f1-car":      "/fridge/inside/f1-car.png",
	"fries":       "/fridge/inside/fries.png",
	"luggage":     "/fridge/inside/luggage.png",
	"mango":       "/fridge/inside/mango.webp",
	"matcha":      "/fridge/inside/matcha.png",
	"sumo-orange": "/fridge/inside/sumo-orange.png",
}

const FRIDGE_INSIDE_DOOR = "/fridge/fridge-inside-door-open.webp"
const FRIDGE_OPEN        = "/fridge/fridge-open.webp"

type MagnetPos = { top: string; left: string }

type DragState = {
	id: string
	container: DOMRect
	pointerOffsetX: number
	pointerOffsetY: number
	startPointerX: number
	startPointerY: number
	moved: boolean
}

export default function Home() {
	const { t } = useTranslation()
	const [activeMagnet, setActiveMagnet]   = useState<FridgeMagnet | null>(null)
	const [fridgeOpen, setFridgeOpen]       = useState(false)
	const [activeItem, setActiveItem]       = useState<FridgeItem | null>(null)
	const [panelReady, setPanelReady]       = useState(false)
	const isPanelOpen = activeMagnet !== null || (fridgeOpen && activeItem !== null)
	const [activePhoto, setActivePhoto] = useState(0)
	const [magnetPositions, setMagnetPositions] = useState<Record<string, MagnetPos>>({})
	const [draggingId, setDraggingId] = useState<string | null>(null)
	const dragState = useRef<DragState | null>(null)

	useEffect(() => {
		const interval = setInterval(() => setActivePhoto((p) => (p === 0 ? 1 : 0)), 1000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		let t: ReturnType<typeof setTimeout>
		if (isPanelOpen) {
			t = setTimeout(() => setPanelReady(true), 40)
		} else {
			setPanelReady(false)
		}
		return () => clearTimeout(t)
	}, [isPanelOpen])

	const handleMagnetPointerDown = (e: React.PointerEvent, magnet: FridgeMagnet) => {
		e.stopPropagation()
		const btn = e.currentTarget as HTMLElement
		const container = btn.parentElement?.getBoundingClientRect()
		if (!container) return
		const btnRect = btn.getBoundingClientRect()
		dragState.current = {
			id: magnet.id,
			container,
			pointerOffsetX: e.clientX - btnRect.left,
			pointerOffsetY: e.clientY - btnRect.top,
			startPointerX: e.clientX,
			startPointerY: e.clientY,
			moved: false,
		}
		btn.setPointerCapture(e.pointerId)
	}

	const handleMagnetPointerMove = (e: React.PointerEvent, magnet: FridgeMagnet) => {
		const d = dragState.current
		if (!d || d.id !== magnet.id) return
		const dx = Math.abs(e.clientX - d.startPointerX)
		const dy = Math.abs(e.clientY - d.startPointerY)
		if (dx > 4 || dy > 4) d.moved = true
		if (!d.moved) return
		if (!draggingId) setDraggingId(magnet.id)
		const newLeft = ((e.clientX - d.pointerOffsetX - d.container.left) / d.container.width) * 100
		const newTop  = ((e.clientY - d.pointerOffsetY - d.container.top)  / d.container.height) * 100
		setMagnetPositions((prev) => ({
			...prev,
			[magnet.id]: {
				left: `${Math.max(0, Math.min(95, newLeft)).toFixed(1)}%`,
				top:  `${Math.max(0, Math.min(95, newTop)).toFixed(1)}%`,
			},
		}))
	}

	const handleMagnetPointerUp = (e: React.PointerEvent, magnet: FridgeMagnet) => {
		e.stopPropagation()
		const d = dragState.current
		if (!d || d.id !== magnet.id) return
		const moved = d.moved
		dragState.current = null
		setDraggingId(null)
		if (!moved && magnet.hasPanel) {
			if (activeMagnet?.id === magnet.id) {
				setActiveMagnet(null)
			} else {
				setActiveMagnet(magnet)
				setFridgeOpen(false)
				setActiveItem(null)
			}
		}
	}

	const handleFridgeClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (fridgeOpen) {
			setFridgeOpen(false)
			setActiveItem(null)
		} else {
			const availableItems = insideItems.filter((i) => ITEM_IMAGES[i.id])
		const item = availableItems[Math.floor(Math.random() * availableItems.length)]
			setActiveItem(item)
			setFridgeOpen(true)
			setActiveMagnet(null)
		}
	}

	const handleClose = () => {
		setActiveMagnet(null)
		setFridgeOpen(false)
		setActiveItem(null)
	}

	const panelContent = activeMagnet
		? {
			category: t(`fridge.category.${activeMagnet.category}`, activeMagnet.category),
			title: t(`fridge.magnets.${activeMagnet.id}.name`, activeMagnet.title),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			description: t(`fridge.magnets.${activeMagnet.id}.description` as any),
			image: MAGNET_IMAGES[activeMagnet.id],
		}
		: activeItem
		? {
			category: t("fridge.panel.insideLabel"),
			title: t(`fridge.items.${activeItem.id}.name`, activeItem.name),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			description: t(`fridge.items.${activeItem.id}.description` as any),
			image: ITEM_IMAGES[activeItem.id],
		}
		: null

	useScrollReveal()
	useWaterfallReveal()

	const doorMagnets = magnets.filter((m) => m.section !== "top")
	const topMagnets  = magnets.filter((m) => m.section === "top")

	return (
		<>
			{/* ── Fridge landing ─────────────────────────────────────────────── */}
			<div id="home" className="fridge-page" onClick={handleClose}>
				<div className={`fridge-wrapper ${isPanelOpen ? "fridge-shifted" : ""}`}>

					<div className="fridge-img-container" onClick={(e) => e.stopPropagation()}>
						<div className="fridge-top-wrap">
							<Magnets
								magnets={topMagnets}
								activeMagnet={activeMagnet}
								draggingId={draggingId}
								magnetImages={MAGNET_IMAGES}
								magnetPositions={magnetPositions}
								onPointerDown={handleMagnetPointerDown}
								onPointerMove={handleMagnetPointerMove}
								onPointerUp={handleMagnetPointerUp}
							/>
						</div>

						<div className="fridge-bottom-section">
							<div className="fridge-interior-layer">
								<img src={FRIDGE_OPEN} alt="Fridge interior" draggable={false} />
								{activeItem && (
									<div className="fridge-shelf-item" data-item={activeItem.id} onClick={handleFridgeClick}>
										{ITEM_IMAGES[activeItem.id] && (
											<img src={ITEM_IMAGES[activeItem.id]} alt={activeItem.name} className="fridge-item-img" draggable={false} />
										)}
									</div>
								)}
							</div>

							<div
								className={`fridge-door-3d ${fridgeOpen ? "fridge-door-open" : ""}`}
								onClick={handleFridgeClick}
								role="button"
								tabIndex={0}
								aria-label={fridgeOpen ? "Close fridge" : "Open fridge"}
								onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleFridgeClick(e as unknown as React.MouseEvent) }}
							>
								<div className="fridge-door-face fridge-door-front">
									<Magnets
										magnets={doorMagnets}
										activeMagnet={activeMagnet}
										draggingId={draggingId}
										magnetImages={MAGNET_IMAGES}
										magnetPositions={magnetPositions}
										onPointerDown={handleMagnetPointerDown}
										onPointerMove={handleMagnetPointerMove}
										onPointerUp={handleMagnetPointerUp}
									/>
								</div>
								<div className="fridge-door-face fridge-door-back">
									<img src={FRIDGE_INSIDE_DOOR} alt="Inside door" draggable={false} />
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="fridge-container">
					<div className={`fridge-intro ${isPanelOpen || fridgeOpen ? "fridge-intro-hidden" : ""}`}>
						<span className="fridge-intro-heading">{t("fridge.intro")}</span>
						<p className="fridge-intro-body">{t("fridge.introSub")}</p>
						<p className="fridge-intro-body">{t("fridge.introSub2")}</p>
					</div>
				</div>

				<div className={`fridge-panel ${isPanelOpen && panelReady ? "fridge-panel-visible" : ""}`}>
					{panelContent && (
						<>
							{panelContent.image && (
								<img src={panelContent.image} alt={panelContent.title} className="fridge-panel-img" draggable={false} />
							)}
							<span className="fridge-panel-category">{panelContent.category}</span>
							<h2 className="fridge-panel-title">{panelContent.title}</h2>
							<p className="fridge-panel-description">{panelContent.description}</p>
						</>
					)}
				</div>
			</div>

			{/* ── About ──────────────────────────────────────────────────────── */}
			<section id="about" className="home-about">
				<div className="container-site" data-waterfall>
					<span className="home-about-overline reveal-item">{t("navigation.about_tab")}</span>
					<h2 className="home-about-headline reveal-item">
						{t("home.about.headline0")}<br /><em>{t("home.about.headline1")}</em><br />{t("home.about.headline2")}
					</h2>
					<div className="home-about-grid">
						<div className="home-about-photo-slot reveal-item">
							<img src={desuPhoto1} alt="Desu Imudia" draggable={false} className={activePhoto === 0 ? "photo-active" : ""} />
							<img src={desuPhoto2} alt="Desu Imudia" draggable={false} className={activePhoto === 1 ? "photo-active" : ""} />
						</div>
						<div className="home-about-text-col">
							<p className="home-about-body reveal-item">{t("home.about.bio0")}</p>
							<p className="home-about-body reveal-item">
								At work, I'm a <span className="home-about-highlight-olive">product manager</span> with <span className="home-about-highlight-olive">engineering roots</span>, which means I ask a lot of "how does this actually work" questions and care deeply about building things that aren't just impressive, but usable. I spend most of my time turning complex systems into products people can navigate without thinking twice.
							</p>
							<p className="home-about-body reveal-item">
								Right now, that looks like working on <span className="home-about-highlight-gold">generative AI</span> at enterprise scale, helping shape how people interact with intelligent systems in real workflows.
							</p>
							<p className="home-about-body reveal-item">
								Outside of that, I'm a self-appointed <span className="home-about-highlight-crimson">queen of side quests</span>. I <span className="home-about-highlight-crimson">travel</span> a lot, care deeply about <span className="home-about-highlight-crimson">film</span> and storytelling, and somehow ended up very invested in <span className="home-about-highlight-crimson">motorsport</span>. I like things that feel a little chaotic but still intentional, which is probably how I approach both life and product.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* ── Experience / Resume ────────────────────────────────────────── */}
			<section id="experience" className="home-experience">
				<div className="container-site" data-waterfall>
					<div className="home-experience-header">
						<span className="home-experience-eyebrow reveal-item">{t("navigation.experience_tab")}</span>
						<h2 className="home-experience-title reveal-item">{t("home.experience.title0")}<br /><em>{t("home.experience.title1")}</em></h2>
					</div>
					<div className="home-experience-body">
						<div className="home-timeline">
							{workHistory.map((job, i) => (
								<div key={`${job.company}-${job.role}`} className="home-timeline-entry reveal-item">
									<div className="home-timeline-meta">
										<span className="home-timeline-period">{job.period}</span>
									</div>
									<div>
										<h3 className="home-timeline-company">{job.company}</h3>
										<p className="home-timeline-role">{job.role}</p>
										<p className="home-timeline-desc">{t(`home.work.${i}.description`, job.description)}</p>
									</div>
								</div>
							))}

							<div className="home-timeline-footnote reveal-item">
								<span className="home-timeline-footnote-label">{education[0].school} · <span style={{ color: "var(--mist)" }}>{education[0].period}</span></span>
								<span className="home-timeline-footnote-notes">{education[0].degree} · {education[0].field}</span>
								{/* <a href={profile.resumeUrl} download className="home-timeline-resume-link">↓ Download Resume</a> */}
							</div>
						</div>

						<div className="home-experience-photo reveal-item">
							<img src={desuPhotoExperience} alt="Desu Imudia" draggable={false} />
						</div>
					</div>
				</div>
			</section>

			{/* ── Contact ────────────────────────────────────────────────────── */}
			<section id="contact" className="home-contact">
				<div className="container-site" data-waterfall>
					<span className="home-about-overline">{t("navigation.contact_tab")}</span>
					<h2 className="home-contact-headline">{t("contact.title")}</h2>
					<div className="home-contact-body">
						<CopyEmail />
						<div className="home-contact-social reveal-item">
							{profile.social.map((s) => (
								<a
									key={s.platform}
									href={s.url}
									target="_blank"
									rel="noopener noreferrer"
									className="home-contact-social-link"
								>
									<span className="home-contact-social-platform">{s.platform}</span>
									<span className="home-contact-social-handle">{s.handle}</span>
								</a>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	)
}

function CopyEmail() {
	const [copied, setCopied] = useState(false)
	const copy = () => {
		navigator.clipboard.writeText(profile.email).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		})
	}
	return (
		<button
			type="button"
			onClick={copy}
			className="home-contact-email"
		>
			<span className="home-contact-email-address">{profile.email}</span>
			<span className="home-contact-email-hint">{copied ? "Copied ✓" : "Copy"}</span>
		</button>
	)
}

/* ─── Magnets ──────────────────────────────────────────────────────────────── */

function Magnets({
	magnets: items,
	activeMagnet,
	draggingId,
	magnetImages,
	magnetPositions,
	onPointerDown,
	onPointerMove,
	onPointerUp,
}: {
	magnets: FridgeMagnet[]
	activeMagnet: FridgeMagnet | null
	draggingId: string | null
	magnetImages: Record<string, string>
	magnetPositions: Record<string, MagnetPos>
	onPointerDown: (e: React.PointerEvent, m: FridgeMagnet) => void
	onPointerMove: (e: React.PointerEvent, m: FridgeMagnet) => void
	onPointerUp: (e: React.PointerEvent, m: FridgeMagnet) => void
}) {
	return (
		<>
			{items.map((magnet) => {
				const pos = magnetPositions[magnet.id] ?? magnet.position
				const isDragging = draggingId === magnet.id
				return (
					<button
						key={magnet.id}
						type="button"
						className={[
							"fridge-magnet-btn",
							`fridge-magnet-${magnet.size}`,
							magnet.hasPanel ? "fridge-magnet-clickable" : "",
							activeMagnet?.id === magnet.id ? "fridge-magnet-active" : "",
							isDragging ? "fridge-magnet-dragging" : "",
						].join(" ")}
						style={{
							top: pos.top,
							left: pos.left,
							"--r": `${magnet.rotate ?? 0}deg`,
						} as React.CSSProperties}
						onPointerDown={(e) => onPointerDown(e, magnet)}
						onPointerMove={(e) => onPointerMove(e, magnet)}
						onPointerUp={(e) => onPointerUp(e, magnet)}
						onClick={(e) => e.stopPropagation()}
						aria-label={magnet.title}
					>
						{magnetImages[magnet.id] && (
							<img src={magnetImages[magnet.id]} alt={magnet.title} className="fridge-magnet-img" draggable={false} />
						)}
					</button>
				)
			})}
		</>
	)
}
