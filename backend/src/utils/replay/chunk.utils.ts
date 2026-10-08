export type TimeChunks = {
    start: string;
    end: string;
}

export const createTimeChunks = (startTime: string, endTime: string, chunkMinutes: number) : TimeChunks[] => {
    const start = new Date(startTime);
    const end = new Date(endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start >= end) {
        throw new RangeError("startTime and endTime must be valid, and startTime must be before endTime");
    }

    if (!Number.isFinite(chunkMinutes) || chunkMinutes <= 0) {
        throw new RangeError("chunkMinutes must be greater than zero");
    }

    const chunkDuration = chunkMinutes * 60 * 1000;

    const chunks: TimeChunks[] = [];

    while(start < end){
        const chunkEnd = new Date(start.getTime() + chunkDuration);

        if(chunkEnd > end){
            chunkEnd.setTime(end.getTime());
        }

        chunks.push({
            start: start.toISOString(),
            end: chunkEnd.toISOString()
        })

        start.setTime(chunkEnd.getTime());
    }

    return chunks;
};