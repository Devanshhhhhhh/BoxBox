type RaceCardProps = {
    name: string;
    location: string;
    date: string;
    status: "Completed" | "Upcoming" | "Cancelled"
}

export default function RaceCard({
    name, location, date, status
}: RaceCardProps) {
    return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-5">
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="mt-1 text-sm text-zinc-400">{location}</p>
      </div>

      <div className="text-right">
        <p className="text-sm text-zinc-400">{date}</p>

        <span
          className={`mt-2 inline-block rounded-full px-3 py-1 text-xs ${
            status === "Completed"
              ? "bg-green-500/10 text-green-400"
              : status == "Cancelled"
              ? "bg-red-500/10 text-red-400"
              : "bg-yellow-500/10 text-yellow-400"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}