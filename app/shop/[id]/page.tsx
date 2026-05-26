import { perfumes } from '@/lib/perfumes';
import PerfumeShowcase from '@/components/ui/spatial-product-showcase';
import { notFound } from 'next/navigation';

export default async function PerfumePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const perfume = perfumes[Number(id)];
  if (!perfume || !perfume.name) notFound();
  return <PerfumeShowcase perfume={perfume} />;
}
