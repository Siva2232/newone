// src/pages/CustomBook.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, X, ChevronRight, Star, Camera, BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

// WhatsApp business number
const whatsappNumber = "9746683778";

// Inline WhatsApp SVG
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.088" />
  </svg>
);

const bookTypes = [
  "Wedding Album",
  "Family Memory Book",
  "Baby Album",
  "Travel Photo Book",
  "Anniversary Edition",
  "Year in Review",
  "Custom Theme (Specify in message)",
];

// Example gallery images (premium photo book examples)
const exampleImages = [
  "https://www.nationsphotolab.com/cdn/shop/files/1040w_Lay-flat-Books.jpg?v=1762355793",
  "https://www.pikperfect.com/assets/images/towebp/3.1_professional_wedding_album/professional-wedding-album.jpg",
  "https://www.printique.com/wp-content/uploads/2023/09/2G1A0761-min-scaled.jpg",
  "https://media-api.xogrp.com/images/5b5654ea-7e5a-474d-8b41-425f4ec91f5f",
  "https://ideas.shutterfly.com/wp-content/uploads/2017/04/wedding-photo-books-1-scaled.jpg",
];

export default function CustomBook() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bookType, setBookType] = useState(bookTypes[0]);
  const [pages, setPages] = useState("40");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selected = Array.from(e.dataTransfer.files);
      if (files.length + selected.length > 50) {
        alert("Maximum 50 images allowed.");
        return;
      }
      setFiles([...files, ...selected]);
      const newPreviews = selected.map((file) => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    if (files.length + selected.length > 50) {
      alert("Maximum 50 images allowed.");
      return;
    }
    setFiles([...files, ...selected]);
    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    URL.revokeObjectURL(previews[index]);
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const submitEnquiry = () => {
    if (!name.trim() || !phone.trim() || files.length < 5) {
      alert("Please fill required fields (name, phone) and upload at least 5 images.");
      return;
    }

    setIsSubmitting(true);

    const text = encodeURIComponent(
      `Hi StudioMemories! ✨\n\nI'd like to create a custom photo book.\n\n` +
      `👤 Name: ${name}\n` +
      `📱 Phone: ${phone}\n` +
      `${email.trim() ? `📧 Email: ${email}\n` : ""}` +
      `📖 Book Type: ${bookType}\n` +
      `📄 Pages: ${pages}\n` +
      `🖼️ Images: ${files.length}\n\n` +
      `💬 Message: ${message.trim() || "No additional requests"}\n\n` +
      `I'll attach the photos now. Excited for your quote & design ideas! 🌟`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");

    setTimeout(() => {
      // Cleanup
      setName("");
      setPhone("");
      setEmail("");
      setBookType(bookTypes[0]);
      setPages("40");
      setMessage("");
      setFiles([]);
      previews.forEach((url) => URL.revokeObjectURL(url));
      setPreviews([]);
      setIsSubmitting(false);
    }, 3000);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      previews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previews]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
     

      {/* Hero with Premium Background */}
      <section className="relative h-96 md:h-[600px] overflow-hidden">
        <img
          src="https://www.pikperfect.com/assets/images/towebp/3.1_professional_wedding_album/professional-wedding-album.jpg"
          alt="Premium custom photo book"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-6 text-white">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-black mb-6 max-w-4xl"
            >
              Design Your Dream Photo Book
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl mb-10 max-w-3xl"
            >
              Premium layflat pages • Handcrafted covers • Professional design help • Starting ₹599
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-6"
            >
              <div className="flex items-center gap-3 text-lg">
                <Sparkles className="text-amber-400" size={32} />
                <span>Luxury Materials</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <BookOpen className="text-amber-400" size={32} />
                <span>Panoramic Spreads</span>
              </div>
              <div className="flex items-center gap-3 text-lg">
                <Camera className="text-amber-400" size={32} />
                <span>Expert Layout</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Example Gallery */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12">See Our Premium Quality</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {exampleImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <img src={img} alt={`Example ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl md:text-4xl font-black text-center mb-16"
          >
            Start Your Custom Book Journey
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="space-y-8">
              <div>
                <label className="block text-lg font-bold mb-3 text-gray-800">Your Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition text-lg"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-lg font-bold mb-3 text-gray-800">WhatsApp Number *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition text-lg"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label className="block text-lg font-bold mb-3 text-gray-800">Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition text-lg"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-lg font-bold mb-3 text-gray-800">Book Style</label>
                <select
                  value={bookType}
                  onChange={(e) => setBookType(e.target.value)}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition text-lg"
                >
                  {bookTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold mb-3 text-gray-800">Page Count</label>
                <select
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition text-lg"
                >
                  <option>20 pages</option>
                  <option>40 pages</option>
                  <option>60 pages</option>
                  <option>80 pages</option>
                  <option>100+ pages</option>
                </select>
              </div>

              <div>
                <label className="block text-lg font-bold mb-3 text-gray-800">Special Requests</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full py-4 px-6 rounded-2xl border-2 border-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 transition text-lg resize-none"
                  placeholder="Theme ideas, cover material, text to include..."
                />
              </div>
            </div>

            {/* Upload Area */}
            <div>
              <label className="block text-lg font-bold mb-6 text-gray-800">
                Upload Photos <span className="text-amber-600">(Min 10 recommended)</span>
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-4 border-dashed rounded-3xl p-12 text-center transition-all ${
                  dragActive ? "border-amber-500 bg-amber-50" : "border-gray-300 bg-gray-50"
                }`}
              >
                <Upload size={64} className="mx-auto text-gray-400 mb-6" />
                <p className="text-xl font-bold mb-4">Drop images here or click to browse</p>
                <p className="text-gray-600 mb-8">JPG, PNG • Up to 50 images</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFiles}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-block px-10 py-5 bg-amber-600 text-black font-bold rounded-full cursor-pointer hover:bg-amber-500 transition text-lg shadow-xl"
                >
                  Select Photos
                </label>
              </div>

              {previews.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-10"
                >
                  <p className="text-xl font-bold mb-6 text-center">
                    {previews.length} photos ready ✨
                  </p>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-2xl">
                    {previews.map((preview, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="relative group"
                      >
                        <img
                          src={preview}
                          alt={`Upload ${i + 1}`}
                          className="w-full aspect-square object-cover rounded-xl shadow-md"
                        />
                        <button
                          onClick={() => removeImage(i)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                        >
                          <X size={18} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center mt-16">
            <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg">
              We'll open WhatsApp with your details. Attach the photos there — our designers will create mockups & quote within 24 hours!
            </p>
            <button
              onClick={submitEnquiry}
              disabled={isSubmitting}
              className="inline-flex items-center gap-5 bg-green-600 hover:bg-green-700 text-white font-black text-xl px-16 py-6 rounded-full transition shadow-2xl disabled:opacity-60"
            >
              <WhatsAppIcon size={40} />
              <span>{isSubmitting ? "Opening WhatsApp..." : "Send Enquiry Now"}</span>
              <ChevronRight size={36} />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-amber-600 via-orange-600 to-rose-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-8">
            Your Story Deserves the Best
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90">
            Premium handcrafted photo books • Archival quality • Lifetime treasure
          </p>
          <button
            onClick={submitEnquiry}
            className="inline-flex items-center gap-5 bg-white text-black px-16 py-6 rounded-full text-xl font-black hover:bg-gray-100 transition shadow-2xl"
          >
            <Sparkles size={36} />
            Create My Book Today
          </button>
        </div>
      </section>
    </div>
  );
}