import { OpenF1Error } from "../../utils/replay/openf1-error";

type PositionData = {
    date: string;
    session_key: number;
    meeting_key: number;
    driver_number: number;
    position: number;
}

export const getPositionData = async (sessionKey: number): Promise<PositionData[]> => {
    const url = `https://api.openf1.org/v1/position?session_key=${sessionKey}`
    const response = await fetch(url);

    if(!response.ok){
        throw new OpenF1Error(`OpenF1 position request failed: ${response.status}`, response.status)
    }

    const data: PositionData[] = await response.json();

    return data;
}