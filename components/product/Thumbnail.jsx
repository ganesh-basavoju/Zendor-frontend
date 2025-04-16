import Image from "next/image";

const Thumbnail = ({ image, index, selectedImage, setSelectedImage }) => (
  <div
    key={index}
    className={`relative w-20 h-20 cursor-pointer border-2 transition-colors ${
      selectedImage === index ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
    }`}
    onClick={() => setSelectedImage(index)}
    aria-label={`View image ${index + 1}`}
  >
    <Image
      src={image}
      alt={`Thumbnail ${index + 1}`}
      fill
      className="object-cover"
      sizes="80px"
    />
  </div>
);

export default Thumbnail;