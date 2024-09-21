import React from 'react';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import Link from 'next/link';

interface Order {
  id: string;
  created: string;
  total: number;
  status: string;
  payment_status: string;
  user: string;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const [sortField, setSortField] = React.useState<keyof Order>('created');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('desc');

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-500';
      case 'shipped': return 'bg-blue-500';
      case 'delivered': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const sortOrders = (a: Order, b: Order): number => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  };

  const toggleSort = (field: keyof Order) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Order) => {
    if (field !== sortField) return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    return sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />;
  };

  return (
    <Card className="w-full my-4">
          <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort('id')}>
                  Order ID {getSortIcon('id')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort('created')}>
                  Date {getSortIcon('created')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort('user')}>
                  Customer {getSortIcon('user')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort('total')}>
                  Total {getSortIcon('total')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort('status')}>
                  Status {getSortIcon('status')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => toggleSort('payment_status')}>
                  Payment {getSortIcon('payment_status')}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.sort(sortOrders).map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
              <Link key={order.id} href={`/profile/order/${order.id}`} >
              {order.id}
              </Link>
              </TableCell>
                <TableCell>{formatDate(order.created)}</TableCell>
                <TableCell>{order.user}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(order.status)} text-white`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.payment_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrderList;