"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaToggleOff } from "react-icons/fa6";
import { IoToggle } from "react-icons/io5";
import { fetchProduct } from "@/lib/api";

export default function WoodenFlooringProduct() {
  const { id } = useParams();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState("inches");
  const [price, setPrice] = useState({
    basePrice: 999.99,
    total: 999.99,
  });

  const [selectedSize, setSelectedSize] = useState("Custom Roll Size");
  const [selectedFloors, setSelectedFloors] = useState(["A"]);
  const [activeFloor, setActiveFloor] = useState("A");
  // Update floorDimensions state to include price
  const [floorDimensions, setFloorDimensions] = useState({
    A: { width: 0, height: 0, area: 0, price: 0 },
    B: { width: 0, height: 0, area: 0, price: 0 },
    C: { width: 0, height: 0, area: 0, price: 0 },
    D: { width: 0, height: 0, area: 0, price: 0 },
  });

  const router = useRouter();

  useEffect(() => {
    try {
      const productData = fetchProduct(id, "wooden-flooring");
      if (!productData.data) {
        throw new Error("Product not found for this id");
      }
      console.log(productData.data);
      setProduct(productData.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
      alert("Error fetching product data:");
      router.push("/products/wooden-flooring");
    }
  }, []);

  useEffect(() => {
    const totalFloorsPrice = Object.entries(floorDimensions)
      .filter(([floor]) => selectedFloors.includes(floor))
      .reduce((sum, [_, dims]) => sum + dims.price, 0);

    setPrice({
      basePrice: 999.99,
      total: selectedSize === "Sample" ? 999.99 * quantity : totalFloorsPrice,
    });
  }, [floorDimensions, selectedFloors, selectedSize, quantity]);

  // Update useEffect for price calculations
  useEffect(() => {
    if (product.dimensions.width > 0 || product.dimensions.height > 0) {
      let width = product.dimensions.width;
      let height = product.dimensions.height;

      if (unit === "inches") {
        width = width / 12;
        height = height / 12;
      }

      const area = width * height;
      const areaWithWaste = area + area * 0.1;
      const basePrice = 999.99;
      const floorPrice = basePrice * Math.ceil(areaWithWaste);
      setDimensions((prev) => ({ ...prev, area: Math.ceil(areaWithWaste) }));

      setFloorDimensions((prev) => ({
        ...prev,
        [activeFloor]: {
          width: dimensions.width,
          height: dimensions.height,
          area: Math.ceil(areaWithWaste),
          price: floorPrice,
        },
      }));
    }
  }, [dimensions.width, dimensions.height, unit, activeFloor]);

  // Add new useEffect for total price calculation
  useEffect(() => {
    const totalFloorsPrice = Object.entries(floorDimensions)
      .filter(([floor]) => selectedFloors.includes(floor))
      .reduce((sum, [_, dims]) => sum + dims.price, 0);

    setPrice({
      basePrice: 999.99,
      total: selectedSize === "Sample" ? 999.99 : totalFloorsPrice,
    });
  }, [floorDimensions, selectedFloors, selectedSize]);

  // Update the price display in Product Details section
  <div>
    <h1 className='text-3xl font-semibold text-gray-900'>
      Premium Wooden Flooring
    </h1>
    <p className='text-2xl font-medium text-gray-900 mt-4'>
      ₹{selectedSize === "Sample" ? price.basePrice : price.total.toFixed(2)}
    </p>
    {selectedFloors.length > 1 && selectedSize !== "Sample" && (
      <p className='text-md text-gray-600 mt-2'>
        Total price for {selectedFloors.length} Floors
      </p>
    )}
  </div>;
  const handleFloorSelection = (floor) => {
    if (floor === "A") return; // Floor A cannot be deselected

    setSelectedFloors((prev) => {
      if (prev.includes(floor)) {
        return prev.filter((f) => f !== floor);
      }
      return [...prev, floor];
    });
    setActiveFloor(floor);

    // Reset dimensions when switching walls
    setDimensions({
      width: floorDimensions[floor].width,
      height: floorDimensions[floor].height,
      area: floorDimensions[floor].area,
    });
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12'>
        {/* Product Image */}
        <div className='relative aspect-[4/3] sm:aspect-[3/4] bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden'>
          <Image
            src='https://www.bohomaterials.com/web/image/product.product/16/image_1024/Walnut%20Dark?unique=f7b911a'
            alt='Premium Wooden Flooring'
            fill
            className='object-cover'
            priority
          />
        </div>

        {/* Product Details */}
        <div className='space-y-6 sm:space-y-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-semibold text-gray-900'>
              Premium Wooden Flooring
            </h1>
            <p className='text-xl sm:text-2xl font-medium text-gray-900 mt-2 sm:mt-4'>
              ₹
              {selectedSize === "Sample"
                ? price.total
                : `${price.total.toFixed(2)}`}
            </p>
          </div>

          {/* Size Selection */}
          <div className='space-y-3 sm:space-y-4'>
            <p className='text-sm font-medium text-gray-700'>Size</p>
            <div className='flex flex-col sm:flex-row gap-3'>
              <button
                className={`w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 transition-all text-sm sm:text-base ${
                  selectedSize === "Custom Roll Size"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedSize("Custom Roll Size")}
              >
                Custom Roll Size
              </button>
              <button
                className={`w-full sm:flex-1 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg border-2 transition-all text-sm sm:text-base ${
                  selectedSize === "Sample"
                    ? "border-blue-600 bg-blue-50 text-blue-600"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedSize("Sample")}
              >
                Sample
              </button>
            </div>
          </div>

          {/* Quantity Selection */}
          {selectedSize === "Sample" && (
            <div className='space-y-3 sm:space-y-4'>
              <p className='text-sm font-medium text-gray-700'>Quantity</p>
              <div className='inline-flex items-center'>
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className='w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-l-lg border border-gray-300 hover:bg-gray-50 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path d='M5 12h14' />
                  </svg>
                </button>
                <div className='w-12 sm:w-16 h-8 sm:h-10 flex items-center justify-center border-t border-b border-gray-300 bg-white'>
                  <span className='text-sm sm:text-base text-gray-900 font-medium'>
                    {quantity}
                  </span>
                </div>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className='w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-r-lg border border-gray-300 hover:bg-gray-50 transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='14'
                    height='14'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                  >
                    <path d='M12 5v14m-7-7h14' />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Dimensions Section */}
          {selectedSize === "Custom Roll Size" && (
            <div className='space-y-4 sm:space-y-6 p-4 sm:p-6 bg-gray-50 rounded-xl'>
              <div>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                  <label className='text-sm font-medium text-gray-700'>
                    Select type
                  </label>
                  <div className='flex items-center gap-2 bg-white rounded-lg shadow-sm'>
                    <button
                      onClick={() => setUnit("inches")}
                      className={`px-3 sm:px-4 py-2 rounded-lg transition-all text-sm ${
                        unit === "inches"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Inches
                    </button>
                    <button
                      onClick={() => setUnit("feet")}
                      className={`px-3 sm:px-4 py-2 rounded-lg transition-all text-sm ${
                        unit === "feet"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      Feet
                    </button>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>
                    Width ({unit})
                  </label>
                  <input
                    type='number'
                    className='w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg'
                    value={dimensions.width}
                    onChange={(e) => {
                      setDimensions((prev) => ({
                        ...prev,
                        width: parseFloat(e.target.value) || 0,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>
                    Height ({unit})
                  </label>
                  <input
                    type='number'
                    className='w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg'
                    value={dimensions.height}
                    onChange={(e) => {
                      setDimensions((prev) => ({
                        ...prev,
                        height: parseFloat(e.target.value) || 0,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className='space-y-2 sm:space-y-3'>
                <label className='block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2'>
                  Area (sq.ft)
                </label>
                <input
                  type='number'
                  className='w-full p-2.5 sm:p-3 border border-gray-200 rounded-lg bg-gray-100'
                  value={dimensions.area}
                  readOnly
                />
                <p className='text-xs sm:text-sm text-gray-500 mt-2'>
                  Total area: Width x Height
                </p>
                <p className='text-xs sm:text-sm text-gray-500'>
                  No.of cartons: {Math.ceil(dimensions.area / 18.36)}
                </p>
                <p className='text-xs sm:text-sm text-gray-500'>
                  Profiles needed per running sqft:{" "}
                  {Math.ceil(2 * (dimensions.width + dimensions.height))}
                </p>
                <div className='mt-3 sm:mt-4 p-2.5 sm:p-3 bg-blue-50 border border-blue-100 rounded-lg'>
                  <p className='text-xs sm:text-sm text-blue-600'>
                    Area is inclusive of wastage.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Floor Selection */}
          {selectedSize === "Custom Roll Size" && (
            <div className='space-y-3 sm:space-y-4'>
              <span className='text-sm font-medium text-gray-700'>
                Select Floor Area
              </span>
              <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3'>
                {["A", "B", "C", "D"].map((floor) => (
                  <button
                    key={floor}
                    onClick={() => handleFloorSelection(floor)}
                    className={`py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border-2 transition-all text-sm ${
                      selectedFloors.includes(floor)
                        ? floor === activeFloor
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-green-600 bg-green-50 text-green-600"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    Area {floor}
                  </button>
                ))}
              </div>
              {/* Display selected Floor dimensions */}
              <div className='mt-4 space-y-2 bg-gray-50 p-3 sm:p-4 rounded-lg'>
                {selectedFloors.map((floor) => (
                  <div
                    key={floor}
                    className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-gray-600'
                  >
                    <span className='font-medium'>Area {floor}:</span>
                    <span>
                      {floorDimensions[floor].width}x
                      {floorDimensions[floor].height} {unit}  
                    </span>
                    <span>({floorDimensions[floor].area} sq.ft)</span>
                    <span className='text-blue-600'>
                      ₹{floorDimensions[floor].price.toFixed(2)}
                    </span>
                  </div>
                ))}
                {selectedFloors.length > 1 && (
                  <div className='mt-3 pt-3 border-t border-gray-200'>
                    <div className='text-sm font-medium text-gray-700'>
                      Total Area:{" "}
                      {Object.entries(floorDimensions)
                        .filter(([floor]) => selectedFloors.includes(floor))
                        .reduce((sum, [_, dims]) => sum + dims.area, 0)}{" "}
                      sq.ft
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6'>
            <button className='w-full py-3 sm:py-4 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium'>
              Add to Cart
            </button>
            <button className='w-full py-3 sm:py-4 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm sm:text-base font-medium'>
              Buy Now
            </button>
          </div>

          {/* Specifications */}
          <div className='pt-6 sm:pt-8 border-t'>
            <h2 className='text-lg sm:text-xl font-semibold mb-4 sm:mb-6'>
              Specifications
            </h2>
            <div className='grid gap-3 sm:gap-4'>
              {[
                { label: "Brand", value: "Kaara" },
                { label: "Size", value: "1900 x 190" },
                { label: "Approx Thickness", value: "14 mm" },
                { label: "Core", value: "Pine" },
                { label: "Finish", value: "Matt Lacquer, Brushed" },
                { label: "Shade", value: "Dark" },
                { label: "Per Box coverage (Sqft)", value: "NA" },
              ].map((spec, index) => (
                <div
                  key={index}
                  className='flex flex-col sm:flex-row py-2.5 sm:py-3 border-b border-gray-100'
                >
                  <span className='text-sm sm:text-base text-gray-600 sm:w-1/2'>
                    {spec.label}
                  </span>
                  <span className='text-sm sm:text-base font-medium text-gray-900 sm:w-1/2'>
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className='pt-6 sm:pt-8'>
            <p className='text-sm sm:text-base text-gray-600 mb-3 sm:mb-4'>
              Have a question? We are here to help :)
            </p>
            <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'>
              <button className='w-full py-2.5 sm:py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base font-medium'>
                Order on WhatsApp
              </button>
              <button className='w-full py-2.5 sm:py-3 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors text-sm sm:text-base font-medium'>
                +91-81215 22945
              </button>
            </div>
          </div>

          {/* Related Products Section */}
          <div className='mt-12 sm:mt-16'>
            <h2 className='text-xl sm:text-2xl font-semibold mb-4 sm:mb-6'>
              Related products
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
              {[
                {
                  id: 1,
                  name: "Oak Natural",
                  image:
                    "https://www.bohomaterials.com/web/image/product.product/16/image_1024/Walnut%20Dark?unique=f7b911a",
                  colors: ["brown", "natural"],
                },
                {
                  id: 2,
                  name: "Maple Light",
                  image:
                    "https://www.bohomaterials.com/web/image/product.product/17/image_1024/Oak%20Natural?unique=f7b911b",
                  colors: ["beige", "light"],
                },
                {
                  id: 3,
                  name: "Walnut Dark",
                  image:
                    "https://www.bohomaterials.com/web/image/product.product/25/image_1024/Oak%20Light%20(C)?unique=61464e9",
                  colors: ["dark brown", "black"],
                },
              ].map((relatedProduct) => (
                <div key={relatedProduct.id} className='group cursor-pointer'>
                  <div className='relative aspect-square sm:aspect-[3/4] bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden'>
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className='object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                  </div>
                  <div className='mt-3 sm:mt-4'>
                    <h3 className='text-base sm:text-lg font-medium text-gray-900'>
                      {relatedProduct.name}
                    </h3>
                    <div className='flex gap-2 mt-1 sm:mt-2'>
                      {relatedProduct.colors.map((color, index) => (
                        <span
                          key={index}
                          className='text-xs sm:text-sm text-gray-500 capitalize'
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Related Products Section */}
      <div className='mt-16'>
        <h2 className='text-2xl font-semibold mb-6'>Related products</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[
            {
              id: 1,
              name: "Oak Natural",
              image:
                "https://www.bohomaterials.com/web/image/product.product/16/image_1024/Walnut%20Dark?unique=f7b911a",
              colors: ["brown", "natural"],
            },
            {
              id: 2,
              name: "Maple Light",
              image:
                "https://www.bohomaterials.com/web/image/product.product/17/image_1024/Oak%20Natural?unique=f7b911b",
              colors: ["beige", "light"],
            },
            {
              id: 3,
              name: "Walnut Dark",
              image:
                "https://www.bohomaterials.com/web/image/product.product/25/image_1024/Oak%20Light%20(C)?unique=61464e9",
              colors: ["dark brown", "black"],
            },
          ].map((relatedProduct) => (
            <div key={relatedProduct.id} className='group cursor-pointer'>
              <div className='relative aspect-[3/4] bg-gray-50 rounded-xl overflow-hidden'>
                <Image
                  src={relatedProduct.image}
                  alt={relatedProduct.name}
                  fill
                  className='object-cover group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='mt-4'>
                <h3 className='text-lg font-medium text-gray-900'>
                  {relatedProduct.name}
                </h3>
                <div className='flex gap-2 mt-2'>
                  {relatedProduct.colors.map((color, index) => (
                    <span key={index} className='text-sm text-gray-500'>
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
