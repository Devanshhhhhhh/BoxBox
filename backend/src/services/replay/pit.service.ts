import { OpenF1Error } from "../../utils/replay/openf1-error";
import { scheduleRequest } from "../../utils/replay/request.scheduler";

type PitData = {
    date: string;
    driver_number: number;
    lap_number: number;
    pit_duration: number | null;
    stop_duration: number | null;
    session_key: number;
}

export const getPitData = async (sessionKey: number): Promise<PitData[]> => {
    const url = `https://api.openf1.org/v1/pit?session_key=${sessionKey}`
    return scheduleRequest(async () => {
        const response = await fetch(url);
    
        if(!response.ok){
            throw new OpenF1Error(`OpenF1 pit request failed: ${response.status}`, response.status)
        }
    
        const data: PitData[] = await response.json();
    
        return data;
    }) 
}