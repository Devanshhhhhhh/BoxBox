import { preparePositionReplay } from "./sync.utils";
import { getLatestRecordsByDriverAtTime } from "./sync.utils";

const sampleRecords = [
    {
        date: "2026-10-21T14:00:01Z",
        driver_number: 12,
        position: 5
    },
    {
        date: "2026-10-21T14:00:03Z",
        driver_number: 12,
        position: 4
    },
    {
        date: "2026-10-21T14:00:02Z",
        driver_number: 44,
        position: 8
    },
    {
        date: "2026-10-21T14:00:04Z",
        driver_number: 44,
        position: 7
    }
];

const replay = preparePositionReplay(
    sampleRecords,
    "2026-10-21T14:00:03Z"
);


const nextPositions = getLatestRecordsByDriverAtTime(
    replay.recordsByDriver,
    "2026-10-21T14:00:04Z",
    replay.lastIndices
);

console.log("Positions at 14:00:04:");

for (const [driverNumber, record] of nextPositions) {
    console.log(`Driver ${driverNumber}: P${record.position}`);
}


console.log("Synchronized positions:");

for (const [driverNumber, record] of replay.synchronizedRecords) {
    console.log(
        `Driver ${driverNumber}: P${record.position} at ${record.date}`
    );
}

console.log("Saved indices:", replay.lastIndices);
