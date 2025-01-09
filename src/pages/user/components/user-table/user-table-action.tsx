import UserNameSearchForm from '../user-form/user-name-search-form';
import UserEmailSearchForm from '../user-form/user-email-search-form';
import { useRouter } from '@/routes/hooks';

import { Button } from '@/components/ui/button';
import UserSortForm from '../user-form/user-sort-form';

export default function UserTableActions() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-3 py-5">
      <div className="flex-2 flex gap-3">
        <UserNameSearchForm />
        <UserEmailSearchForm />
      </div>

      <div className="flex-2 gap-3">
        <UserSortForm />
      </div>
      <div className="col-span-1">
        <Button
          className="text-xs md:text-sm"
          onClick={() => {
            router.push('/product/create');
          }}
        >
          Add new
        </Button>
      </div>
    </div>
  );
}
