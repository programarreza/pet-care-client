"use client";

import emailjs from "@emailjs/browser";
import { Button } from "@nextui-org/button";
import { useRef, useState } from "react";
import { toast } from "sonner";

const ContactUsPage = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) {
      console.error("Form reference is null.");
      return;
    }

    setLoading(true);

    try {
      const result = await emailjs.sendForm(
        "service_w1bwd28",
        "template_whgfeza",
        form.current,
        "r47p78wRwpxxE4GAT"
      );
      console.log(result.text);
      toast.success(
        "Thanks for contacting us! We will get back to you shortly."
      );
      form.current.reset();
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-[#101214] rounded-lg px-4 py-24 text-center "
      id="contact"
    >
      <h2 className="text-white text-3xl mb-6">Contact for support</h2>

      {/* Contact Form */}
      <div className="p-6 rounded-lg shadow-2xl ">
        <form ref={form} onSubmit={sendEmail}>
          <div className="grid gap-5 w-full text-center">
            <input
              required
              className="p-2 rounded-lg py-3 text-white bg-black"
              type="text"
              name="user_name"
              placeholder="Name"
              aria-label="Your Name"
            />
            <input
              required
              className="p-2 rounded-lg py-3 text-white bg-black"
              type="email"
              name="user_email"
              placeholder="Email"
              aria-label="Your Email"
            />
          </div>
          <input
            required
            className="p-2 rounded-lg w-full mt-4 py-3 text-white bg-black"
            type="text"
            name="user_subject"
            placeholder="Subject"
            aria-label="Subject"
          />
          <textarea
            className="w-full my-4 py-3 px-4 rounded-lg text-white bg-black"
            name="message"
            placeholder="Your Message"
            aria-label="Your Message"
            required
          />
          <Button
            className="btn flex py-3 text-white bg-black hover:bg-gray-800"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
