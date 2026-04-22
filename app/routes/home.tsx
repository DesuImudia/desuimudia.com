import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { magnets, insideItems } from "~/data/fridge"
import type { FridgeMagnet, FridgeItem } from "~/data/fridge"
import { workHistory, education } from "~/data/experience"
import { profile } from "~/data/profile"
import desuPhoto1 from "~/assets/desuimudia-1.png"
import desuPhoto2 from "~/assets/desuimudia-2.png"
import desuPhotoExperience from "~/assets/desuimudia.png"
import { useScrollReveal, useWaterfallReveal } from "~/hooks/useScrollReveal"

export function meta() {
	return [
		{ title: "Desu Imudia" },
		{ name: "description", content: "Product Manager & Creative Technologist." },
	]
}

const MAGNET_IMAGES: Record<string, string> = {
	"calendar-2026":       "/fridge/magnets/calendar 2026.jpeg",
	"chilis":              "/fridge/magnets/chilis.png",
	"costa-rica":          "/fridge/magnets/costa-rica-sticker.png",
	"cowboy-boots":        "/fridge/magnets/cowboy-boots.png",
	"delroy-lindo":        "/fridge/magnets/delroy-lindo.jpeg",
	"desu-australia":      "/fridge/magnets/desu-in-austrailia.jpeg",
	"desu-racetrack":      "/fridge/magnets/desu-racetrack.jpeg",
	"desu-sports":         "/fridge/magnets/desu-sports.jpeg",
	"do-it-for-the-plot":  "/fridge/magnets/do-it-for-the-plot.jpeg",
	"f1-watch-party":      "/fridge/magnets/f1-watch-party.png",
	"fleabag":             "/fridge/magnets/fleabag-poster.jpeg",
	"friends-coffee-chat": "/fridge/magnets/friends-coffee-chat.jpeg",
	"good-times-tickets":  "/fridge/magnets/good-times-tickets.png",
	"guitar-pick":         "/fridge/magnets/guitar-pick.png",
	"iluvny-button":       "/fridge/magnets/iluvny-button.png",
	"march-note-to-self":  "/fridge/magnets/march-note-to-self.jpeg",
	"metrocard":           "/fridge/magnets/metrocard.png",
	"mockingjay-pin":      "/fridge/magnets/mockingjay-pin.png",
	"music-sheet":         "/fridge/magnets/music-sheet.jpeg",
	"nicole-kidman-amc":   "/fridge/magnets/nicole-kidman-amc.png",
	"parents":             "/fridge/magnets/parents.jpeg",
	"photo-booth":         "/fridge/magnets/photo-booth.png",
	"roomies":             "/fridge/magnets/roomies.jpeg",
}

const ITEM_IMAGES: Record<string, string> = {
	"f1-car":      "/fridge/inside/f1-car.png",
	"fries":       "/fridge/inside/fries.png",
	"luggage":     "/fridge/inside/luggage.png",
	"mango":       "/fridge/inside/mango.webp",
	"matcha":      "/fridge/inside/matcha.png",
	"sumo-orange": "/fridge/inside/sumo-orange.png",
}

const FRIDGE_FULL        = "/fridge/fridge-full-transparent.png"
const FRIDGE_INSIDE_DOOR = "/fridge/fridge-inside-door-open.png"
const FRIDGE_OPEN        = "/fridge/fridge-open.png"

export default function Home() {
	const { t } = useTranslation()
	const [activeMagnet, setActiveMagnet]   = useState<FridgeMagnet | null>(null)
	const [fridgeOpen, setFridgeOpen]       = useState(false)
	const [activeItem, setActiveItem]       = useState<FridgeItem | null>(null)
	const [panelReady, setPanelReady]       = useState(false)
	const [useRealFridge, setUseRealFridge] = useState(false)

	const isPanelOpen = activeMagnet !== null || (fridgeOpen && activeItem !== null)
	const [activePhoto, setActivePhoto] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => setActivePhoto((p) => (p === 0 ? 1 : 0)), 1000)
		return () => clearInterval(interval)
	}, [])

	/* Detect whether the real fridge images exist */
	useEffect(() => {
		const img = new Image()
		img.onload  = () => setUseRealFridge(true)
		img.onerror = () => setUseRealFridge(false)
		img.src = FRIDGE_FULL
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

	const handleMagnetClick = (e: React.MouseEvent, magnet: FridgeMagnet) => {
		e.stopPropagation()
		if (!magnet.hasPanel) return
		if (activeMagnet?.id === magnet.id) {
			setActiveMagnet(null)
		} else {
			setActiveMagnet(magnet)
			setFridgeOpen(false)
			setActiveItem(null)
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

					{useRealFridge ? (
						<div className="fridge-img-container" onClick={(e) => e.stopPropagation()}>
							<div className="fridge-top-wrap">
								<Magnets
									magnets={topMagnets}
									activeMagnet={activeMagnet}
									magnetImages={MAGNET_IMAGES}
									onMagnetClick={handleMagnetClick}
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
											magnetImages={MAGNET_IMAGES}
											onMagnetClick={handleMagnetClick}
										/>
									</div>
									<div className="fridge-door-face fridge-door-back">
										<img src={FRIDGE_INSIDE_DOOR} alt="Inside door" draggable={false} />
									</div>
								</div>
							</div>
						</div>

					) : (
						<div className="fridge-body" onClick={(e) => e.stopPropagation()}>
							<div className="fridge-freezer">
								<div className="fridge-handle" style={{ height: "52px" }} />
							</div>
							<div className="fridge-section-gap" />
							<div className="fridge-main">
								<div className={`fridge-interior ${fridgeOpen ? "fridge-interior-revealed" : ""}`}>
									<div className="fridge-interior-light" />
									{activeItem && fridgeOpen && (
										<div className="fridge-shelf-item" onClick={handleFridgeClick}>
											{ITEM_IMAGES[activeItem.id] && (
												<img src={ITEM_IMAGES[activeItem.id]} alt={activeItem.name} className="fridge-item-img" draggable={false} />
											)}
										</div>
									)}
									<div className="fridge-shelf" />
								</div>
								<div
									className={`fridge-door ${fridgeOpen ? "fridge-door-open" : ""}`}
									onClick={handleFridgeClick}
									role="button"
									tabIndex={0}
									aria-label={fridgeOpen ? "Close fridge" : "Open fridge"}
									onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") handleFridgeClick(e as unknown as React.MouseEvent)
									}}
								>
									<div className="fridge-handle" style={{ height: "72px" }} />
									<Magnets
										magnets={doorMagnets}
										activeMagnet={activeMagnet}
										magnetImages={MAGNET_IMAGES}
										onMagnetClick={handleMagnetClick}
									/>
								</div>
							</div>
						</div>
					)}
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
							{(["bio0", "bio1", "bio2", "bio3"] as const).map((key) => (
								<p key={key} className="home-about-body reveal-item">{t(`home.about.${key}`)}</p>
							))}
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
								<span className="home-timeline-footnote-label">{education[0].school} · {education[0].period}</span>
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
	magnetImages,
	onMagnetClick,
}: {
	magnets: FridgeMagnet[]
	activeMagnet: FridgeMagnet | null
	magnetImages: Record<string, string>
	onMagnetClick: (e: React.MouseEvent, m: FridgeMagnet) => void
}) {
	return (
		<>
			{items.map((magnet) => (
				<button
					key={magnet.id}
					type="button"
					className={[
						"fridge-magnet-btn",
						`fridge-magnet-${magnet.size}`,
						magnet.hasPanel ? "fridge-magnet-clickable" : "",
						activeMagnet?.id === magnet.id ? "fridge-magnet-active" : "",
					].join(" ")}
					style={{
						top: magnet.position.top,
						left: magnet.position.left,
						"--r": `${magnet.rotate ?? 0}deg`,
					} as React.CSSProperties}
					onClick={(e) => onMagnetClick(e, magnet)}
					aria-label={magnet.title}
				>
					{magnetImages[magnet.id] && (
						<img src={magnetImages[magnet.id]} alt={magnet.title} className="fridge-magnet-img" draggable={false} />
					)}
				</button>
			))}
		</>
	)
}
