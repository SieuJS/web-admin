import { AlertModal } from '@/components/shared/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { User } from '@/constants/data';
import { Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useRouter } from '@/routes/hooks';
import React, { useState } from 'react';
import { useBanUser } from '../../queries/queries';
interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [banId, setBanId] = useState<string>('');
  const [unBanId, setUnBanId] = useState<string>('');
  const router = useRouter();
  const { mutate: banUser, isPending, isSuccess } = useBanUser();
  const onConfirm = async () => {
    await banUser(banId);
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
        title={isSuccess ? 'Success' : 'Are you sure?'}
        description={
          isSuccess ? 'Ban success' : 'Are you sure you want to continue?'
        }
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

          <DropdownMenuItem onClick={() => router.push(`/product/${data.id}`)}>
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          {data.status === 'active' && (
            <DropdownMenuItem
              onClick={() => {
                setBanId(data.id);
                setOpen(true);
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Ban
            </DropdownMenuItem>
          )}
          {data.status === 'banned' && (
            <DropdownMenuItem
              onClick={() => {
                setBanId(data.id);
                setOpen(true);
              }}
            >
              <Trash className="mr-2 h-4 w-4" /> Unban
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
