import { getServerSession } from 'next-auth'
import Image from "next/image";
import { authOptions } from '@/lib/authOption';
import RegisterPage from './components/ui/page';
import ProductCard from './components/ui/productCard';

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <p>Welcome  {session && <>{session.user!.name}</>}</p>
      <br />
      <div className="flex flex-wrap gap-4">
      <ProductCard 
        name="Game Boy" 
        image='GameBoy.jpg'
        rating={5.9}
        price={19.99}
        discount='10%'
      />
       <ProductCard 
        name="Apple Watch" 
        image='iwatch.jpg'
        rating={5.9}
        price={19.99}
        discount='10%'
      />
       <ProductCard 
        name="Apple Watch" 
        image='iwatch2.jpg'
        rating={5.9}
        price={19.99}
        discount='10%'
      />
       <ProductCard 
        name="Hoodie" 
        image='Hoodie.jpg'
        rating={5.9}
        price={19.99}
        discount='10%'
      />
       <ProductCard 
        name="Alexa" 
        image='elexa.jpg'
        rating={5.9}
        price={19.99}
        discount='10%'
      />
       <ProductCard 
        name="Shoe" 
        image='shoe.jpg'
        rating={5.9}
        price={19.99}
        discount='10%'
      />
      </div>
     
     <br />
     <RegisterPage/>
    </main>
  );
}
