"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailServiceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID || "";
    const emailTemplateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID || "";
    const emailPublicKey = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY || "";

    emailjs
      .send(
        emailServiceId,
        emailTemplateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        emailPublicKey
      )
      .then(() => {
        alert(t("contact.form.submitSuccess"));
        setFormData({ name: "", email: "", message: "" }); // Reset form after success
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert(t("contact.form.submitError"));
      });
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: t("contact.faq.question1"),
      answer: t("contact.faq.answer1"),
    },
    {
      question: t("contact.faq.question2"),
      answer: t("contact.faq.answer2"),
    },
    {
      question: t("contact.faq.question3"),
      answer: t("contact.faq.answer3"),
    },
    {
      question: t("contact.faq.question4"),
      answer: t("contact.faq.answer4"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Contact Header */}
        <section className="bg-primary text-primary-foreground pt-28 pb-16 h-80">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-xl mb-8">{t("contact.subtitle")}</p>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {t("contact.getInTouch")}
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>{t("contact.address")}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>{t("contact.phone")}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>akscenter57@gmail.com</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>{t("contact.hours")}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {t("contact.followUs")}
                  </h3>
                  <div className="flex space-x-4">
                    <Link
                      href="https://facebook.com/aksc57"
                      className="text-anturaGreen hover:text-primary"
                      target="_blank"
                    >
                      <FaFacebookSquare className="h-6 w-6" />
                      <span className="sr-only">Follow us on Facebook</span>
                    </Link>
                    <Link
                      href="https://instagram.com/aksc_57"
                      className="text-anturaGreen hover:text-primary"
                      target="_blank"
                    >
                      <FaInstagramSquare className="h-6 w-6" />
                      <span className="sr-only">Follow us on Instagram</span>
                    </Link>
                    <Link
                      href="https://www.youtube.com/@anturakiristina2848"
                      className="text-anturaGreen hover:text-primary"
                      target="_blank"
                    >
                      <FaYoutubeSquare className="h-6 w-6" />
                      <span className="sr-only">
                        Subscribe to our YouTube channel
                      </span>
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Contact Form */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  {t("contact.form.title")}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      {t("contact.form.name")}
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      {t("contact.form.email")}
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      {t("contact.form.message")}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-anturaGreen">
                    {t("contact.form.submit")}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t("contact.location")}
            </h2>
            <div className="relative w-full h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.660489988772!2d38.7071076151755!3d9.030624393489564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8590a9b070e3%3A0x872a648c36e0ad4e!2sAntura%20Kiristina%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1689282987034!5m2!1sen!2sus"
                width="100%"
                height="400"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="object-cover rounded-lg"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-8 text-center">
              {t("contact.faq.title")}
            </h2>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-4">
                  <button
                    className="flex justify-between items-center w-full text-left"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3 className="text-xl font-semibold">{faq.question}</h3>
                    {openQuestion === index ? (
                      <Minus className="h-5 w-5 text-anturaGreen" />
                    ) : (
                      <Plus className="h-5 w-5 text-anturaGreen" />
                    )}
                  </button>
                  {openQuestion === index && (
                    <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
