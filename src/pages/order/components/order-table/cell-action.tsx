import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useRouter } from '@/routes/hooks';
import { Order } from '@/constants/data';
import { Edit, MoreHorizontal, View } from 'lucide-react';
import React, { useState } from 'react';
import { ModelSelectStatusUpdate } from '../order-form/select-status-update';
interface CellActionProps {
  data: Order;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const router = useRouter();

  return (
    <>
      <ModelSelectStatusUpdate
        status={data.status}
        orderId={data.id}
        open={openUpdate}
        onOpenChange={() => {
          setOpenUpdate((prev) => !prev);
        }}
      />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => setOpenUpdate(true)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/order/${data.id}`)}>
            <View className="mr-2 h-4 w-4" /> Detail
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
