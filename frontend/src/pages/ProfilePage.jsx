// FILE: src/pages/ProfilePage.jsx
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaHistory,
  FaMapMarkerAlt,
  FaBox,
  FaStore,
  FaEdit,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("orders"); // 'orders' or 'products'

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <div className="overflow-hidden bg-white rounded-lg shadow-md">
        {/* Header */}
        <div className="p-6 text-white bg-gradient-to-r from-emerald-600 to-teal-500">
          <h1 className="text-2xl font-bold">Account Overview</h1>
        </div>

        {/* Tabs Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex-1 py-3 font-medium text-center transition-colors ${
              activeTab === "orders"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            <div className="flex items-center justify-center">
              <FaHistory className="mr-2" />
              My Orders
            </div>
          </button>
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 py-3 font-medium text-center transition-colors ${
              activeTab === "products"
                ? "text-emerald-600 border-b-2 border-emerald-600"
                : "text-gray-500 hover:text-emerald-500"
            }`}
          >
            <div className="flex items-center justify-center">
              <FaStore className="mr-2" />
              My Products
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Account Info (always visible) */}
          <div className="p-4 mb-6 border rounded-lg">
            <h2 className="flex items-center mb-4 text-lg font-semibold">
              <FaUser className="mr-2 text-emerald-600" />
              Account Details
            </h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {userInfo.name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {userInfo.email}
              </p>
              <Link
                to="/profile/edit"
                className="inline-flex items-center mt-2 text-sm text-emerald-600 hover:underline"
              >
                <FaEdit className="mr-1" /> Edit Profile
              </Link>
            </div>
          </div>

          {/* Orders Tab Content */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h2 className="flex items-center mb-4 text-lg font-semibold">
                  <FaHistory className="mr-2 text-emerald-600" />
                  Recent Orders
                </h2>
                <p className="mb-4 text-gray-600">
                  View and manage your orders
                </p>
                <Link
                  to="/orders"
                  className="flex items-center px-4 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700 w-fit"
                >
                  View Order History <FaHistory className="ml-2" />
                </Link>
              </div>

              {/* Saved Addresses (if any) */}
              {userInfo.addresses?.length > 0 && (
                <div className="p-4 border rounded-lg">
                  <h2 className="flex items-center mb-4 text-lg font-semibold">
                    <FaMapMarkerAlt className="mr-2 text-emerald-600" />
                    Saved Addresses
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {userInfo.addresses.map((address, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="font-medium">{address.name}</p>
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p>{address.country}</p>
                        <p className="mt-2">Phone: {address.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Products Tab Content */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="p-4 border rounded-lg">
                <h2 className="flex items-center mb-4 text-lg font-semibold">
                  <FaStore className="mr-2 text-emerald-600" />
                  Product Management
                </h2>
                <p className="mb-4 text-gray-600">
                  Manage your products and listings
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  <Link
                    // to="/products/my-products"
                    to="/cart"
                    className="p-4 transition-colors border rounded-lg hover:bg-emerald-50"
                  >
                    <h3 className="flex items-center font-medium text-emerald-700">
                      <FaBox className="mr-2" />
                      My Listed Products
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      View and edit your product listings
                    </p>
                  </Link>

                  {/* <Link 
                    to="/products/create" 
                    className="p-4 transition-colors border rounded-lg hover:bg-emerald-50"
                  >
                    <h3 className="flex items-center font-medium text-emerald-700">
                      <FaEdit className="mr-2" />
                      Create New Product
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Add a new product to your store
                    </p>
                  </Link> */}

                  <Link
                    to="/"
                    className="p-4 transition-colors border rounded-lg hover:bg-emerald-50"
                  >
                    <h3 className="flex items-center font-medium text-emerald-700">
                      <FaEdit className="mr-2" />
                      Search More Products
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      Browse our catalog to find what you need
                    </p>
                  </Link>
                </div>
              </div>

              {/* Product Statistics (example) */}
              <div className="p-4 border rounded-lg">
                <h2 className="flex items-center mb-4 text-lg font-semibold">
                  <FaStore className="mr-2 text-emerald-600" />
                  Product Statistics
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="p-3 text-center rounded-lg bg-emerald-50">
                    <p className="text-2xl font-bold text-emerald-700">12</p>
                    <p className="text-sm text-gray-600">Active Listings</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-emerald-50">
                    <p className="text-2xl font-bold text-emerald-700">24</p>
                    <p className="text-sm text-gray-600">Total Sales</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-emerald-50">
                    <p className="text-2xl font-bold text-emerald-700">4.8</p>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
