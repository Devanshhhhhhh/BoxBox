import Link from "next/link";

type Session = {
    id: number;
    sessionKey: number;
    sessionName: string;
    sessionType: string;
    dateStart: string;
    dateEnd: string;
    meetingId: number;
}

type Race = {
    id: number;
    meetingKey: number;
    meetingName: string;
    officialName: string | null;
    countryCode: string;
    countryName: string;
    location: string;
    circuitShortName: string;
    circuitImage: string | null;
    dateStart: string;
    dateEnd: string;
    year: number;
    sessions: Session[];
}

type MeetingDetailResponse = {
    success: boolean;
    data: Race;
}
                              // property extracted  //property  // property type
export default async function MeetingDetails ({ params }: { params: Promise<{ meetingKey: string}>; }) {
    const { meetingKey } = await params;

    const response = await fetch(`http://localhost:5000/api/races/${meetingKey}`);

    if(!response.ok){
        throw new Error("Failed to fetch race details");
    }
    
    const data: MeetingDetailResponse = await response.json();
    const race = data.data;

    const startDate = new Date(race.dateStart).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    const endDate = new Date(race.dateEnd).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
    
    return (
        <main className="min-h-screen text-white p-6 md:p-10 max-w-6xl mx-auto space-y-6">
            <div>
                <Link 
                    href={"/"}
                    className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors"
                > 
                    ← Back to Dashboard
                </Link>
            </div>

            {/* RACE HEADER */}
            <section className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex items-center justify-center rounded-xl min-h-45">
                    {race.circuitImage ? (
                        <img 
                            src={race.circuitImage} 
                            alt={race.circuitShortName} 
                            className="max-h-40 object-contain filter brightness-90 hover:brightness-100 transition-all"
                        />
                        
                    ) : (
                        <span className="text-xs text-zinc-500 uppercase tracking-widest"> 
                            Circuit Layout Unavailable 
                        </span>
                    )}
                </div>

                <div className="w-full md:w-2/3 space-y-3">
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-red-600/20 text-red-400 border border-red-500/30 rounded-full">
                            {race.year} Season 
                        </span>
                        <span className="text-xs text-zinc-400">
                            {race.countryName}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
                        {race.meetingName}
                    </h1>

                    {race.officialName && (
                        <p className="text-xs text-zinc-500 font-mono">
                            {race.officialName}
                        </p>
                    )}

                    <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-sm text-zinc-300">
                        <div>
                            <span className="text-zinc-500">Circuit: </span>
                            <span className="font-medium">{race.circuitShortName}</span>
                        </div>
                        <div>
                            <span className="text-zinc-500 ">Location: </span>
                            <span className="font-medium">{race.location} </span>
                        </div>
                        <div>
                            <span className="text-zinc-500">Dates: </span>
                            <span className="font-medium">{startDate} — {endDate} </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* WEEKEND SCHEDULE */}
            <section>
                <div className="mb-4">
                    <h2 className="text-xl font-mono font-semibold uppercase">Weekend Schedule</h2>
                </div>
                <div className="space-y-3 ">
                    {race.sessions.map((session) => {
                        const sessionStartDate = new Date(session.dateStart).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })

                        const startTime = new Date(session.dateStart).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false
                        })

                        const endTime = new Date(session.dateEnd).toLocaleTimeString("en-GB", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false
                        })
                        
                        let sessionColorClasses = "";

                        if (session.sessionType === "Practice") {
                            sessionColorClasses = "border-blue-500/50 bg-blue-500/10 hover:border-blue-400 text-blue-400";
                        } else if (session.sessionType === "Qualifying") {
                                sessionColorClasses = "border-yellow-500/50 bg-yellow-500/10 hover:border-yellow-400 text-yellow-400";
                        } else if (session.sessionType === "Race") {
                            sessionColorClasses = "border-red-500/50 bg-red-500/10 hover:border-red-400 text-red-400";
                        }
                        
                        return (
                            <div key={session.sessionKey} className={`rounded-xl border p-5 transition-colors ${sessionColorClasses}`}>
                                <p className="font-semibold text-white font-mono"> {session.sessionName} </p>
                                <p className="mt-1 text-sm text-zinc-400 font-mono">{sessionStartDate} · {startTime } — {endTime}</p>
                            </div>
                        )
                    })}
                </div>
            </section>
        </main>
    )
}