import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

const OrderDetail = ({ data }) => {
  const {
    id,
    totalPrice,
    orderDate,
    status,
    order_bill_product,
    order_bill_address,
    order_of_user
  } = data;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Order ID:</strong> {id}
          </p>
          <p>
            <strong>Total Price:</strong> ${totalPrice}
          </p>
          <p>
            <strong>Order Date:</strong>{' '}
            {new Date(orderDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Status:</strong> {status}
          </p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Products in your order.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Product Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order_bill_product.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.productName}
                    </TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell className="text-right">
                      ${product.totalPrice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            {order_bill_address.map((address) => (
              <div key={address.id}>
                <p>
                  <strong>Name:</strong> {address.firstName} {address.lastName}
                </p>
                <p>
                  <strong>Company:</strong> {address.company}
                </p>
                <p>
                  <strong>Country:</strong> {address.country}
                </p>
                <p>
                  <strong>Address:</strong> {address.address}
                </p>
                <p>
                  <strong>Post Code:</strong> {address.postCode}
                </p>
                <p>
                  <strong>City:</strong> {address.city}
                </p>
                <p>
                  <strong>Province:</strong> {address.province}
                </p>
                <p>
                  <strong>Phone:</strong> {address.phone}
                </p>
                <p>
                  <strong>Email:</strong> {address.email}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Username:</strong> {order_of_user.username}
            </p>
            <p>
              <strong>Email:</strong> {order_of_user.email}
            </p>
            <p>
              <strong>Name:</strong> {order_of_user.name}
            </p>
            <p>
              <strong>Status:</strong> {order_of_user.status}
            </p>
            <p>
              <strong>Role:</strong> {order_of_user.role}
            </p>
            <img
              src={order_of_user.avatar}
              alt="User Avatar"
              style={{ width: '100px', height: '100px' }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetail;
