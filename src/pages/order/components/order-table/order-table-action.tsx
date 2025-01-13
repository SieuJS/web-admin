import SelectStatus from '../order-form/selectStatus';

export default function OrderTableActions() {
  return (
    <div className="mb-3 flex items-center justify-between">
      <SelectStatus />
      <div>
        <button className="btn btn-primary">Export</button>
      </div>
    </div>
  );
}
