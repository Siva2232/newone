import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { useProducts } from "../Context/ProductContext";

const whatsappNumber = "9746683778";

const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.088" />
  </svg>
);

const categories = ["All", "Frames", "Albums", "Photo Books"];

export default function ProductsShop() {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getInternalCategory = (displayCat) => {
    switch (displayCat) {
      case "Frames": return "frames";
      case "Albums": return "albums";
      case "Photo Books": return "books";
      default: return "";
    }
  };

  const getDisplayCategory = (internalCat) => {
    switch (internalCat) {
      case "frames": return "Frames";
      case "albums": return "Albums";
      case "books": return "Photo Books";
      default: return internalCat || "Product";
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getDisplayCategory(product.category).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === getInternalCategory(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const whatsappMessage = (product) => encodeURIComponent(
    `Hi! I'm interested in the ${product.name} priced at ₹${product.price}. Category: ${getDisplayCategory(product.category)}\nCan you provide more details, customization options, and availability?`
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Banner */}
      <section 
        className="relative h-64 md:h-80 lg:h-96 w-full bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80')` }}
      >
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg">
            Capture Your Memories
          </h1>
          <p className="text-base md:text-xl text-white max-w-2xl">
            Premium frames, albums, and photo books crafted to preserve your moments forever.
          </p>
        </div>
      </section>

      {/* Title */}
      <section className="py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-3">Our Product Collection</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover handcrafted frames, personalized albums, and elegant photo books.
          </p>
        </div>
      </section>

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 bg-white z-40 shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-3.5 rounded-full border border-gray-300 focus:border-amber-500 focus:outline-none focus:ring-4 focus:ring-amber-200 transition-all text-base shadow-sm"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 shadow-sm flex-shrink-0 ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-black ring-4 ring-amber-200"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid - Compact on Mobile */}
      <section className="py-6 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No products match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group block">
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Compact Image - Fixed Aspect Ratio */}
                    <div className="aspect-[3/4] relative overflow-hidden bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    {/* Compact Card Content */}
                    <div className="p-3 md:p-5 text-center">
                      <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-2 bg-amber-100 text-amber-800">
                        {getDisplayCategory(product.category)}
                      </span>
                      <h3 className="font-bold text-sm md:text-base mb-1 line-clamp-2 min-h-[2.5em]">
                        {product.name}
                      </h3>
                      <p className="text-lg md:text-2xl font-bold text-amber-600 mb-3 md:mb-4">
                        ₹{product.price}
                      </p>

                      <a
                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage(product)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center justify-center w-full gap-2 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 md:py-3 rounded-full transition text-xs md:text-sm shadow-md"
                      >
                        <WhatsAppIcon size={16} className="md:hidden" />
                        <WhatsAppIcon size={18} className="hidden md:block" />
                        <span>Order Now</span>
                      </a>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-amber-600 to-amber-700 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Bring Your Memories to Life</h2>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Message us today to customize your perfect frame, album, or photo book.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi! I want to inquire about your frames, albums, and photo books. Can we discuss options?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-black hover:bg-gray-900 text-white px-8 py-4 md:px-10 md:py-5 text-base md:text-lg font-bold rounded-full shadow-2xl transition"
          >
            <WhatsAppIcon size={28} className="md:hidden" />
            <WhatsAppIcon size={32} className="hidden md:block" />
            <span>Start Custom Order</span>
          </a>
        </div>
      </section>

      {/* Floating WhatsApp Button - Mobile Only */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi! I saw your products and want to place an order.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition transform hover:scale-110 md:hidden"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon size={32} />
      </a>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}