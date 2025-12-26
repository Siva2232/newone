import Container from "../components/common/Container";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import hhhh from '../assets/hhhh.jpg';

export default function Footer() {
  const socials = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Linkedin, href: "#" },
  ];

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Products", href: "/models" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ];

  // High-quality, carefully selected fashion images matching each title
  const works = [
    {
      title: "Editorial Noir",
      image: "https://images.pexels.com/photos/33142583/pexels-photo-33142583.jpeg?auto=compress&cs=tinysrgb&w=2070",
      href: "/portfolio/editorial-noir",
    },
    {
      title: "Golden Hour",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      href: "/portfolio/golden-hour",
    },
    {
      title: "Runway Edge",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2070",
      href: "/portfolio/runway-edge",
    },
    {
      title: "Avant Garde",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      href: "/portfolio/avant-garde",
    },
    {
      title: "Studio Minimal",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      href: "/portfolio/studio-minimal",
    },
    {
      title: "Beauty Focus",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      href: "/portfolio/beauty-focus",
    },
  ];

  const companyName = "PERFECT DIGITAL PRESS";
  const letters = Array.from(companyName);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 160,
      },
    },
  };

  return (
    <footer className="relative bg-[#0A0A0A] text-white overflow-hidden">
      <Container className="relative z-10 pt-12 pb-12 md:pt-16 md:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
          {/* BRAND + LOGO */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 mx-auto lg:mx-0 bg-yellow-500/20 backdrop-blur-md rounded-3xl border-2 border-yellow-500/50 flex items-center justify-center shadow-2xl overflow-hidden"
            >
              <img
                src={hhhh}
                alt="Perfect Digital Press Logo"
                className="w-[85%] h-[85%] object-contain"
              />
            </motion.div>

            <div className="text-center lg:text-left">
              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                A high-fashion creative collective shaping bold narratives in fashion, beauty, and visual culture.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start gap-4 md:gap-5">
              {socials.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="group w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/15 flex items-center justify-center hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 shadow-lg"
                >
                  <social.icon className="w-5 h-5 text-gray-200 group-hover:text-yellow-400 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* RECENT WORK */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-4"
          >
            <h3 className="text-xs tracking-widest text-yellow-500 uppercase mb-4 font-medium text-center lg:text-left">
              Recent Work
            </h3>

            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {works.map((work, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.08 }}
                  className="group aspect-square rounded-xl overflow-hidden relative cursor-pointer"
                >
                  <img
                    src={work.image}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-medium text-gray-100 group-hover:text-yellow-400 transition-colors duration-300 z-10">
                    {work.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NAV + CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-3 space-y-8"
          >
            <div>
              <h3 className="text-xs tracking-widest text-yellow-500 uppercase mb-4 font-medium text-center lg:text-left">
                Navigation
              </h3>
              <ul className="space-y-3 text-center lg:text-left">
                {links.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <a
                      href={link.href}
                      className="group flex items-center justify-center lg:justify-start text-base text-gray-300 hover:text-yellow-400 transition-all duration-300"
                    >
                      {link.label}
                      <ArrowUpRight className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 text-yellow-400 transition-all duration-300" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 text-gray-300 text-center lg:text-left">
              <h3 className="text-xs tracking-widest text-yellow-500 uppercase mb-3 font-medium">
                Contact
              </h3>

              <a href="mailto:hello@perfectdigitalpress.com" className="flex items-center justify-center lg:justify-start gap-3 hover:text-yellow-400 transition">
                <Mail className="w-5 h-5 text-yellow-500" />
                hello@perfectdigitalpress.com
              </a>

              <a href="tel:+15559876543" className="flex items-center justify-center lg:justify-start gap-3 hover:text-yellow-400 transition">
                <Phone className="w-5 h-5 text-yellow-500" />
                +1 (555) 987-6543
              </a>

              <p className="flex items-start justify-center lg:justify-start gap-3 leading-relaxed">
                <MapPin className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <span>
                  123 Creative District<br />
                  Los Angeles, CA 90013
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 px-4">
          <p>© {new Date().getFullYear()} Perfect Digital Press. All Rights Reserved.</p>

          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="hover:text-yellow-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400 transition">Cookie Policy</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}