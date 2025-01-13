import { Skeleton } from '@/components/ui/skeleton';

export default function OrderDetailSkeleton() {
  return (
    <div className="mt-6">
      <Skeleton className="mb-4 h-8 w-full" />
      <Skeleton className="mb-4 h-8 w-2/3" />
      <Skeleton className="h-8 w-1/2" />
    </div>
  );
}
