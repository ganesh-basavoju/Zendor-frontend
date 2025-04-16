export async function fetchProduct(id) {
  return {
    id,
    name: "Premium Wallpaper",
    price: 99.99,
    quantity: 1,
    description: "Transform your space with our premium wallpaper collection.",
    features: [
      "Premium materials",
      "Easy to install",
      "Water resistant",
      "Eco-friendly",
    ],
    textures: [
      { name: 'Feather', basePrice: 99.99 },
      { name: 'Canvas', basePrice: 149.99 },
      { name: 'Leather', basePrice: 199.99 },
      { name: 'Silk', basePrice: 179.99 }
    ],
    colors: [
      { name: 'Sky Blue', value: '#CBD5E1', imageIndex: 0 },
      { name: 'Charcoal', value: '#4B5563', imageIndex: 1 },
      { name: 'Blush', value: '#F5B7B1', imageIndex: 2 },
      { name: 'Taupe', value: '#B8A99A', imageIndex: 3 }
    ],
    sizes: ['Custom Roll Size', 'Sample'],
    images: [
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
      "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4022-683x1024.jpg",
    ],
    colors: [
      { name: 'Sky Blue', value: '#CBD5E1' },
      { name: 'Charcoal', value: '#4B5563' },
      { name: 'Blush', value: '#F5B7B1' },
      { name: 'Taupe', value: '#B8A99A' },
      { name: 'Ivory', value: '#FDFBF7' },
      { name: 'Navy', value: '#1E293B' }
    ],
  };
}