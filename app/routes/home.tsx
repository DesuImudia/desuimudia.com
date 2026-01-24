import type { JSX } from "react"
import { useTranslation } from "react-i18next"
import { href } from "react-router"
import desuIcon from "../assets/desu_icon_transparent.png"
import HewittBuildersLogo from "~/components/nav/HewittBuildersLogo"
import SubSection from "~/components/sub-section/sub-section"
import { TypographyListContent, TypographyP } from "~/components/typography/typography-h2"
import { Button } from "~/components/ui/button"
import { Link } from "~/library/link"

export function meta() {
	const { t } = useTranslation()
	return [{ title: t("pageTitle") }, { name: "description", content: t("pageDescription") }]
}

const valuesListItem = (valueTitle: string, valueDescription: string): JSX.Element => {
	return (
		<div key={valueDescription}>
			<p className="text-lg leading-8 [&:not(:first-child)]:mt-6">
				<span className="font-semibold text-lg italic">{valueTitle}</span>
				{valueDescription}
			</p>
		</div>
	)
}

export default function Index() {
	const { t } = useTranslation()
	const purposeTitle = t("purposeTitle")
	const purposeDescription = t("purposeDescription")
	const purposeContent = TypographyP(purposeDescription)

	const valuesTitle = t("valuesTitle")
	const valuesKeys = [
		{ title: t("valuesStewardship.title"), description: t("valuesStewardship.description") },
		{ title: t("valuesIntegrity.title"), description: t("valuesIntegrity.description") },
		{ title: t("valuesQuality.title"), description: t("valuesQuality.description") },
	]
	const valuesContent: JSX.Element[] = valuesKeys.map((valueskey) => {
		return valuesListItem(valueskey.title, valueskey.description)
	})

	const linkToContactUs = href("/contact")
	return (
		<div className="flex flex-col">
{/* HERO: full viewport */}
      <section className="min-h-screen w-full">
				<div className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
					<img
						src={desuIcon}
						alt="Desu Imudia"
						className="w-full max-w-3xl h-[400px] object-cover object-center"
					/>

          {/* Tagline UNDER the title image */}
					{TypographyP(t("pageTagline"))}

          {/* Buttons */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            {/* Option 1: Scroll down to your sections
            <Button size={"lg"} onClick={scrollToContent}>
              Explore
            </Button> */}

            {/* Option 2: Go to contact page (keep this if you want a separate contact page) */}
            <Button asChild size={"lg"} variant={"outline"}>
              <Link to={linkToContactUs}>Contact</Link>
            </Button>
          </div>

          {/* Optional little hint
          <button
            type="button"
            onClick={scrollToContent}
            className="mt-10 text-sm font-medium text-white/80 hover:text-white"
          >
            Scroll for more
          </button> */}
        </div>
      </section>

			{/* <HewittBuildersLogo className="w-full max-w-[400px] self-center pt-6 pb-8" /> */}
      <div id="below-fold" className="scroll-mt-16">
			<SubSection title={purposeTitle} content={purposeContent} />
			<SubSection title={valuesTitle} content={TypographyListContent(valuesContent)} />

			<div className="flex justify-center pt-8">
				<Button asChild size={"lg"}>
					<Link to={linkToContactUs}>{t("navigation.contact_tab")}</Link>
				</Button>
			</div>
			</div>
		</div>
	)
}
