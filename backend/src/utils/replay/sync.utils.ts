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