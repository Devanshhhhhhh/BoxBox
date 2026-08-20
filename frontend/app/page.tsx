import RaceCard from "@/components/RaceCard";
import StatCard from "@/components/StatCard";

export default function Home() {
  return (
    <main>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-zinc-400">Formula 1 season overview</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard title="Races" value={24}/>
          <StatCard title="Drivers" value={22}/>
          <StatCard title="Sessions" value={72}/>
        </div>

        <section className="mt-10">

        <section className="mt-10">
          <div className="mb-4">
            <p className="text-xl font-semibold">Recent Races</p>
            <p className="text-zinc-400 text-sm mt-1">Latest Formula 1 events</p>
          </div>

          <div className="space-y-3">
            <RaceCard name="Australian Grand Prix" location="Melbourne" date="15 March 2026" status="Completed" />
            <RaceCard name="Japanese Grand Prix" location="Suzuka" date="29 March 2026" status="Completed" />
            <RaceCard name="Miami Grand Prix" location="Miami" date="03 May 2026" status="Upcoming" />
          </div>

        </section>

        </section>

      </div>
    </main>
  )
}