const mongoose = require('mongoose');
const Product = require('./models/Product'); // adjust path

const MONGO_URI = 'mongodb+srv://krishna:Shukla8726@cluster0.kof2u.mongodb.net/amazon?retryWrites=true&w=majority';

async function addImagesToProducts() {
  await mongoose.connect(MONGO_URI);

  // Example image URLs — you can replace with your real CDN/S3 URLs
  const placeholderImage = "https://www.buniyaa.com/cdn/shop/articles/patanjali.jpg?v=1643971674";

  const result = await Product.updateMany(
    { images: { $size: 0 } }, // only products with empty images array
    { $set: { images: [placeholderImage] } }
  );

  console.log(`✅ Updated ${result.modifiedCount} products with images.`);
  mongoose.connection.close();
}

addImagesToProducts().catch(err => {
  console.error("❌ Error updating images:", err);
  mongoose.connection.close();
});
