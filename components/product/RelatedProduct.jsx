import Image from "next/image";

const RelatedProduct = ({ product }) => (
  <div className="group cursor-pointer">
    <div className="relative aspect-square overflow-hidden rounded-lg">
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
    <h3 className="mt-4 text-lg font-medium">{product.name}</h3>
    <div className="flex gap-2 mt-2">
      {product.colors.map((color, index) => (
        <div
          key={index}
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: color }}
          aria-label={color}
        />
      ))}
    </div>
  </div>
);

export default RelatedProduct;