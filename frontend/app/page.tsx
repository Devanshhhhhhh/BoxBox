import RaceCard from "@/components/RaceCard";
import StatCard from "@/components/StatCard";

type Meeting = {
  meeting_key: number;
  meeting_name: string;
  location: string;
  country_name: string;
  date_start: string;
  date_end: string;
  year: number;
  is_cancelled: boolean;
}

type Driver = {
  driver_name: string
}

type Session = {
  session_key: number;
  year: number;
}

type MeetingsResponse = {
  success: boolean;
  data: Meeting[];
}

type DriversResponse = {
  success: boolean;
  data: Driver[];
}

type SessionsResponse = {
  success: boolean;
  data: Session[];
}

export default async function Home() {

  const [meetingsResponse, driversResponse, sessionsResponse] = await Promise.all([
    fetch("http://localhost:5000/api/meetings"),
    fetch("http://localhost:5000/api/drivers"),
    fetch("http://localhost:5000/api/sessions")
  ])

  const meetingsResult: MeetingsResponse = await meetingsResponse.json();
  const driversResult: DriversResponse = await driversResponse.json();
  const sessionsResult: SessionsResponse = await sessionsResponse.json();

  
  const meetings = meetingsResult.data;
  const drivers = driversResult.data;
  const sessions = sessionsResult.data;
  
  const currentYear = 2026;

  const seasonMeetings = meetings.filter(
    (meeting) => meeting.year === currentYear
  );
  
  const seasonSessions = sessions.filter(
    (sessions) => sessions.year === currentYear
  );
  
  return (
    <main>
      <div>
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-zinc-400">Formula 1 season overview</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCard title="Races" value={seasonMeetings.length}/>
          <StatCard title="Drivers" value={drivers.length}/>
          <StatCard title="Sessions" value={seasonSessions.length}/>
        </div>

        <section className="mt-10">

        <section className="mt-10">
          <div className="mb-4">
            <p className="text-xl font-semibold">Recent Races</p>
            <p className="text-zinc-400 text-sm mt-1">Latest Formula 1 events</p>
          </div>

          <div className="space-y-4">
            {meetings.slice(-25).map((meeting) => (
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