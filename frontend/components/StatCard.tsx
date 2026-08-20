type StatCardProps = {
    title: string;
    value: number;
}

export default function StartCard({title, value}: StatCardProps) {
    return(
        <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <p className="text-sm text-zinc-400"> {title} </p>
            <p className="mt-2 text-3xl font-bold"> {value} </p>
        </div>
    )
}