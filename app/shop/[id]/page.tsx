import { perfumes } from '@/lib/perfumes';
import PerfumeShowcase from '@/components/ui/spatial-product-showcase';
import { notFound } from 'next/navigation';

export default function PerfumePage({ params }: { params: { id: string } }) {
  const perfume = perfumes[Number(params.id)];
  if (!perfume) notFound();
  return <PerfumeShowcase perfume={perfume} />;
}
