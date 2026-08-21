import RaceCard from "@/components/RaceCard";
import StatCard from "@/components/StatCard";

type Meeting = {
  meeting_key: number;
  meeting_name: string;
  location: string;
  country_name: string;
  date_start: string;
  year: number;
}

type MeetingsResponse = {
  success: boolean;
  data: Meeting[];
}

export default async function Home() {

  const response = await fetch("http://localhost:5000/api/meetings")
  const result: MeetingsResponse = await response.json();
  const meetings = result.data;

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

          <div className="space-y-4">
            {meetings.slice(-5).map((meeting) => (
              <RaceCard
                key={meeting.meeting_key}
                name={meeting.meeting_name}
                location={meeting.location}
                date={new Date(meeting.date_start).toLocaleDateString(
                  "en-GB",
                  {
                    day:"2-digit",
                    month:"short",
                    year:"numeric"
                  }
                )}
                status= {
                  new Date(meeting.date_start) > new Date() ? "Upcoming" : "Completed"
                }
              />
            ))}
          </div>

        </section>

        </section>

      </div>
    </main>
  )
}