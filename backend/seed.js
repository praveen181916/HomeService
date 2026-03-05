// Run: node seed.js  (to populate sample data)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Service = require('./models/Service');
const User = require('./models/User');
const ServiceProvider = require('./models/ServiceProvider');

const services = [
  { serviceName: 'AC Deep Cleaning', price: 699, description: 'Complete AC unit deep cleaning including filters, coils, and drain pipe.', category: 'AC Service', image: 'https://via.placeholder.com/400x250?text=AC+Service', duration: '2-3 hours' },
  { serviceName: 'AC Gas Refilling', price: 1299, description: 'Professional AC gas refilling with pressure check and leak detection.', category: 'AC Service', image: 'https://via.placeholder.com/400x250?text=AC+Gas', duration: '1-2 hours' },
  { serviceName: 'Tap/Faucet Repair', price: 299, description: 'Fix leaking taps, faucets, and pipe joints quickly and efficiently.', category: 'Plumbing', image: 'https://via.placeholder.com/400x250?text=Plumbing', duration: '1 hour' },
  { serviceName: 'Drain Unclogging', price: 499, description: 'Professional drain unclogging service for kitchen and bathroom.', category: 'Plumbing', image: 'https://via.placeholder.com/400x250?text=Drain', duration: '1-2 hours' },
  { serviceName: 'Wiring & Switches', price: 399, description: 'Electrical wiring, switch board installation and repair.', category: 'Electrician', image: 'https://via.placeholder.com/400x250?text=Electrician', duration: '1-3 hours' },
  { serviceName: 'Fan Installation', price: 249, description: 'Ceiling fan and exhaust fan installation and repair.', category: 'Electrician', image: 'https://via.placeholder.com/400x250?text=Fan+Install', duration: '1 hour' },
  { serviceName: 'Full Home Cleaning', price: 1999, description: 'Complete home deep cleaning including kitchen, bathrooms, and living areas.', category: 'Cleaning', image: 'https://via.placeholder.com/400x250?text=Home+Cleaning', duration: '4-6 hours' },
  { serviceName: 'Bathroom Cleaning', price: 599, description: 'Thorough bathroom sanitization and cleaning service.', category: 'Cleaning', image: 'https://via.placeholder.com/400x250?text=Bathroom', duration: '1-2 hours' },
  { serviceName: 'Haircut at Home', price: 349, description: 'Professional haircut and styling at the comfort of your home.', category: 'Beauty', image: 'https://via.placeholder.com/400x250?text=Haircut', duration: '45 mins' },
  { serviceName: 'Facial & Cleanup', price: 799, description: 'Relaxing facial and skin cleanup by certified beauticians.', category: 'Beauty', image: 'https://via.placeholder.com/400x250?text=Facial', duration: '1.5 hours' }
];

const providers = [
  { name: 'Ramesh Kumar', phone: '9876543210', email: 'ramesh@example.com', serviceCategory: 'AC Service', availability: true },
  { name: 'Suresh Patel', phone: '9876543211', email: 'suresh@example.com', serviceCategory: 'Plumbing', availability: true },
  { name: 'Dinesh Singh', phone: '9876543212', email: 'dinesh@example.com', serviceCategory: 'Electrician', availability: true },
  { name: 'Priya Sharma', phone: '9876543213', email: 'priya@example.com', serviceCategory: 'Beauty', availability: true },
  { name: 'Ravi Verma', phone: '9876543214', email: 'ravi@example.com', serviceCategory: 'Cleaning', availability: false }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Service.deleteMany({});
  await ServiceProvider.deleteMany({});
  await Service.insertMany(services);
  await ServiceProvider.insertMany(providers);

  // Create admin user
  const adminExists = await User.findOne({ email: 'admin@homeservice.com' });
  if (!adminExists) {
    await User.create({ name: 'Admin', email: 'admin@homeservice.com', password: 'admin123', phone: '9000000000', role: 'admin' });
  }

  console.log('✅ Seed data inserted!');
  console.log('Admin Login: admin@homeservice.com / admin123');
  mongoose.connection.close();
}

seed().catch(console.error);
