import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

import { useGetDetailOrder } from '../../queries/queries';
import OrderDetail from '../info/order-detail';
export type TModelSelectStatusProps = {
  orderId: string;
  open: boolean;
  onOpenChange: () => void;
};

export function ModelDetailOrder({
  orderId,
  open,
  onOpenChange
}: TModelSelectStatusProps) {
  console.log(orderId);
  const { data } = useGetDetailOrder(orderId);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Detail Order</AlertDialogTitle>
          <AlertDialogDescription>
            <OrderDetail data={data.data} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onOpenChange}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
