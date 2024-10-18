"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Plus, Minus } from "lucide-react";

export default function ContactPage() {
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
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData);
    // Reset form after submission
    setFormData({ name: "", email: "", message: "" });
    alert("Thank you for your message. We will get back to you soon!");
  };

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "What age group does Antura Kiristina serve?",
      answer: "We primarily serve teenagers between the ages of 13 and 19.",
    },
    {
      question: "How can I volunteer with Antura Kiristina?",
      answer:
        "Visit our Volunteer page to learn about opportunities and fill out an application.",
    },
    {
      question: "Are your events open to non-members?",
      answer:
        "Most of our events are open to all teens. Some special events may require registration.",
    },
    {
      question: "How can I support Antura Kiristina financially?",
      answer:
        "You can make a donation through our website or contact us for other giving options.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Contact Header */}
        <section className="bg-primary text-primary-foreground pt-20 py-16">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl mb-8">We&apos;d love to hear from you!</p>
          </div>
        </section>

        {/* Contact Information and Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>Addis Ababa, Ethiopia</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>(+251) 123-4567</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>info@anturakiristina.org</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-anturaGreen" />
                    <p>Monday - Friday: 9am - 5pm</p>
                  </div>
                </div>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="text-anturaGreen hover:text-primary"
                    >
                      Facebook
                    </Link>
                    <Link
                      href="#"
                      className="text-anturaGreen hover:text-primary"
                    >
                      Instagram
                    </Link>
                    <Link
                      href="#"
                      className="text-anturaGreen hover:text-primary"
                    >
                      Twitter
                    </Link>
                  </div>
                </div>
              </Card>

              {/* Contact Form */}
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-muted-foreground mb-1"
                    >
                      Name
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
                      Email
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
                      Message
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
                    Send Message
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
              Our Location
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
              Frequently Asked Questions
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

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Antura Kiristina. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
