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

            <h1 className="text-3xl font-bold text-white mb-8">
                Drivers Standings
            </h1>

            <table className="w-full">

                <thead>
                    <tr className="border-b border-zinc-800 text-left">
                        <th className="px-5 py-4 text-zinc-400">POS</th>
                        <th className="px-5 py-4 text-zinc-400">DRIVER</th>
                        <th className="px-5 py-4 text-zinc-400">TEAM</th>
                        <th className="px-5 py-4 text-zinc-400">POINTS</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-zinc-800">

                    {data.data.map((driver) => (

                        <tr
                            key={driver.driverNumber}
                            className="bg-zinc-950"
                        >

                            <td className="px-5 py-4 text-white font-mono">
                                {driver.position}
                            </td>

                            <td className="px-5 py-4 text-white font-semibold">
                                {driver.driver ?? "Unknown"}
                            </td>

                            <td className="px-5 py-4 text-zinc-400">
                                {driver.team ?? "Unknown"}
                            </td>

                            <td className="px-5 py-4 text-white font-mono">
                                {driver.points}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </main>
    );
}