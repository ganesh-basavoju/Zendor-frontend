export const products = [
  {
    id: 1,
    name: "Modern Leather Backpack",
    category: "Wallpaper",
    price: 129.99,
    description: "Stylish and durable leather backpack perfect for daily use and travel",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
    tags: ["leather", "accessories", "travel"]
  },
  {
    id: 2,
    name: "Wireless Noise-Canceling Headphones",
    category: "Wall art",
    price: 249.99,
    description: "Premium wireless headphones with active noise cancellation",
    image:"https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
    tags: ["audio", "wireless", "tech"]
  },
  {
    id: 3,
    name: "Minimalist Watch",
    category: "Decal",
    price: 159.99,
    description: "Elegant minimalist watch with leather strap",
    image:  "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
    tags: ["watches", "fashion", "accessories"]
  },
  {
    id: 4,
    name: "Smart Fitness Tracker",
    category: "Home textiles",
    price: 99.99,
    description: "Track your fitness goals with this advanced smart band",
    image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
    tags: ["fitness", "tech", "health"]
  }
];

export const categories = [...new Set(products.map(product => product.category))];