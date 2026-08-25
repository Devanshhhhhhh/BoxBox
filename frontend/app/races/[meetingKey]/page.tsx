type Session = {
    id: number;
    sessionKey: number;
    sessionName: string;
    sessionType: string;
    dateStart: string;
    dateEnd: string;
    meetingId: number;
}
// "id": 78,
//     "meetingKey": 1280,
//     "meetingName": "Chinese Grand Prix",
//     "officialName": null,
//     "countryCode": "CHN",
//     "countryName": "China",
//     "location": "Shanghai",
//     "circuitShortName": "Shanghai",
//     "circuitImage": "https://media.formula1.com/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/China%20carbon.png",
//     "dateStart": "2026-03-13T03:30:00.000Z",
//     "dateEnd": "2026-03-15T09:00:00.000Z",
//     "year": 2026,
//     "sessions": [

type Race = {
    id: number;
    meetingKey: number;
    meetingName: string;
    officialName: string;
    countryCode: string;
    countryName: string;
    location: string;
    circuitShrotName: string;
    circuitImage: string;
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
    const data: MeetingDetailResponse = await response.json();
    
    const race = data.data;
    return (
        <div>
            <h1 className="text-3xl">{race.meetingName}</h1>

            {race.sessions.map((session) => (
                <div key={session.id}> {session.sessionName} </div>
            ))}
        </div>
    )
}