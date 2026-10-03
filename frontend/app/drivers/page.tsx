type DriverStanding = {
    position: number;
    driverNumber: number;
    driver?: string;
    team?: string;
    points: number;
};

type DriversResponse = {
    success: boolean;
    data: DriverStanding[];
};

export default async function Drivers() {

    const response = await fetch(
        "http://localhost:5000/api/drivers"
    );

    const data: DriversResponse = await response.json();

    return (
    <main className="p-8">

        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
                Drivers
            </h1>

            <p className="mt-2 text-zinc-400">
                2026 Championship Standings
            </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800">

            <table className="w-full">

                <thead className="bg-zinc-900">
                    <tr className="border-b border-zinc-800">

                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                            POS
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                            DRIVER
                        </th>

                        <th className="px-6 py-4 text-left text-sm font-medium text-zinc-400">
                            TEAM
                        </th>

                        <th className="px-6 py-4 text-right text-sm font-medium text-zinc-400">
                            POINTS
                        </th>

                    </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">

                    {data.data.map((driver) => (

                        <tr
                            key={driver.driverNumber}
                            className="bg-zinc-950 transition-colors hover:bg-zinc-900"
                        >

                            <td className="px-6 py-5">
                                <span className="font-mono text-zinc-400">
                                    {driver.position}
                                </span>
                            </td>

                            <td className="px-6 py-5">

                                <div className="flex items-center gap-4">

                                    <span className="font-mono text-sm text-zinc-500">
                                        #{driver.driverNumber}
                                    </span>

                                    <span className="font-semibold text-white">
                                        {driver.driver ?? "Unknown"}
                                    </span>

                                </div>

                            </td>

                            <td className="px-6 py-5 text-zinc-400">
                                {driver.team ?? "Unknown"}
                            </td>

                            <td className="px-6 py-5 text-right">
                                <span className="font-mono font-semibold text-white">
                                    {driver.points}
                                </span>
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    </main>
);
}