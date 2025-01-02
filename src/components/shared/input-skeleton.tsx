import { Skeleton } from '../ui/skeleton';

interface InputSkeletonProps {
  width?: string;
  height?: string;
}

const InputSkeleton = ({
  width = '100%',
  height = '40px'
}: InputSkeletonProps) => {
  return <Skeleton className={`h-7 w-[70px]   `} />;
};

export default InputSkeleton;
