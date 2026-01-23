import type { JSX } from "react"
import { useTranslation } from "react-i18next"
import { TypographyH2 } from "../components/typography/typography-h2"

export function meta() {
    const { t } = useTranslation()
    return [{ title: t("resume.pageTitle") }, { name: "description", content: t("resume.pageDescription") }]
}

const ResumePage = (): JSX.Element => {
    const { t } = useTranslation()

    return (
        <div className="mx-auto max-w-3xl">
            {/* Education Section */}
            <section className="mb-12">
                <TypographyH2>{t("resume.educationTitle")}</TypographyH2>
                <div className="mt-6 space-y-4">
                    <div>
                        <h3 className="font-semibold">{t("resume.columbiaUniversity")}</h3>
                        <p className="text-sm text-muted-foreground">{t("resume.columbiaLocation")}</p>
                        <p className="mt-2">{t("resume.columbiaDegree")}</p>
                        <p className="text-sm">{t("resume.columbiaSpecialization")}</p>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="mb-12">
                <TypographyH2>{t("resume.experienceTitle")}</TypographyH2>
                <div className="mt-6 space-y-8">
                    {/* BlackRock - Current */}
                    <div>
                        <h3 className="font-semibold">{t("resume.blackRock")}</h3>
                        <p className="text-sm text-muted-foreground">{t("resume.blackRockLocation")}</p>

                        <div className="ml-4 mt-4 space-y-4">
                            <div>
                                <p className="font-medium">{t("resume.blackRockAPM")}</p>
                                <p className="text-sm text-muted-foreground">{t("resume.blackRockAPMDates")}</p>
                            </div>

                            <div>
                                <p className="font-medium">{t("resume.blackRockSEA")}</p>
                                <p className="text-sm text-muted-foreground">{t("resume.blackRockSEADates")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Columbia Teaching Assistant */}
                    <div>
                        <h3 className="font-semibold">{t("resume.columbiaDept")}</h3>
                        <p className="text-sm text-muted-foreground">{t("resume.columbiaDeptLocation")}</p>

                        <div className="ml-4 mt-4">
                            <p className="font-medium">{t("resume.teachingAssistant")}</p>
                            <p className="text-sm text-muted-foreground">{t("resume.teachingAssistantDates")}</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ResumePage