"use client"

import { useForm } from "react-hook-form"
import { useLanguage } from "@/components/LanguageContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Step1Data = {
  fullName: string
  age: number
  address: string
  phoneNumber: string
  email: string
  residentialAddress: string
  educationLevel: string
}

type Step1Props = {
  onSubmit: (data: Step1Data) => void
  initialData: Partial<Step1Data>
}

export default function Step1Form({ onSubmit, initialData }: Step1Props) {
  const { t } = useLanguage()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step1Data>({
    defaultValues: initialData,
  })

  const renderAsterisk = () => (
    <span className="text-red-500" aria-hidden="true">
      *
    </span>
  )

  return (
    <Card className="w-full max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>{t("volunteerRegistration.step1Title")}</CardTitle>
        <CardDescription>{t("volunteerRegistration.step1Description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">
                {t("volunteerForm.fullName")} {renderAsterisk()}
              </Label>
              <Input id="fullName" {...register("fullName", { required: t("form.required") })} className="mt-1" />
              {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName.message}</span>}
            </div>
            <div>
              <Label htmlFor="age">
                {t("volunteerForm.age")} {renderAsterisk()}
              </Label>
              <Input
                id="age"
                type="number"
                {...register("age", {
                  required: t("form.required"),
                  min: { value: 18, message: t("volunteerForm.ageError") },
                  max: { value: 99, message: t("volunteerForm.ageError") },
                })}
                className="mt-1"
              />
              {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}
            </div>
            <div>
              <Label htmlFor="address">
                {t("volunteerForm.address")} {renderAsterisk()}
              </Label>
              <Input id="address" {...register("address", { required: t("form.required") })} className="mt-1" />
              {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
            </div>
            <div>
              <Label htmlFor="phoneNumber">
                {t("form.phoneNumber")} {renderAsterisk()}
              </Label>
              <Input id="phoneNumber" {...register("phoneNumber", { required: t("form.required") })} className="mt-1" />
              {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
            </div>
            <div>
              <Label htmlFor="email">
                {t("volunteerForm.email")} {renderAsterisk()}
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: t("form.required"),
                  pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: t("form.invalidEmail") },
                })}
                className="mt-1"
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div>
              <Label htmlFor="residentialAddress">
                {t("volunteerForm.residentialAddress")} {renderAsterisk()}
              </Label>
              <Input
                id="residentialAddress"
                {...register("residentialAddress", { required: t("form.required") })}
                className="mt-1"
              />
              {errors.residentialAddress && (
                <span className="text-red-500 text-sm">{errors.residentialAddress.message}</span>
              )}
            </div>
            <div>
              <Label htmlFor="educationLevel">
                {t("volunteerForm.educationLevel")} {renderAsterisk()}
              </Label>
              <Select
                onValueChange={(value) =>
                  register("educationLevel").onChange({ target: { name: "educationLevel", value } })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={t("volunteerForm.selectEducationLevel")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="highSchool">{t("volunteerForm.educationLevels.highSchool")}</SelectItem>
                  <SelectItem value="bachelors">{t("volunteerForm.educationLevels.bachelors")}</SelectItem>
                  <SelectItem value="masters">{t("volunteerForm.educationLevels.masters")}</SelectItem>
                  <SelectItem value="phd">{t("volunteerForm.educationLevels.phd")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.educationLevel && <span className="text-red-500 text-sm">{errors.educationLevel.message}</span>}
            </div>
          </div>
          <div className="w-full flex items-end justify-end">
            <Button type="submit" className="bg-anturaGreen w-40 hover:bg-anturaGreen">
              {t("volunteerForm.nextStep")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

