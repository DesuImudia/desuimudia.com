import { IconBrandInstagram, IconMail, IconPhone } from "@tabler/icons-react"
import type { JSX } from "react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

const PhoneLink = () => {
	const [isMobile, setIsMobile] = useState(false)
	const [copied, setCopied] = useState(false)
	const phoneNumber = "(336) 740-1003"
	const rawPhoneNumber = "3367401003"

	useEffect(() => {
		setIsMobile(/Mobi|Android/i.test(navigator.userAgent))
	}, [])

	const handleDesktopClick = () => {
		navigator.clipboard.writeText(phoneNumber).then(() => {
			setCopied(true)
			setTimeout(() => setCopied(false), 2000) // Reset after 2 seconds
		})
	}

	if (isMobile) {
		return (
			<a href={`tel:${rawPhoneNumber}`} className="flex items-center space-x-2 text-lg leading-7 hover:underline">
				<IconPhone size={24} />
				<span>{phoneNumber}</span>
			</a>
		)
	}

	return (
		<button
			type="button"
			onClick={handleDesktopClick}
			className="flex items-center space-x-2 text-lg leading-7 hover:underline"
		>
			<IconPhone size={24} />
			<span>{copied ? "Copied!" : phoneNumber}</span>
		</button>
	)
}

const ContactUsPage = (): JSX.Element => {
	const { t } = useTranslation()
	return (
		<div className="flex flex-grow flex-col items-center justify-center">
			<h1 className="my-8 font-bold text-4xl">{t("contact.title")}</h1>
			<div className="mx-auto flex max-w-md flex-col items-center">
				<div>
					<PhoneLink />
				</div>

				<a
					href="mailto:desuimudia@gmail.com"
					className="mt-6 flex items-center space-x-2 text-lg leading-7 hover:underline"
				>
					<IconMail size={24} />
					<span>desuimudia@gmail.com</span>
				</a>

				<a
					href="https://www.instagram.com/desuimudia"
					target="_blank"
					rel="noopener noreferrer"
					className="mt-6 flex items-center space-x-2 text-lg leading-7 hover:underline"
				>
					<IconBrandInstagram size={24} />
					<span>desuimudia</span>
				</a>
			</div>
		</div>
	)
}

export default ContactUsPage
