import Image from 'next/image';

export default function RelatedProduct({ product }) {
  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-sm text-gray-700">{product.name}</h3>
        <div className="mt-1 flex gap-1">
          {product.colors.map((color, index) => (
            <span
              key={index}
              className="inline-block h-4 w-4 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}