import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import usePageTitle from "../hooks/usePageTitle";
import PageHeader from "./ui/PageHeader";
import Button from "./ui/Button";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.email({ message: "Enter a valid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

const Contact = () => {
  usePageTitle("Contact");
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = () => {
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        <PageHeader title="Contact Us" />

        <div className="mx-auto max-w-lg">
          {submitted && (
            <div
              className="mb-6 rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800"
              role="status"
            >
              Thank you for reaching out! We&apos;ll get back to you soon.
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            noValidate
          >
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="name"
                {...register("name")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
              {errors.name?.message && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
              {errors.email?.message && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                {...register("message")}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              />
              {errors.message?.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
