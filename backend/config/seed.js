const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');
const ServiceProvider = require('../models/ServiceProvider');

dotenv.config();

const services = [
  {
    serviceName: 'AC Deep Cleaning',
    price: 599,
    description: 'Complete AC cleaning including filter wash, coil cleaning, and gas check by certified technicians.',
    category: 'AC Service',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
    duration: '2-3 hours',
    rating: 4.8,
    totalReviews: 1200,
    features: ['Filter cleaning', 'Coil cleaning', 'Gas pressure check', '30-day warranty']
  },
  {
    serviceName: 'AC Installation',
    price: 1299,
    description: 'Professional AC installation for split and window ACs with 90-day service warranty.',
    category: 'AC Service',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400',
    duration: '3-4 hours',
    rating: 4.7,
    totalReviews: 860,
    features: ['Pipe fitting', 'Electrical setup', 'Test run', '90-day warranty']
  },
  {
    serviceName: 'Pipe Leak Repair',
    price: 299,
    description: 'Fix pipe leaks and bursts quickly with our expert plumbers. Same-day service available.',
    category: 'Plumbing',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    duration: '1-2 hours',
    rating: 4.6,
    totalReviews: 2100,
    features: ['Leak detection', 'Pipe repair', 'Joint sealing', 'Free inspection']
  },
  {
    serviceName: 'Bathroom Fitting',
    price: 799,
    description: 'Complete bathroom plumbing solutions including tap installation and toilet fitting.',
    category: 'Plumbing',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    duration: '3-5 hours',
    rating: 4.5,
    totalReviews: 750,
    features: ['Tap installation', 'Toilet fitting', 'Shower setup', 'Quality parts']
  },
  {
    serviceName: 'Electrical Wiring',
    price: 499,
    description: 'Safe and certified electrical wiring work for homes and offices.',
    category: 'Electrician',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45249be28?w=400',
    duration: '2-4 hours',
    rating: 4.7,
    totalReviews: 980,
    features: ['Safety inspection', 'MCB installation', 'Switch fitting', 'Certified work']
  },
  {
    serviceName: 'Fan & Light Installation',
    price: 199,
    description: 'Install ceiling fans, chandeliers, and LED lights professionally.',
    category: 'Electrician',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45249be28?w=400',
    duration: '1-2 hours',
    rating: 4.8,
    totalReviews: 3200,
    features: ['Fan mounting', 'Wiring', 'Dimmer fitting', 'Test run']
  },
  {
    serviceName: 'Deep Home Cleaning',
    price: 1499,
    description: 'Full home deep cleaning including kitchen, bathrooms, and living areas.',
    category: 'Home Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    duration: '4-6 hours',
    rating: 4.9,
    totalReviews: 4500,
    features: ['Kitchen degreasing', 'Bathroom sanitizing', 'Floor scrubbing', 'Eco-friendly products']
  },
  {
    serviceName: 'Sofa & Carpet Cleaning',
    price: 699,
    description: 'Steam cleaning for sofas, carpets, and upholstery to remove stains and odors.',
    category: 'Home Cleaning',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400',
    duration: '2-3 hours',
    rating: 4.6,
    totalReviews: 1800,
    features: ['Steam cleaning', 'Stain removal', 'Deodorizing', 'Quick drying']
  },
  {
    serviceName: 'Bridal Makeup',
    price: 4999,
    description: 'Professional bridal makeup with airbrush technique by certified makeup artists.',
    category: 'Beauty Services',
    image: 'https://images.unsplash.com/photo-1487412840181-f7d2af2a5e8e?w=400',
    duration: '3-4 hours',
    rating: 4.9,
    totalReviews: 620,
    features: ['Airbrush makeup', 'Hair styling', 'Draping', 'Touch-up kit']
  },
  {
    serviceName: 'Facial & Cleanup',
    price: 599,
    description: 'Rejuvenating facial treatments at your doorstep with premium products.',
    category: 'Beauty Services',
    image: 'https://images.unsplash.com/photo-1487412840181-f7d2af2a5e8e?w=400',
    duration: '1-1.5 hours',
    rating: 4.7,
    totalReviews: 2300,
    features: ['Deep cleansing', 'Exfoliation', 'Mask', 'Moisturizing']
  }
];

const providers = [
  { name: 'Ramesh Kumar', email: 'ramesh@provider.com', phone: '9876543210', serviceCategory: 'AC Service', experience: 5, rating: 4.8, workingDays: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
  { name: 'Suresh Patel', email: 'suresh@provider.com', phone: '9876543211', serviceCategory: 'Plumbing', experience: 7, rating: 4.6, workingDays: ['Monday','Tuesday','Wednesday','Thursday','Friday'] },
  { name: 'Arjun Singh', email: 'arjun@provider.com', phone: '9876543212', serviceCategory: 'Electrician', experience: 4, rating: 4.7, workingDays: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] },
  { name: 'Priya Sharma', email: 'priya@provider.com', phone: '9876543213', serviceCategory: 'Beauty Services', experience: 6, rating: 4.9, workingDays: ['Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'] },
  { name: 'Meena Devi', email: 'meena@provider.com', phone: '9876543214', serviceCategory: 'Home Cleaning', experience: 3, rating: 4.5, workingDays: ['Monday','Wednesday','Friday','Saturday'] }
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Service.deleteMany({});
    await ServiceProvider.deleteMany({});

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@homeservice.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@homeservice.com',
        password: 'admin123',
        phone: '9999999999',
        role: 'admin'
      });
      console.log('✅ Admin user created: admin@homeservice.com / admin123');
    }

    await Service.insertMany(services);
    console.log(`✅ ${services.length} services seeded`);

    await ServiceProvider.insertMany(providers);
    console.log(`✅ ${providers.length} providers seeded`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seedDB();
