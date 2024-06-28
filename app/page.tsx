import { getServerSession } from 'next-auth'
import Image from "next/image";
import { authOptions } from './api/auth/[...nextauth]/route';


export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <p>Welcome  {session && <>{session.user!.name}</>}</p>
     
    </main>
  );
}
