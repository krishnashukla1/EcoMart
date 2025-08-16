const mongoose = require('mongoose');
const Product = require('./models/Product'); // adjust the path

const MONGO_URI = 'mongodb+srv://krishna:Shukla8726@cluster0.kof2u.mongodb.net/amazon?retryWrites=true&w=majority';

async function deleteOldProducts() {
  await mongoose.connect(MONGO_URI);

  // Find the 100 oldest products
  const oldProducts = await Product.find().sort({ createdAt: 1 }).limit(100);

  // Delete them
  const idsToDelete = oldProducts.map(p => p._id);
  await Product.deleteMany({ _id: { $in: idsToDelete } });

  console.log(`✅ Deleted ${idsToDelete.length} old products`);
  mongoose.connection.close();
}

deleteOldProducts().catch(err => {
  console.error("❌ Error deleting old products:", err);
  mongoose.connection.close();
});
