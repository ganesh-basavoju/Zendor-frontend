"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import ProductImages from "@/components/product/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";
import RelatedProduct from "@/components/product/RelatedProduct";
import { fetchProduct } from "@/lib/api"; // Move the fetchProduct function to a separate file

// Add new state for selected color
export default function ProductPage() {
  // Add this near your other state declarations
  const [selectedWall, setSelectedWall] = useState(null);
  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  const [selectedSize, setSelectedSize] = useState('Custom Roll Size');
  const [selectedTexture, setSelectedTexture] = useState('Feather');
  const [typeToggle, setTypeToggle] = useState(true);
  // Update the initial states
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    area: 0,
    wastageArea: 0,
    totalArea: 0,
  });
  
  const [priceDetails, setPriceDetails] = useState({
    basePrice: 0,
    totalPrice: 0,
  });

  // Update price details when product is loaded
  useEffect(() => {
    if (product) {
      setPriceDetails({
        basePrice: product.price,
        totalPrice: product.price,
      });
    }
  }, [product]);

  // Update price details when texture changes
  useEffect(() => {
    if (product) {
      const selectedTextureData = product.textures.find(t => t.name === selectedTexture);
      const basePrice = selectedTextureData ? selectedTextureData.basePrice : product.price;
      
      setPriceDetails(prev => ({
        ...prev,
        basePrice,
        totalPrice: basePrice
      }));

      // Recalculate dimensions if they exist
      if (dimensions.width > 0 || dimensions.height > 0) {
        handleDimensionChange({ target: { value: dimensions.width } }, 'width');
      }
    }
  }, [selectedTexture, product]);
 



  // Modify the handleDimensionChange callback to use more stable calculations
  const handleDimensionChange = useCallback((e, key) => {
    if (!product) return;

    const value = Math.max(0, parseFloat(e.target.value) || 0);
    
    setDimensions(prev => {
      const newDimensions = {
        ...prev,
        [key]: value
      };
      
      const area = Number((newDimensions.width * newDimensions.height).toFixed(2));
      let totalArea = area;
    
      if(typeToggle){
        const width = Number((newDimensions.width/12).toFixed(2));
        const height = Number((newDimensions.height/12).toFixed(2));
        totalArea = Math.ceil(width * height);
      }
      
      const wastageArea = Number((totalArea * 0.10).toFixed(2));
      totalArea = Number((totalArea + wastageArea).toFixed(2));

      const selectedTextureData = product.textures.find(t => t.name === selectedTexture);
      const basePrice = selectedTextureData ? selectedTextureData.basePrice : product.price;
      let totalPrice = Number((basePrice * totalArea).toFixed(2));

      if (selectedSize === 'Custom Roll Size' && newDimensions.width > 0 && newDimensions.height > 0) {
        totalPrice = Math.ceil(totalPrice);
      }
      
      setPriceDetails({
        basePrice: Number(basePrice.toFixed(2)),
        totalPrice: Number(totalPrice.toFixed(2)),
      });

      return {
        ...newDimensions,
        area: Math.round(totalArea),
        wastageArea: Math.round(wastageArea),
        totalArea: Math.round(totalArea),
      };
    });
  }, [product, selectedSize, selectedTexture, typeToggle]);


  useEffect(() => {
    if (dimensions.width > 0 || dimensions.height > 0) {
      handleDimensionChange({ target: { value: dimensions.width } }, 'width');
      handleDimensionChange({ target: { value: dimensions.height } }, 'height');
    }
  }, [typeToggle]);
  // Add this effect to handle size selection
  useEffect(() => {
    if (selectedSize === 'Sample') {
      setPriceDetails(prev => ({
        ...prev,
        totalPrice: prev.basePrice
      }));
    } else {
      handleDimensionChange({ target: { value: dimensions.width } }, 'width');
    }
  }, [selectedSize]);
  
  const imageRef = useRef(null);

  // Update the relatedProducts array
  const relatedProducts = [
    {
      id: 1,
      name: 'Raas Collection',
      image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
      colors: ['brown', 'beige']
    },
    {
      id: 2,
      name: 'Pastel Garden',
      image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
      colors: ['gray', 'sage', 'mint']
    },
    {
      id: 3,
      name: 'Scenic Feathers',
      image: "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
      colors: ['gray', 'red']
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchProduct(id);
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);



  const handleImageHover = useCallback((e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setZoomPosition({ x, y });
    }
  }, []);





  const updateProduct = useCallback((updatedQuantity) => {
    setProduct(prev => ({ ...prev, quantity: updatedQuantity }));
  }, []);



  const incrementProductQuantity = useCallback(() => {
    updateProduct(product.quantity + 1);
  }, [product?.quantity, updateProduct]);




  const decrementProductQuantity = useCallback(() => {
    if (product?.quantity > 1) {
      updateProduct(product.quantity - 1);
    }
  }, [product?.quantity, updateProduct]);


  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = useCallback((colorName) => {
    setSelectedColor(colorName);
    if (product) {
      const color = product.colors.find(c => c.name === colorName);
      if (color && color.images.length > 0) {
        setSelectedImage(color.images[0]);
      }
    }
  }, [product]);


  const handleProductToCart = useCallback(() => {
    fetch("/api/add-product-to-cart")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center h-screen text-lg font-semibold text-red-600">Product not found</div>;
  }


  return (
    <div className="container mx-auto px-4 md:px-8 py-8 max-w-[1440px]">
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8">
        <ProductImages 
          product={product}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          imageRef={imageRef}
          handleImageHover={handleImageHover}
          showZoom={showZoom}
          setShowZoom={setShowZoom}
          zoomPosition={zoomPosition}
        />
        
        <ProductDetails 
          setTypeToggle={setTypeToggle}
          typeToggle={typeToggle}
          product={product}
          priceDetails={priceDetails}
          dimensions={dimensions}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedTexture={selectedTexture}
          setSelectedTexture={setSelectedTexture}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          handleDimensionChange={handleDimensionChange}
          decrementProductQuantity={decrementProductQuantity}
          incrementProductQuantity={incrementProductQuantity}
          handleProductToCart={handleProductToCart}
          selectedColor={selectedColor}
          handleColorSelect={handleColorSelect}
          colors={product.colors}
          selectedWall={selectedWall}
          setSelectedWall={setSelectedWall}
        />
      </div>

      {/* Related Products section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <RelatedProduct key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  );
}