"use client"

import { useForm } from "react-hook-form"
import { useLanguage } from "@/components/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowPathIcon } from "@heroicons/react/24/outline"

type Step2Data = {
  employmentStatus: string
  church: string
  serviceAreas: string
  otherServiceArea?: string
  socialMedia: string
  availabilityFrequency: string
}

type Step2Props = {
  onSubmit: (data: Step2Data) => void
  initialData: Partial<Step2Data>
  isSubmitting: boolean
}

export default function Step2Form({ onSubmit, initialData, isSubmitting }: Step2Props) {
  const { t } = useLanguage()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Step2Data>({
    defaultValues: initialData,
  })

  const renderAsterisk = () => (
    <span className="text-red-500" aria-hidden="true">
      *
    </span>
  )

  const serviceAreas = watch("serviceAreas")

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>{t("volunteerRegistration.step2Title")}</CardTitle>
        <CardDescription>{t("volunteerRegistration.step2Description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employmentStatus">
                {t("volunteerForm.employmentStatus")} {renderAsterisk()}
              </Label>
              <Select
                onValueChange={(value) =>
                  register("employmentStatus").onChange({ target: { name: "employmentStatus", value } })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t("volunteerForm.selectEmploymentStatus")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">{t("volunteerForm.employmentStatuses.employed")}</SelectItem>
                  <SelectItem value="unemployed">{t("volunteerForm.employmentStatuses.unemployed")}</SelectItem>
                  <SelectItem value="student">{t("volunteerForm.employmentStatuses.student")}</SelectItem>
                  <SelectItem value="retired">{t("volunteerForm.employmentStatuses.retired")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.employmentStatus && (
                <span className="text-red-500 text-sm">{errors.employmentStatus.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="church">
                {t("volunteerForm.church")} {renderAsterisk()}
              </Label>
              <Input id="church" {...register("church", { required: t("form.required") })} className="mt-1" />
              {errors.church && <span className="text-red-500 text-sm">{errors.church.message}</span>}
            </div>
            <div>
              <Label htmlFor="socialMedia">{t("volunteerForm.socialMedia")}</Label>
              <Input id="socialMedia" {...register("socialMedia")} className="mt-1" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>
                {t("volunteerForm.serviceAreasQuestion")} {renderAsterisk()}
              </Label>
              <RadioGroup
                defaultValue={serviceAreas}
                onValueChange={(value) => {
                  register("serviceAreas").onChange({ target: { name: "serviceAreas", value } })
                }}
                className="mt-2 space-y-2"
              >
                {["Teaching", "Counseling", "Coordinating", "AssignedPlace", "Other"].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <RadioGroupItem value={area} id={area} />
                    <Label htmlFor={area}>{t(`volunteerForm.serviceAreas.${area}`)}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.serviceAreas && <span className="text-red-500 text-sm">{t("form.required")}</span>}

              {serviceAreas === "other" && (
                <div className="mt-2">
                  <Input
                    id="otherServiceArea"
                    {...register("otherServiceArea", { required: serviceAreas === "other" })}
                    className="mt-1"
                  />
                  {errors.otherServiceArea && <span className="text-red-500 text-sm">{t("form.required")}</span>}
                </div>
              )}
            </div>

            <div>
              <Label>
                {t("volunteerForm.availabilityFrequencyQuestion")} {renderAsterisk()}
              </Label>
              <RadioGroup
                {...register("availabilityFrequency", { required: t("form.required") })}
                className="mt-2 space-y-2"
              >
                {["onceAWeek", "twiceAWeek", "asNeeded"].map((frequency) => (
                  <div key={frequency} className="flex items-center space-x-2">
                    <RadioGroupItem value={frequency} id={frequency} />
                    <Label htmlFor={frequency}>{t(`volunteerForm.availabilityFrequency.${frequency}`)}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.availabilityFrequency && (
                <span className="text-red-500 text-sm">{errors.availabilityFrequency.message}</span>
              )}
            </div>
          </div>
          <div className="w-full flex items-end justify-end">
            <Button type="submit" className="bg-anturaGreen w-40 hover:bg-anturaGreen" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <ArrowPathIcon className="h-5 w-5 animate-spin text-white" />
                </div>
              ) : (
                t("volunteerForm.submit")
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

