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
      </div>
    </main>
  )
}