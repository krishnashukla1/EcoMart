// scripts/seedProducts.js
const mongoose = require('mongoose');
const Product = require('./models/Product'); // adjust path if needed

const MONGO_URI='mongodb+srv://krishna:Shukla8726@cluster0.kof2u.mongodb.net/amazon?retryWrites=true&w=majority'
async function seedProducts() {
  await mongoose.connect(MONGO_URI);

  const electronics = [
    { name: "iPhone 15 Pro", description: "Apple flagship smartphone", price: 1400, brand: "Apple", category: "Electronics", stock: 50, rating: 4.8, images: [] },
    { name: "Samsung Galaxy S24 Ultra", description: "High-end Samsung smartphone", price: 1300, brand: "Samsung", category: "Electronics", stock: 70, rating: 4.7, images: [] },
    { name: "OnePlus 13R", description: "Flagship killer smartphone", price: 900, brand: "OnePlus", category: "Electronics", stock: 100, rating: 4.6, images: [] },
    { name: "iQOO Neo 10", description: "Performance gaming phone", price: 600, brand: "iQOO", category: "Electronics", stock: 80, rating: 4.5, images: [] },
    { name: "Vivo V50", description: "Mid-range smartphone", price: 500, brand: "Vivo", category: "Electronics", stock: 90, rating: 4.4, images: [] },
    { name: "Laptop Pro 14", description: "High performance laptop with 14-inch display", price: 1250, brand: "TechBrand", category: "Electronics", stock: 1000, rating: 4.5, images: [] },
    { name: "MacBook Air M3", description: "Lightweight Apple laptop", price: 1500, brand: "Apple", category: "Electronics", stock: 60, rating: 4.8, images: [] },
    { name: "Sony WH-1000XM5", description: "Noise cancelling headphones", price: 400, brand: "Sony", category: "Electronics", stock: 150, rating: 4.9, images: [] },
    { name: "Canon EOS R10", description: "Mirrorless digital camera", price: 1000, brand: "Canon", category: "Electronics", stock: 40, rating: 4.7, images: [] },
    { name: "LG OLED 55-inch TV", description: "4K OLED Smart TV", price: 1800, brand: "LG", category: "Electronics", stock: 30, rating: 4.9, images: [] }
  ];

  const electric = [
    { name: "Electric Kettle", description: "1.5L stainless steel electric kettle", price: 25, brand: "Philips", category: "Electric", stock: 200, rating: 4.3, images: [] },
    { name: "Ceiling Fan", description: "1200mm energy-efficient ceiling fan", price: 35, brand: "Bajaj", category: "Electric", stock: 300, rating: 4.4, images: [] },
    { name: "Electric Iron", description: "Non-stick soleplate iron", price: 15, brand: "Philips", category: "Electric", stock: 250, rating: 4.2, images: [] },
    { name: "Induction Cooktop", description: "Touch control induction cooker", price: 50, brand: "Prestige", category: "Electric", stock: 100, rating: 4.3, images: [] },
    { name: "Mixer Grinder", description: "500W mixer grinder with jars", price: 45, brand: "Sujata", category: "Electric", stock: 120, rating: 4.5, images: [] },
    { name: "Air Purifier", description: "HEPA filter air purifier", price: 150, brand: "Mi", category: "Electric", stock: 80, rating: 4.6, images: [] },
    { name: "Electric Tandoor", description: "Portable electric tandoor for grilling", price: 60, brand: "Nova", category: "Electric", stock: 50, rating: 4.3, images: [] },
    { name: "Room Heater", description: "2000W portable room heater", price: 40, brand: "Orpat", category: "Electric", stock: 90, rating: 4.2, images: [] },
    { name: "Electric Blanket", description: "Soft heating blanket", price: 30, brand: "Sleepwell", category: "Electric", stock: 70, rating: 4.4, images: [] },
    { name: "Electric Toothbrush", description: "Rechargeable electric toothbrush", price: 20, brand: "Oral-B", category: "Electric", stock: 150, rating: 4.5, images: [] }
  ];

  const clothes = [
    { name: "Men's Cotton T-Shirt", description: "100% cotton round neck t-shirt", price: 10, brand: "H&M", category: "Clothes", stock: 300, rating: 4.3, images: [] },
    { name: "Women's Kurti", description: "Printed cotton kurti", price: 15, brand: "Biba", category: "Clothes", stock: 200, rating: 4.4, images: [] },
    { name: "Men's Jeans", description: "Slim fit denim jeans", price: 25, brand: "Levi's", category: "Clothes", stock: 150, rating: 4.5, images: [] },
    { name: "Women's Saree", description: "Silk blend saree", price: 40, brand: "Sangria", category: "Clothes", stock: 100, rating: 4.6, images: [] },
    { name: "Men's Jacket", description: "Winter wear jacket", price: 50, brand: "Puma", category: "Clothes", stock: 80, rating: 4.5, images: [] },
    { name: "Women's Dress", description: "Floral summer dress", price: 20, brand: "Zara", category: "Clothes", stock: 120, rating: 4.4, images: [] },
    { name: "Men's Hoodie", description: "Casual hooded sweatshirt", price: 30, brand: "Nike", category: "Clothes", stock: 90, rating: 4.5, images: [] },
    { name: "Women's Leggings", description: "Stretchable cotton leggings", price: 12, brand: "Jockey", category: "Clothes", stock: 200, rating: 4.3, images: [] },
    { name: "Men's Formal Shirt", description: "Full sleeve formal shirt", price: 18, brand: "Arrow", category: "Clothes", stock: 140, rating: 4.4, images: [] },
    { name: "Women's Top", description: "Casual wear top", price: 15, brand: "Only", category: "Clothes", stock: 160, rating: 4.4, images: [] }
  ];

  const patanjaliBase = [
    "Dant Kanti Toothpaste", "Kesh Kanti Natural Hair Cleanser", "Saundarya Face Wash", "Ghee (Desi/Cow’s Ghee)", "Chyawanprash",
    "Saundarya Aloe Vera Gel", "Coconut Hair Oil", "Aloe Vera Kanti Body Cleanser", "Amla Juice", "Honey (Pure/Multiflora)",
    "Rose Water", "Shuddha Shilajit", "Virgin Coconut Oil", "Ashwagandha Churna", "Divya Rose Water",
    "Divya Shilajeet Drops", "Musli Pak", "Power Vita", "Gulkand", "Badam Pak",
    "Pachak Hing", "Pachak Jeera", "Pachak Jaljeera", "Amla-Aloe Juice", "Amrith Rasayan",
    "Shatavar Churna", "Aastha Agarbatti"
  ];

  // Repeat to make 70 products
  const patanjali = Array.from({ length: 70 }).map((_, i) => ({
    name: patanjaliBase[i % patanjaliBase.length],
    description: `Popular Patanjali product: ${patanjaliBase[i % patanjaliBase.length]}`,
    price: Math.floor(Math.random() * 20) + 5,
    brand: "Patanjali",
    category: "Patanjali",
    stock: Math.floor(Math.random() * 200) + 50,
    rating: (Math.random() * 1 + 4).toFixed(1), // between 4.0 and 5.0
    images: []
  }));

  let allProducts = [...electronics, ...electric, ...clothes, ...patanjali];


    allProducts = allProducts.map(product => ({
    ...product,
    stock: 1000
  }));

  await Product.insertMany(allProducts);
  console.log("✅ 100 Products inserted successfully!");
  mongoose.connection.close();
}

seedProducts().catch(err => {
  console.error("❌ Error inserting products:", err);
  mongoose.connection.close();
});
