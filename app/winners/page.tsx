import { getWinners } from '@/lib/actions/winners';
import { WinnerCard } from '@/components/winner-card';

export default async function WinnersPage() {
  const winners = await getWinners();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Recent Winners</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {winners.map((winner) => (
          <WinnerCard key={winner.id} winner={winner} />
        ))}
      </div>
    </div>
  );
}