'use client';
import { Button } from "@/components/ui/button";
import CoinTable from '@/components/coin-page/coin-list-table'


export default function Home() {
  console.log('Client');
  return (
    <main className="flex gap-5 justify-center items-center">
      <Button>Click me</Button>
      <CoinTable />
      <Button>Click me</Button>
    </main>
  );
}
