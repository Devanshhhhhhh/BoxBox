import RaceCard from "@/components/RaceCard";
import StatCard from "@/components/StatCard";

type Meeting = {
  id: number;
  meetingKey: number;
  meetingName: string;
  location: string;
  countryName: string;
  dateStart: string;
  dateEnd: string;
  year: number;
  isCancelled: boolean;
  meetingOfficialName: string | null;
};

type DashboardData = {
  currentYear: number;
  totalDrivers: number;
  totalSessions: number;
  totalRaces: number;
  recentRaces: Meeting[];
}

type DashboardResponse = {
  success: boolean;
  data: DashboardData;
}

export default async function Home() {
  
  const response = await fetch("http://localhost:5000/api/dashboard");

  if(!response.ok){
    throw new Error("Failed to fetch dashboard data");
  }

  const result: DashboardResponse = await response.json();
  
  const {
    currentYear,
    totalDrivers,
    totalRaces,
    totalSessions,
    recentRaces
  } = result.data;

  return (
    <main>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-zinc-400 mb-2">Formula 1 Overview of Season {currentYear}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard title="Races" value={totalRaces}/>
          <StatCard title="Drivers" value={totalDrivers}/>
          <StatCard title="Sessions" value={totalSessions}/>
        </div>

        <section className="mt-10">
          <div className="mb-4">
            <p className="text-xl font-semibold">Race Calendar</p>
            <p className="text-zinc-400 text-sm mt-1">Latest Formula 1 events</p>
          </div>

          <div className="space-y-4">
            {recentRaces.map((meeting) => (
              <RaceCard
                key={meeting.meetingKey}
                name={meeting.meetingName}
                location={meeting.location}
                date={new Date(meeting.dateStart).toLocaleDateString(
                  "en-GB",
                  {
                    day:"2-digit",
                    month:"short",
                    year:"numeric"
                  }
                )}
                status= {
                 meeting.isCancelled
                 ? "Cancelled"
                 : new Date(meeting.dateStart) > new Date()
                 ? "Upcoming"
                 : "Completed"
                }
              />
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}