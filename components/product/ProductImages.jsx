import Image from "next/image";
import Thumbnail from "./Thumbnail";

const ProductImages = ({ product, selectedImage, setSelectedImage, imageRef, handleImageHover, showZoom, setShowZoom, zoomPosition }) => (
  <div className="lg:col-span-7 flex gap-4 overflow-hidden">
    <div className="hidden md:flex flex-col gap-4 overflow-y-auto max-h-[600px] pr-2">
      {product?.images?.map((image, index) => (
        <Thumbnail 
          key={index}
          image={image}
          index={index}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
      ))}
    </div>

    <div className="flex-1 relative aspect-square max-h-[600px]">
      <div
        className="relative w-full h-full"
        onMouseMove={handleImageHover}
        onMouseEnter={() => setShowZoom(true)}
        onMouseLeave={() => setShowZoom(false)}
        ref={imageRef}
      >
        <Image
          src={product?.images?.[selectedImage] || ''}
          alt={product?.name || ''}
          fill
          className="object-cover rounded-xl"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {showZoom && product?.images?.[selectedImage] && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${product.images[selectedImage]})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: '200%',
              backgroundRepeat: 'no-repeat',
            }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  </div>
);

export default ProductImages;