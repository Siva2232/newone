// src/pages/Hero.jsx
import { useState, useEffect, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useProducts } from "../Context/ProductContext";

// WhatsApp business number
const whatsappNumber = "9746683778";

// Inline WhatsApp SVG
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.884 3.088" />
  </svg>
);

const offerSlides = [
  {
    title: "Frames Starting at ₹49",
    description: "Premium wooden & metal frames for every memory",
    image: "https://img.freepik.com/free-photo/copy-space-frame-with-sale-label_23-2148670043.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    title: "Luxury Albums Up to 40% Off",
    description: "Handcrafted leather albums – timeless elegance",
    image: "https://static.vecteezy.com/system/resources/previews/002/104/115/non_2x/luxury-banner-roll-up-black-friday-sale-with-picture-slots-template-free-vector.jpg",
  },
  {
    title: "Custom Photo Books",
    description: "Personalized hardcover books from ₹599",
    image: "https://blog.lulu.com/content/images/thumbnail/lulu-create-photobooks-main-banner-open-graph.png",
  },
  {
    title: "Bundle & Save Big",
    description: "Frames + Albums + Books combos – extra 20% off",
    image: "https://media1.pbwwcdn.net/promotion_groups/pg-banner-910325559.jpeg",
  },
];

const specialOffers = [
  {
    title: "Hot Deal: Frames",
    highlight: "Starting ₹49",
    description: "Premium quality frames – limited time offer",
    image: "https://www.shutterstock.com/image-vector/sale-photo-frame-banner-square-260nw-2662612137.jpg",
  },
  {
    title: "Luxury Albums",
    highlight: "From ₹299",
    description: "Handcrafted genuine leather albums",
    image: "https://img.freepik.com/free-vector/elegant-aesthetic-luxury-jewelry-halfpage-banner-template_742173-17440.jpg",
  },
  {
    title: "Photo Books Sale",
    highlight: "Up to 30% Off",
    description: "Custom hardcover photo books",
    image: "https://cdn-image.staticsfly.com/i/landingpages/2025/SYECM1215_Dec_HP_YIR_3up_Photo-prints.jpg",
  },
  {
    title: "Bundle Offers",
    highlight: "Save Extra 20%",
    description: "Buy frames + albums together",
    image: "https://media1.pbwwcdn.net/promotion_groups/pg-banner-541289369.jpeg",
  },
  {
    title: "Limited Stock",
    highlight: "₹49 Only",
    description: "Classic wooden frames – grab now!",
    image: "https://www.shutterstock.com/image-vector/49-rupee-off-sale-discount-260nw-2142090367.jpg",
  },
];

const categories = [
  {
    name: "Wedding Albums",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=70&auto=format&fit=crop",
    link: "/category/wedding-albums",
  },
  {
    name: "Photo Frames",
    image:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=1200&q=70&auto=format&fit=crop",
    link: "/category/photo-frames",
  },
  {
    name: "Pre-Wedding Shoots",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=1200&q=70&auto=format&fit=crop",
    link: "/category/pre-wedding",
  },
  {
    name: "Portrait Albums",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=1200&q=70&auto=format&fit=crop",
    link: "/category/portraits",
  },
  {
    name: "Event Photography",
    image:
      "https://images.unsplash.com/photo-1515165562835-c3b8c55b5dd4?w=1200&q=70&auto=format&fit=crop",
    link: "/category/events",
  },
];

const getDisplayCategory = (cat) => {
  switch (cat) {
    case "frames": return "Frames";
    case "albums": return "Albums";
    case "books": return "Photo Books";
    default: return cat || "";
  }
};

const ProductCard = ({ product }) => { 
  const message = encodeURIComponent(
    `Hi! I'm interested in the ${product.name} priced at ₹${product.price}.
Category: ${getDisplayCategory(product.category)}
Can you provide more details, customization options, and confirm availability?`
  );

  return (
    <Link to={`/product/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 h-full flex flex-col">
        <div className="aspect-[3/4] relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
            <div className="text-white">
              <h3 className="text-lg font-bold">{product.name}</h3>
              <div className="flex items-center gap-2">
                {product.originalPrice && (
                  <p className="text-base line-through text-gray-300">₹{product.originalPrice}</p>
                )}
                <p className="text-2xl font-bold text-[#f7ef22]">₹{product.price}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 text-center flex flex-col flex-grow">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-bold uppercase tracking-wider rounded-full mb-2">
            {getDisplayCategory(product.category)}
          </span>
          <h3 className="text-base font-bold mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-center mb-3">
            <div className="flex text-[#f7ef22]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-600">(4.8)</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4 mt-auto">
            {product.originalPrice && (
              <p className="text-sm line-through text-gray-400">₹{product.originalPrice}</p>
            )}
            <p className="text-xl font-bold text-[black]">₹{product.price}</p>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center w-full gap-2 bg-[#f7ef22] hover:bg-amber-300 text-black font-bold py-3 rounded-full transition text-sm shadow-md"
          >
            <WhatsAppIcon size={20} />
            <span>Quick Order</span>
          </a>
        </div>
      </div>
    </Link>
  );
};

const OfferCard = ({ offer, index }) => (
  <div className="relative rounded-3xl overflow-hidden shadow-2xl h-48 md:h-64 lg:h-72">
    <img
      src={offer.image}
      alt={offer.title}
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex items-center">
      <div className="p-6 md:p-10 text-white">
        <h3 className="text-xl md:text-3xl font-bold mb-2">{offer.title}</h3>
<p className="text-3xl md:text-5xl font-black text-[#f7ef22] mb-3">{offer.highlight}</p>        <p className="text-base md:text-xl mb-6 opacity-90">{offer.description}</p>
      <button className="px-4 py-2 md:px-5 md:py-2.5 
                   bg-[#f7ef22] text-black font-bold 
                   rounded-full 
                   hover:bg-[#e0d81e] active:bg-[#d4cc1a]
                   transition-all duration-200 
                   shadow-lg border border-black/10
                   hover:shadow-xl hover:scale-105
                   text-xs md:text-sm
                   group">
  <span className="flex items-center justify-center gap-1.5">
    Shop Now 
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</button>
      </div>
    </div>
  </div>
);

const CarouselSection = ({ title, products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-black">{title}</h2>
          <a href="/models" className="font-bold text-base md:text-lg text-[black] hover:text-[#e6dd1f] transition-colors">See All →</a>
        </div>

        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 snap-x snap-mandatory scroll-smooth no-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
          >
            {products.map((product) => (
              <div key={product.id} className="flex-none w-64 md:w-72 snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {products.length > 4 && (
            <>
              <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-xl p-2 rounded-full transition hover:scale-105 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft size={15} />
              </button>

              <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 shadow-xl p-2 rounded-full transition hover:scale-105 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight size={15} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const SpecialOffersCarousel = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    cancelAnimationFrame(animationRef.current);

    scrollRef.current.scrollBy({
      left: direction === "left" ? -520 : 520,
      behavior: "smooth",
    });

    setTimeout(() => startAutoScroll(), 1000);
  };

  const startAutoScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const speed = 1;
    const step = () => {
      scrollContainer.scrollLeft += speed;
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
      animationRef.current = requestAnimationFrame(step);
    };
    animationRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    startAutoScroll();
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const duplicatedOffers = [...specialOffers, ...specialOffers];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 py-14 md:py-20">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />

      <div className="relative w-full">
        <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-14 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Limited Time <span className="text-orange-500">Offers</span>
          </h2>
          <p className="mt-2 text-gray-600 text-lg md:text-xl">
            Hand-picked deals you shouldn’t miss
          </p>
        </div>

        <div className="relative group">
          <div className="pointer-events-none absolute left-0 top-0 h-full w-28 bg-gradient-to-r from-amber-50 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-28 bg-gradient-to-l from-rose-50 to-transparent z-10" />

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-scroll scroll-smooth no-scrollbar whitespace-nowrap"
          >
            {duplicatedOffers.map((offer, i) => (
              <div key={i} className="flex-none w-[92%] md:w-[75%] lg:w-[65%]">
                <div className="transition-transform duration-500 hover:scale-[1.02]">
                  <OfferCard offer={offer} />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-xl p-3 rounded-full hover:scale-105 transition opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-xl p-3 rounded-full hover:scale-105 transition opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={() => scroll("left")}
            className="flex md:hidden absolute left-4 bottom-4 bg-white/90 shadow-xl p-3 rounded-full hover:scale-105 transition z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex md:hidden absolute right-4 bottom-4 bg-white/90 shadow-xl p-3 rounded-full hover:scale-105 transition z-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default function Hero() {
  const { products } = useProducts();
  const navigate = useNavigate();
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProducts = useMemo(
    () => products.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    ),
    [products, searchTerm]
  );

  // Show up to 8 suggestions in dropdown
  const suggestions = filteredProducts.slice(0, 8);

  // Ref and position for portal-rendered dropdown
  const searchContainerRef = useRef(null);
  const [dropdownStyle, setDropdownStyle] = useState({ left: 0, top: 0, width: "auto" });

  useEffect(() => {
    const updatePosition = () => {
      const el = searchContainerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setDropdownStyle({
        left: `${rect.left}px`,
        top: `${rect.bottom}px`,
        width: `${rect.width}px`,
      });
    };

    if (isDropdownOpen) updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isDropdownOpen, searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % offerSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const frames = products.filter((p) => p.category === "frames");
  const albums = products.filter((p) => p.category === "albums");
  const books = products.filter((p) => p.category === "books");
  const trendingProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    return [...products].sort(() => Math.random() - 0.5).slice(0, 12);
  }, [products]);
  const bestSellers = useMemo(() => {
    return [...products].sort((a, b) => b.price - a.price).slice(0, 12);
  }, [products]);

  return (
    <div className="bg-gray-50">
      {/* Your original compact header (unchanged structure) */}
     <header className="top-0 left-0 w-full z-50">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
    {/* Search bar with live suggestions dropdown */}
    <div ref={searchContainerRef} className="w-full max-w-md relative mt-[10px]">
      <input
        type="text"
        placeholder="Search products..."
        className="
          w-full 
          py-3 px-5 pr-12 
          rounded-full 
          border border-gray-300 
          focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 
          transition shadow-sm text-sm md:text-base
          bg-white/80
          backdrop-blur-sm
        "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={20} />

      {/* Live product suggestions dropdown */}
      {isDropdownOpen && searchTerm.trim().length >= 2 &&
        createPortal(
          <div
            className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            style={{ position: "fixed", left: dropdownStyle.left, top: dropdownStyle.top, width: dropdownStyle.width, zIndex: 99999 }}
          >
            <ul className="max-h-96 overflow-y-auto divide-y divide-gray-100">
              {suggestions.length === 0 ? (
                <li className="p-6 text-center text-gray-500">No products found</li>
              ) : (
                suggestions.map((product) => (
                  <li key={product.id} className="hover:bg-amber-50 transition-colors">
                    <div
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center gap-4 p-4 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 object-cover rounded-lg shadow-sm flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                            {getDisplayCategory(product.category)}
                          </span>
                          <span className="font-bold text-amber-600">₹{product.price}</span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              )}
              {filteredProducts.length > 8 && (
                <li className="p-4 text-center bg-gray-50">
                  <span className="text-amber-600 font-medium cursor-pointer hover:underline">
                    View all {filteredProducts.length} results →
                  </span>
                </li>
              )}
            </ul>
          </div>,
          document.body
        )
      }
    </div>
  </div>
</header>

      {/* FIXED: Removed overflow-hidden from hero section to prevent clipping dropdown */}
      <section className="relative h-44 sm:h-52 md:h-60 lg:h-72 mt-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full flex justify-center"
          >
            <div className="w-full max-w-6xl h-full relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={offerSlides[slideIndex].image}
                alt={offerSlides[slideIndex].title}
                className="w-full h-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex items-center px-6 sm:px-8 md:px-12">
                <div className="w-full text-white">
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black mb-2 leading-snug">
                    {offerSlides[slideIndex].title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base mb-4 text-gray-100">
                    {offerSlides[slideIndex].description}
                  </p>
                 <Link
  to="/shop"
  className="inline-block px-4 py-2 rounded-full 
             bg-[#f7ef22] text-black 
             text-xs md:text-sm font-bold 
             hover:bg-[#e0d81e] 
             active:bg-[#d4cc1a]
             transition-all duration-200 
             shadow-md border-2 border-black/10
             hover:shadow-lg hover:scale-105
             group"
>
  <span className="flex items-center justify-center gap-1.5">
    Shop Now 
    <span className="group-hover:translate-x-1 transition-transform">→</span>
  </span>
</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={() =>
            setSlideIndex((prev) => (prev - 1 + offerSlides.length) % offerSlides.length)
          }
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2.5 sm:p-3 rounded-full hover:bg-white transition shadow-md z-20"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() =>
            setSlideIndex((prev) => (prev + 1) % offerSlides.length)
          }
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2.5 sm:p-3 rounded-full hover:bg-white transition shadow-md z-20"
        >
          <ChevronRight size={20} />
        </button>
      </section>

      {/* Rest of the component remains 100% unchanged */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-20">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-extrabold text-center mb-14 tracking-tight"
        >
          Shop by Category
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="group block"
            >
              <div className="relative h-[240px] md:h-[320px] rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

                <div className="absolute bottom-5 left-5 right-5">
                  <div className="inline-block px-5 py-2 rounded-full bg-white text-black text-sm md:text-base font-bold shadow-md">
                    {cat.name}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {searchTerm ? (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-2xl md:text-3xl font-black text-center mb-10">
              Search Results {filteredProducts.length > 0 && `(${filteredProducts.length})`}
            </h2>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500 mb-6">No products found.</p>
                <button onClick={() => setSearchTerm("")} className="px-8 py-4 bg-amber-600 text-black font-bold rounded-full shadow-xl">
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <>
          <CarouselSection title="Trending Now" products={trendingProducts} />
          <SpecialOffersCarousel />
          <CarouselSection title="Best Sellers" products={bestSellers} />
        </>
      )}
    </div>
  );
}