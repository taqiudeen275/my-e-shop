'use client'
import { useRouter } from 'next/navigation';
import OrderSuccess from './component';

export default function OrderSuccessPage() {
  const router = useRouter();
//   const { orderNumber, total, email } = router.query;

  // Calculate estimated delivery (example: 5 days from now)
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <OrderSuccess
      orderNumber={"22323dssfdsfd" as string}
      estimatedDelivery={estimatedDelivery}
      total={parseFloat("2000.32")}
    />
  );
}