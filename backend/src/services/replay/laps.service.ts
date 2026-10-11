import { OpenF1Error } from "../../utils/replay/openf1-error";
import { scheduleRequest } from "../../utils/replay/request.scheduler";

type LapsData = {
    date_start: string | null;
    driver_number: number;
    lap_number: number;
    lap_duration: number | null;
}

export const getLapsData = async (sessionKey: number): Promise<LapsData[]> => {
    const url = `https://api.openf1.org/v1/laps?session_key=${sessionKey}`

    return scheduleRequest(async () => {
        const response = await fetch(url);

        if (!response.ok) {
            throw new OpenF1Error(
                `OpenF1 laps request failed: ${response.status}`,
                response.status
            );
        }

        const data: LapsData[] = await response.json();

        return data;
    });
}