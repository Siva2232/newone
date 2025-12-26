// src/pages/AdminPanel.jsx
import { useState } from "react";
import { useProducts } from "../Context/ProductContext";

export default function AdminPanel() {
  const { products, addProduct, deleteProduct } = useProducts();
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "frames",
    image: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    addProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image || "https://via.placeholder.com/400x400?text=No+Image",
    });
    setForm({ name: "", price: "", category: "frames", image: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10">Admin Panel - Manage Products</h1>

        {/* Add Product Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6">Add New Product</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <input
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <input
              type="number"
              placeholder="Price (₹)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="frames">Frames</option>
              <option value="albums">Albums</option>
              <option value="books">Photo Books</option>
              <option value="accessories">Accessories</option>
            </select>
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>
          <button
            onClick={handleAdd}
            className="mt-6 bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Add Product
          </button>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Current Products ({products.length}) - Live on Homepage</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4">Preview</th>
                  <th className="text-left py-4">Name</th>
                  <th className="text-left py-4">Price</th>
                  <th className="text-left py-4">Category</th>
                  <th className="text-left py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">
                      <img src={product.image} alt="" className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="py-4 font-medium">{product.name}</td>
                    <td className="py-4">₹{product.price}</td>
                    <td className="py-4 capitalize">{product.category}</td>
                    <td className="py-4">
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}