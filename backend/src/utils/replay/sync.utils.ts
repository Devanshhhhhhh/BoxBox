type TimestampedRecord = {
    date: string;
}

export const getLatestRecordAtorBefore = <T extends TimestampedRecord
>(
    records: T[],
    targetTime: string,
    startIndex: number
): { record: T | null; nextIndex: number } => {
    const targetTimestamp = new Date(targetTime).getTime();
    let index = startIndex

    while (index + 1 < records.length) {
        const nextRecord: T | undefined = records[index + 1];

        if (!nextRecord || new Date(nextRecord.date).getTime() > targetTimestamp) {
            break;
        }

        index++;
    }

    const currentRecord: T | undefined = records[index];

    let record: T | null = null;

    if (currentRecord && new Date(currentRecord.date).getTime() <= targetTimestamp) {
        record = currentRecord;
    }

    return { record, nextIndex: index };
}

// Grouping openF1 data by Driver for seperate timeline for each driver
export const groupedRecordsbyDriver =  <T extends {driver_number: number}
> (records: T[]
): Map<number, T[]> => {
    const groupedRecords = new Map<number, T[]>();

    for(const record of records) {
        const driverNumber = record.driver_number;
        const driverRecords = groupedRecords.get(driverNumber) ?? [];

        driverRecords.push(record);
        groupedRecords.set(driverNumber, driverRecords);
    }
    return groupedRecords;
}


// Connecting both the functions above (timeline and records)
export const getLatestRecordsByDriverAtTime = <T extends TimestampedRecord & {driver_number: number}  // Requirements from input data
>(
    recordsByDriver: Map<number, T[]>,  // Input data
    targetTime: string,
    lastIndices: Map<number, number>
): Map<number, T> => {
    const synchronizedRecords = new Map<number, T>();

    for(const [driverNumber, driverRecords] of recordsByDriver){
        const startIndex = lastIndices.get(driverNumber) ?? 0;

        const { record, nextIndex } = getLatestRecordAtorBefore(
            driverRecords,
            targetTime,
            startIndex
        );

        lastIndices.set(driverNumber, nextIndex);

        if(record){
            synchronizedRecords.set(driverNumber, record);
        }
     }

     return synchronizedRecords;
}


// Outer most function that gathers all the data
export const preparePositionReplay = <T extends TimestampedRecord & {driver_number: number}
>(
    positionRecords: T[],
    targetTime: string
): {
    recordsByDriver: Map<number, T[]>;
    lastIndices: Map<number, number>;
    synchronizedRecords: Map<number, T>;
} => {
    
    const recordsByDriver = groupedRecordsbyDriver(positionRecords);
    const lastIndices = new Map<number, number>();

    const synchronizedRecords = getLatestRecordsByDriverAtTime(
        recordsByDriver,
        targetTime,
        lastIndices
    )

    return {recordsByDriver, lastIndices, synchronizedRecords};
}

// Resets lastIndices when user seek backwards
export const resetReplayIndices = (
    lastIndices: Map<number, number>
): void => {
    for(const driverNumber of lastIndices.keys()){
        lastIndices.set(driverNumber, 0);
    }
}

// Find the new index after backward seeking for 1 driver
export const findLatestIndexAtOrBefore = <T extends TimestampedRecord
>(
    records: T[],
    targetTime: string
):  number => {
    const targetTimestamp = new Date(targetTime).getTime();

    let left = 0;
    let right = records.length -1;
    let bestIndex = -1;

    while(left <= right){
        const middle = Math.floor(left + (right - left) / 2);

        const middleRecord = records[middle];
        if(!middleRecord) break;
        const recordTimestamp = new Date(middleRecord.date).getTime();

        if(recordTimestamp <= targetTimestamp){
            bestIndex = middle;
            left = middle + 1;
        }
        else{
            right = middle - 1;
        }
    }
    return bestIndex;
}

// call findLastestIndexAtOrBefore for each driver and update replay state
export const seekRecordsByDriverAtTime = <T extends TimestampedRecord & {driver_number: number}
>(
    recordsByDriver: Map<number, T[]>,
    targetTime: string,
    lastIndices: Map<number, number>
): Map<number, T> => {
    const synchronizedRecords = new Map<number, T>();

    for(const [driverNumber, driverRecords] of recordsByDriver){
        const index = findLatestIndexAtOrBefore(driverRecords, targetTime);
        
        lastIndices.set(driverNumber, index);

        if(index >= 0){
            const record = driverRecords[index];

            if(record){
                synchronizedRecords.set(driverNumber, record);
            }
        }
    }
    
    return synchronizedRecords;
}