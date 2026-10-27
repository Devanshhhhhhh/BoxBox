import { preparePositionReplay, getLatestRecordsByDriverAtTime, resetReplayIndices, findLatestIndexAtOrBefore, seekRecordsByDriverAtTime} from "./sync.utils";

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


// const nextPositions = getLatestRecordsByDriverAtTime(
//     replay.recordsByDriver,
//     "2026-10-21T14:00:04Z",
//     replay.lastIndices
// );

// console.log("Positions at 14:00:04:");

// for (const [driverNumber, record] of nextPositions) {
//     console.log(`Driver ${driverNumber}: P${record.position}`);
// }


// console.log("Synchronized positions:");

// for (const [driverNumber, record] of replay.synchronizedRecords) {
//     console.log(
//         `Driver ${driverNumber}: P${record.position} at ${record.date}`
//     );
// }

// console.log("Saved indices:", replay.lastIndices);



// resetReplayIndices(replay.lastIndices);

// const earlierPositions = getLatestRecordsByDriverAtTime(
//     replay.recordsByDriver,
//     "2026-10-21T14:00:02Z",
//     replay.lastIndices
// );

// console.log("Positions after seeking backward to 14:00:02:");

// for (const [driverNumber, record] of earlierPositions) {
//     console.log(`Driver ${driverNumber}: P${record.position}`);
// }



// const driver12Records = sampleRecords.filter(
//     record => record.driver_number === 12
// );

// const driver44Records = sampleRecords.filter(
//     record => record.driver_number === 44
// );

// const seekTime = "2026-10-21T14:00:02Z";

// console.log(
//     "Driver 12 index:",
//     findLatestIndexAtOrBefore(driver12Records, seekTime)
// );

// console.log(
//     "Driver 44 index:",
//     findLatestIndexAtOrBefore(driver44Records, seekTime)
// );

// console.log(
//     "Driver 12 before race data:",
//     findLatestIndexAtOrBefore(
//         driver12Records,
//         "2026-10-21T14:00:00Z"
//     )
// );


// const seekedPositions = seekRecordsByDriverAtTime(
//     replay.recordsByDriver,
//     "2026-10-21T14:00:02Z",
//     replay.lastIndices
// );

// console.log("Positions after seeking backward to 14:00:02:");

// for (const [driverNumber, record] of seekedPositions) {
//     console.log(`Driver ${driverNumber}: P${record.position}`);
// }

// console.log("Indices after seeking:", replay.lastIndices);



const resumedPositions = getLatestRecordsByDriverAtTime(
    replay.recordsByDriver,
    "2026-10-21T14:00:04Z",
    replay.lastIndices
);

console.log("Positions after resuming forward playback:");

for (const [driverNumber, record] of resumedPositions) {
    console.log(`Driver ${driverNumber}: P${record.position}`);
}

console.log("Indices after resuming:", replay.lastIndices);
