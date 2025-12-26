import Container from "../components/common/Container";
import Button from "../components/common/Button";
import { MessageCircle, Globe, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="relative py-16 md:py-24 bg-gray-50">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-4xl mx-auto mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Get in <span className="text-[#f7ef22]">Touch</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Have a project or idea? Let’s discuss how we can bring it to life.
          </p>
        </motion.div>

        {/* Grid: Contact Form + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-white p-6 md:p-10 lg:p-12 rounded-2xl shadow-lg border border-gray-200">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-[#f7ef22]" />
                Send a Message
              </h3>
              <form className="space-y-4 md:space-y-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 md:px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7ef22] focus:outline-none transition"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 md:px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7ef22] focus:outline-none transition"
                />
                <textarea
                  rows={4}
                  placeholder="Your Message"
                  className="w-full px-4 md:px-5 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f7ef22] focus:outline-none transition resize-none"
                />
                <Button className="w-full py-3.5 md:py-4 rounded-lg bg-[#f7ef22] text-black font-bold hover:bg-[#f7ef22]/90 transition shadow-md text-base md:text-lg">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Quick Contact */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="flex flex-col gap-6 md:gap-8"
          >
            <div className="space-y-4 md:space-y-6">
              {[
                {
                  icon: Globe,
                  title: "Schedule a Call",
                  desc: "Book a 15-min discovery call instantly",
                },
                {
                  icon: Mail,
                  title: "Email Us",
                  desc: "hello@studio.com — replied within hours",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 md:p-5 bg-white rounded-xl border border-gray-200 hover:shadow-md transition cursor-pointer"
                >
                  <div className="p-3 rounded-lg bg-[#f7ef22] flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 md:w-6 md:h-6 text-black" />
                  </div>
                  <div>
                    <h4 className="text-base md:text-lg font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Fun Quote */}
            <div className="bg-gray-100 p-5 md:p-6 rounded-xl text-center">
              <p className="italic text-gray-700 text-sm md:text-base">"The best projects start with a simple hello."</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}