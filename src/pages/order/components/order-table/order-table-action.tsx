import OrderSortForm from '../order-form/select-create-time-order';
import SelectStatus from '../order-form/selectStatus';

export default function OrderTableActions() {
  return (
    <div className="mb-3 grid grid-cols-3 gap-3">
      <SelectStatus />
      <OrderSortForm />
    </div>
  );
}
