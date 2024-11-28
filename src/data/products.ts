import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 150000, // ₦150,000
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics"
  },
  {
    id: 2,
    name: "Minimalist Watch",
    price: 75000, // ₦75,000
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=60",
    description: "Elegant minimalist watch with leather strap",
    category: "Accessories"
  },
  {
    id: 3,
    name: "Smart Fitness Tracker",
    price: 45000, // ₦45,000
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&auto=format&fit=crop&q=60",
    description: "Advanced fitness tracking with heart rate monitoring",
    category: "Electronics"
  }
];