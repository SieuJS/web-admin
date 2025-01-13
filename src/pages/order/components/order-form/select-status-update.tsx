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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useUpdateOrder } from '../../queries/queries';
import { useEffect, useState } from 'react';
import { useRouter } from '@/routes/hooks';
export type TModelSelectStatusProps = {
  status: string;
  orderId: string;
  open: boolean;
  onOpenChange: () => void;
};

export function ModelSelectStatusUpdate({
  status,
  orderId,
  open,
  onOpenChange
}: TModelSelectStatusProps) {
  const statusValues = ['pending', 'processing', 'completed', 'cancelled'];
  const [selectedStatus, setSelectedStatus] = useState(
    status.toLocaleLowerCase()
  );
  const {
    mutate: updateOrder,
    isPending,
    isSuccess,
    isError
  } = useUpdateOrder();
  const onConfirm = async () => {
    await updateOrder({
      orderId: orderId,
      status: selectedStatus
    });
  };
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      window.alert('Update status success');
      router.reload();
    } else if (isError) {
      window.alert('Update status failed');
    }
  }, [isSuccess, isError]);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <Select
              onValueChange={(value) => {
                setSelectedStatus(value);
              }}
              defaultValue={selectedStatus}
            >
              <SelectTrigger>
                <SelectValue key={selectedStatus} />
              </SelectTrigger>
              <SelectContent>
                {statusValues.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
