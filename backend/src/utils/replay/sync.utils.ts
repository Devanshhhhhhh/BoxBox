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