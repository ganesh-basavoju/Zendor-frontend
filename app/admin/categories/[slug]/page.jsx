import AllProducts from '@/components/Admin/Products/AllProducts';
import AdminLayout from '@/components/Admin/Layout';

export default function ProductsPage({params}) {
  return (
      <AllProducts name={params.slug}  />
  );
}