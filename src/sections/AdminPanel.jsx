// src/pages/AdminPanel.jsx
import { useState, useRef } from "react";
import { useProducts } from "../Context/ProductContext";
import { 
  Package, 
  Image, 
  Grid3X3, 
  TrendingUp, 
  Menu,
  X,
  Upload,
  Trash2
} from "lucide-react";

export default function AdminPanel() {
  const {
    products,
    addProduct,
    deleteProduct,

    heroBanners,
    setHeroBanners,

    shopCategories,
    setShopCategories,

    trendingProductIds,
    bestSellerProductIds,
    toggleTrending,
    toggleBestSeller,
  } = useProducts();

  // Form states
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "frames",
    image: "",
    imagePreview: "",
  });

  const [bannerForm, setBannerForm] = useState({
    title: "",
    description: "",
    image: "",
    imagePreview: "",
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    image: "",
    link: "",
    imagePreview: "",
  });

  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Refs for file inputs
  const productFileRef = useRef(null);
  const bannerFileRef = useRef(null);
  const categoryFileRef = useRef(null);

  // Image upload handler
  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;

      if (type === "product") {
        setProductForm({ ...productForm, image: base64, imagePreview: base64 });
      } else if (type === "banner") {
        setBannerForm({ ...bannerForm, image: base64, imagePreview: base64 });
      } else if (type === "category") {
        setCategoryForm({ ...categoryForm, image: base64, imagePreview: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  // Handlers
  const handleAddProduct = () => {
    if (!productForm.name || !productForm.price || !productForm.image) {
      alert("Name, Price, and Image are required!");
      return;
    }

    addProduct({
      name: productForm.name,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : null,
      category: productForm.category,
      image: productForm.image,
    });

    setProductForm({ name: "", price: "", originalPrice: "", category: "frames", image: "", imagePreview: "" });
    if (productFileRef.current) productFileRef.current.value = "";
  };

  const handleAddBanner = () => {
    if (!bannerForm.title || !bannerForm.image) {
      alert("Title and Image are required!");
      return;
    }

    setHeroBanners([
      ...heroBanners,
      {
        id: Date.now(),
        title: bannerForm.title,
        description: bannerForm.description || "",
        image: bannerForm.image,
      },
    ]);

    setBannerForm({ title: "", description: "", image: "", imagePreview: "" });
    if (bannerFileRef.current) bannerFileRef.current.value = "";
  };

  const handleAddCategory = () => {
    if (!categoryForm.name || !categoryForm.image) {
      alert("Name and Image are required!");
      return;
    }

    setShopCategories([
      ...shopCategories,
      {
        id: Date.now(),
        name: categoryForm.name,
        image: categoryForm.image,
        link: categoryForm.link || `/category/${categoryForm.name.toLowerCase().replace(/\s+/g, "-")}`,
      },
    ]);

    setCategoryForm({ name: "", image: "", link: "", imagePreview: "" });
    if (categoryFileRef.current) categoryFileRef.current.value = "";
  };

  const deleteBanner = (id) => {
    if (window.confirm("Delete this banner slide?")) {
      setHeroBanners(heroBanners.filter((b) => b.id !== id));
    }
  };

  const deleteCategory = (id) => {
    if (window.confirm("Delete this category card?")) {
      setShopCategories(shopCategories.filter((c) => c.id !== id));
    }
  };

  const menuItems = [
    { id: "products", label: "Products", icon: Package, count: products.length },
    { id: "banners", label: "Top Banners", icon: Image, count: heroBanners.length },
    { id: "categories", label: "Shop Categories", icon: Grid3X3, count: shopCategories.length },
    { id: "featured", label: "Featured Sections", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl mb-2 transition-all ${
                  activeTab === item.id
                    ? "bg-amber-500 text-white shadow-lg"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <item.icon size={20} />
                <span className="font-semibold">{item.label}</span>
                {item.count !== undefined && (
                  <span className="ml-auto bg-white/20 px-2 py-1 rounded-full text-xs font-bold">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 bg-white shadow-md p-4 flex items-center justify-between z-40">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu size={28} />
          </button>
          <h2 className="text-xl font-bold capitalize">{activeTab.replace("-", " ")}</h2>
          <div className="w-10" />
        </div>

        <div className="p-6 md:p-10 max-w-6xl mx-auto">
          <h1 className="hidden md:block text-4xl font-black text-gray-900 mb-8">
            {menuItems.find(i => i.id === activeTab)?.label}
          </h1>

          {/* === PRODUCTS TAB === */}
          {activeTab === "products" && (
            <div className="space-y-12">
              {/* Add Product */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Add New Product</h2>

                {/* Image Upload Preview */}
                {productForm.imagePreview && (
                  <div className="mb-6">
                    <img src={productForm.imagePreview} alt="Preview" className="w-48 h-48 object-cover rounded-xl shadow-lg" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="number"
                    placeholder="Price ₹"
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                  <input
                    type="number"
                    placeholder="Original Price (optional)"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:border-amber-500"
                  />
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="px-5 py-4 border border-gray-300 rounded-xl focus:outline-none"
                  >
                    <option value="frames">Frames</option>
                    <option value="albums">Albums</option>
                    <option value="books">Photo Books</option>
                    <option value="accessories">Accessories</option>
                  </select>

                  {/* Image Upload */}
                  <div className="relative">
                    <input
                      ref={productFileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "product")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="px-5 py-4 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center gap-3 hover:border-amber-500 transition">
                      <Upload size={20} />
                      <span className="text-gray-600">Upload Product Image</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddProduct}
                  className="mt-8 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl transition shadow-lg flex items-center gap-3"
                >
                  <Package size={20} />
                  Add Product
                </button>
              </div>

              {/* Product List */}
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">All Products ({products.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <div key={p.id} className="border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                      <img src={p.image} alt={p.name} className="w-full h-48 object-cover" />
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                        <p className="text-2xl font-black text-amber-600">
                          ₹{p.price}
                          {p.originalPrice && <span className="ml-2 text-sm line-through text-gray-400">₹{p.originalPrice}</span>}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 capitalize">{p.category}</p>
                        <button
                          onClick={() => window.confirm("Delete product?") && deleteProduct(p.id)}
                          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* === BANNERS TAB === */}
          {activeTab === "banners" && (
            <div className="space-y-12">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold mb-8">Add New Banner Slide</h2>

                {bannerForm.imagePreview && (
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-xl">
                    <img src={bannerForm.imagePreview} alt="Banner preview" className="w-full h-64 object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <input
                    placeholder="Banner Title"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                    className="px-5 py-4 border rounded-xl"
                  />
                  <input
                    placeholder="Description (optional)"
                    value={bannerForm.description}
                    onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                    className="px-5 py-4 border rounded-xl"
                  />
                  <div className="relative">
                    <input
                      ref={bannerFileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "banner")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="px-5 py-4 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center gap-3 hover:border-blue-500 transition">
                      <Upload size={20} />
                      <span>Upload Banner Image</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddBanner}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-xl transition shadow-lg"
                >
                  Add Banner
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {heroBanners.map((banner) => (
                  <div key={banner.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img src={banner.image} alt={banner.title} className="w-full h-72 object-cover" />
                    <div className="p-6">
                      <h3 className="font-bold text-xl">{banner.title}</h3>
                      <p className="text-gray-600 mt-2">{banner.description || "No description"}</p>
                      <button
                        onClick={() => deleteBanner(banner.id)}
                        className="mt-6 text-red-600 hover:text-red-800 font-bold flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Remove Banner
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === CATEGORIES TAB === */}
          {activeTab === "categories" && (
            <div className="space-y-12">
              <div className="bg-white rounded-3xl shadow-2xl p-8">
                <h2 className="text-2xl font-bold mb-8">Add Shop by Category Card</h2>

                {categoryForm.imagePreview && (
                  <div className="mb-6 rounded-2xl overflow-hidden shadow-xl">
                    <img src={categoryForm.imagePreview} alt="Category preview" className="w-full h-64 object-cover" />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <input
                    placeholder="Category Name"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className="px-5 py-4 border rounded-xl"
                  />
                  <input
                    placeholder="Link (optional)"
                    value={categoryForm.link}
                    onChange={(e) => setCategoryForm({ ...categoryForm, link: e.target.value })}
                    className="px-5 py-4 border rounded-xl"
                  />
                  <div className="relative">
                    <input
                      ref={categoryFileRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "category")}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="px-5 py-4 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center gap-3 hover:border-purple-500 transition">
                      <Upload size={20} />
                      <span>Upload Category Image</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddCategory}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-xl transition shadow-lg"
                >
                  Add Category
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {shopCategories.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-64 object-cover" />
                    <div className="p-6 text-center">
                      <h3 className="font-bold text-lg">{cat.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">{cat.link}</p>
                      <button
                        onClick={() => deleteCategory(cat.id)}
                        className="mt-4 text-red-600 hover:text-red-800 font-bold flex items-center justify-center gap-2"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* === FEATURED TAB === */}
          {activeTab === "featured" && (
            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold mb-10 text-center">Manage Featured Products</h2>

              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-amber-600">
                    Trending Now ({trendingProductIds.length} selected)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className={`border-4 rounded-2xl p-4 text-center transition-all ${
                          trendingProductIds.includes(p.id)
                            ? "border-amber-500 bg-amber-50 shadow-xl"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                        <p className="font-semibold text-sm line-clamp-2">{p.name}</p>
                        <button
                          onClick={() => toggleTrending(p.id)}
                          className={`mt-3 w-full py-2 rounded-lg font-bold text-sm transition ${
                            trendingProductIds.includes(p.id)
                              ? "bg-amber-600 text-white hover:bg-amber-700"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {trendingProductIds.includes(p.id) ? "Remove" : "Add to Trending"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-6 text-green-600">
                    Best Sellers ({bestSellerProductIds.length} selected)
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {products.map((p) => (
                      <div
                        key={p.id}
                        className={`border-4 rounded-2xl p-4 text-center transition-all ${
                          bestSellerProductIds.includes(p.id)
                            ? "border-green-500 bg-green-50 shadow-xl"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <img src={p.image} alt={p.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                        <p className="font-semibold text-sm line-clamp-2">{p.name}</p>
                        <button
                          onClick={() => toggleBestSeller(p.id)}
                          className={`mt-3 w-full py-2 rounded-lg font-bold text-sm transition ${
                            bestSellerProductIds.includes(p.id)
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                        >
                          {bestSellerProductIds.includes(p.id) ? "Remove" : "Add to Best Sellers"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}