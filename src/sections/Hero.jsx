// src/pages/Hero.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
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
  { name: "Frames", icon: "https://media.istockphoto.com/id/917220700/vector/picture-frame-graphic-black-white-isolated-sketch-set-illustration-vector.jpg?s=612x612&w=0&k=20&c=LQLiD1y6nH_IIuM58L4fAi0G5s6_T3Y2X1Vr9hlolQc=" },
  { name: "Albums", icon: "https://elements-resized.envatousercontent.com/elements-preview-images/ae696328-61f7-4597-ba72-d44020ef3c21?w=632&cf_fit=scale-down&q=85&format=auto&s=33319081f69b2f09bfca18cbfd1d35d8fa8f3a71963f2210d57f1d671790d2cb" },
  { name: "Photo Books", icon: "https://www.shutterstock.com/image-vector/book-icons-set-different-styles-260nw-2424484843.jpg" },
  { name: "Accessories", icon: "https://media.istockphoto.com/id/1346911303/vector/vector-set-of-image-flat-icons-contains-icons-photo-vector-image-print-gallery-images.jpg?s=612x612&w=0&k=20&c=HCzZAs1hdbN9Kr9-rlx6o5KadlJ4_XqRM626C2n_108=" },
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
              <p className="text-2xl font-bold">₹{product.price}</p>
            </div>
          </div>
        </div>
        <div className="p-5 text-center flex flex-col flex-grow">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-bold uppercase tracking-wider rounded-full mb-2">
            {getDisplayCategory(product.category)}
          </span>
          <h3 className="text-base font-bold mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-center mb-3">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="ml-1 text-xs text-gray-600">(4.8)</span>
          </div>
          <p className="text-xl font-bold text-amber-600 mb-4 mt-auto">₹{product.price}</p>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center w-full gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-full transition text-sm shadow-md"
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
        <p className="text-3xl md:text-5xl font-black text-amber-400 mb-3">{offer.highlight}</p>
        <p className="text-base md:text-xl mb-6 opacity-90">{offer.description}</p>
        <button className="px-6 py-3 md:px-8 md:py-4 bg-amber-600 text-black font-bold rounded-full hover:bg-amber-500 transition shadow-xl text-sm md:text-base">
          Shop Now →
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
          <Link to="/shop" className="text-amber-600 font-bold text-base md:text-lg">See All →</Link>
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

// SpecialOffersCarousel.jsx


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

    const speed = 1; // pixels per frame
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
      {/* soft background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl" />

      <div className="relative w-full">
        {/* Heading */}
        <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-14 text-center">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Limited Time <span className="text-orange-500">Offers</span>
          </h2>
          <p className="mt-2 text-gray-600 text-lg md:text-xl">
            Hand-picked deals you shouldn’t miss
          </p>
        </div>

        {/* Carousel */}
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

          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-xl p-3 rounded-full hover:scale-105 transition opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur shadow-xl p-3 rounded-full hover:scale-105 transition opacity-0 group-hover:opacity-100 z-20"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};


export default function Hero() {
  const { products } = useProducts();
  const [slideIndex, setSlideIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % offerSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const frames = products.filter((p) => p.category === "frames");
  const albums = products.filter((p) => p.category === "albums");
  const books = products.filter((p) => p.category === "books");
  const trendingProducts = [...products].sort(() => Math.random() - 0.5).slice(0, 12);
  const bestSellers = [...products].sort((a, b) => b.price - a.price).slice(0, 12);

  return (
    <div className="bg-gray-50">
      {/* Compact Header */}
<header className=" top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-md">
  <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-center">
    
    {/* Search bar */}
    <div className="w-full max-w-md relative mt-[10px]">
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
      />
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
    </div>
  </div>
</header>

      {/* Compact Hero Banner Slider */}
   <section className="relative h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
  <AnimatePresence mode="wait">
    <motion.div
      key={slideIndex}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 w-full h-full"
    >
      {/* Properly fitted image */}
      <img
        src={offerSlides[slideIndex].image}
        alt={offerSlides[slideIndex].title}
        className="w-full h-full object-cover object-center"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex items-center">
        <div className="px-4 sm:px-8 md:px-12 max-w-xl text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 leading-snug">
            {offerSlides[slideIndex].title}
          </h2>
          <p className="text-sm md:text-lg mb-4 text-gray-100">
            {offerSlides[slideIndex].description}
          </p>
          <Link
            to="/shop"
            className="inline-block px-6 py-3 rounded-full bg-amber-600 text-black text-sm md:text-base font-bold hover:bg-amber-500 transition shadow-xl"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>

  {/* Left Arrow */}
  <button
    onClick={() =>
      setSlideIndex((prev) => (prev - 1 + offerSlides.length) % offerSlides.length)
    }
    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2.5 sm:p-3 rounded-full hover:bg-white transition shadow-md z-20"
  >
    <ChevronLeft size={20} />
  </button>

  {/* Right Arrow */}
  <button
    onClick={() =>
      setSlideIndex((prev) => (prev + 1) % offerSlides.length)
    }
    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2.5 sm:p-3 rounded-full hover:bg-white transition shadow-md z-20"
  >
    <ChevronRight size={20} />
  </button>
</section>


      {/* Special Offers Banner Carousel */}
      <SpecialOffersCarousel />

      {/* Compact Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <motion.div
              key={cat.name}
              whileHover={{ scale: 1.08, y: -6 }}
              className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={cat.icon}
                alt={cat.name}
                className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 object-contain"
              />
              <h3 className="text-lg md:text-xl font-bold">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dynamic Content */}
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
          <CarouselSection title="Best Sellers" products={bestSellers} />
          <CarouselSection title="Top Frames" products={frames} />
          <CarouselSection title="Premium Albums" products={albums} />
          <CarouselSection title="Photo Books" products={books} />
        </>
      )}
    </div>
  );
}