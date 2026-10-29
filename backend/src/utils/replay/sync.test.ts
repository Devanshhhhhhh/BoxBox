
import assert from "node:assert/strict";

import {
    groupedRecordsbyDriver,
    getLatestRecordsByDriverAtTime,
    seekRecordsByDriverAtTime,
} from "./sync.utils";

// Sample position records
const positionRecords = [
    { date: "2026-10-21T14:00:01Z", driver_number: 12, position: 5 },
    { date: "2026-10-21T14:00:03Z", driver_number: 12, position: 4 },
    { date: "2026-10-21T14:00:02Z", driver_number: 44, position: 8 },
    { date: "2026-10-21T14:00:04Z", driver_number: 44, position: 7 },
];

// Sample location records
const locationRecords = [
    { date: "2026-10-21T14:00:01Z", driver_number: 12, x: 100, y: 200, z: 0 },
    { date: "2026-10-21T14:00:03Z", driver_number: 12, x: 120, y: 220, z: 0 },
    { date: "2026-10-21T14:00:02Z", driver_number: 44, x: 300, y: 400, z: 0 },
    { date: "2026-10-21T14:00:04Z", driver_number: 44, x: 320, y: 420, z: 0 },
];

/* // Group each dataset by driver
const positionsByDriver = groupedRecordsbyDriver(positionRecords);
const locationsByDriver = groupedRecordsbyDriver(locationRecords);

// Each dataset needs its own index map
const positionIndices = new Map<number, number>();
const locationIndices = new Map<number, number>();

// Stage 1: Initial playback at 14:00:02
const initialPositions = getLatestRecordsByDriverAtTime(
    positionsByDriver,
    "2026-10-21T14:00:02Z",
    positionIndices
);

const initialLocations = getLatestRecordsByDriverAtTime(
    locationsByDriver,
    "2026-10-21T14:00:02Z",
    locationIndices
);

assert.equal(initialPositions.get(12)?.position, 5);
assert.equal(initialPositions.get(44)?.position, 8);

assert.deepEqual(
    [initialLocations.get(12)?.x, initialLocations.get(12)?.y],
    [100, 200]
);
assert.deepEqual(
    [initialLocations.get(44)?.x, initialLocations.get(44)?.y],
    [300, 400]
);

// Stage 2: Seek backward to 14:00:01
const seekedPositions = seekRecordsByDriverAtTime(
    positionsByDriver,
    "2026-10-21T14:00:01Z",
    positionIndices
);

const seekedLocations = seekRecordsByDriverAtTime(
    locationsByDriver,
    "2026-10-21T14:00:01Z",
    locationIndices
);

assert.equal(seekedPositions.get(12)?.position, 5);
assert.equal(seekedPositions.has(44), false);

assert.deepEqual(
    [seekedLocations.get(12)?.x, seekedLocations.get(12)?.y],
    [100, 200]
);
assert.equal(seekedLocations.has(44), false);

// Stage 3: Resume forward at 14:00:04
const resumedPositions = getLatestRecordsByDriverAtTime(
    positionsByDriver,
    "2026-10-21T14:00:04Z",
    positionIndices
);

const resumedLocations = getLatestRecordsByDriverAtTime(
    locationsByDriver,
    "2026-10-21T14:00:04Z",
    locationIndices
);

assert.equal(resumedPositions.get(12)?.position, 4);
assert.equal(resumedPositions.get(44)?.position, 7);

assert.deepEqual(
    [resumedLocations.get(12)?.x, resumedLocations.get(12)?.y],
    [120, 220]
);
assert.deepEqual(
    [resumedLocations.get(44)?.x, resumedLocations.get(44)?.y],
    [320, 420]
);

console.log("All combined position and location synchronization tests passed!");
 */

const sampleRecords = [
    {
        date: "2026-10-21T14:00:02Z",
        driver_number: 44,
        position: "P8"
    },
    {
        date: "2026-10-21T14:00:04Z",
        driver_number: 44,
        position: "P7"
    }
];

const recordsByDriver = groupedRecordsbyDriver(sampleRecords);
const lastIndices = new Map<number, number>();

// First, seek to a time before Driver 44's first record.
const beforeFirstRecord = seekRecordsByDriverAtTime(
    recordsByDriver,
    "2026-10-21T14:00:01Z",
    lastIndices
);

assert.equal(beforeFirstRecord.has(44), false);
assert.equal(lastIndices.get(44), -1);

// Now resume playback at the first record's timestamp.
const resumedRecords = getLatestRecordsByDriverAtTime(
    recordsByDriver,
    "2026-10-21T14:00:02Z",
    lastIndices
);

assert.equal(resumedRecords.get(44)?.position, "P8");
assert.equal(lastIndices.get(44), 0);

console.log("Backward seek and forward resumption boundary test passed!");