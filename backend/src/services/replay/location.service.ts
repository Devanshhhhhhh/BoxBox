type LocationData = {
    date: string;
    session_key: number;
    meeting_key : number;
    driver_number: number;
    x: number;
    z: number;
    y: number;
}

export const getLocationChunk = async (sessionKey: number, startTime: string, endTime: string): Promise<LocationData[]>=> {
    const url = `https://api.openf1.org/v1/location?session_key=${sessionKey}&date>=${startTime}&date<${endTime}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new Error(`OpenF1 location request failed: ${response.status}`)
    }

    const data: LocationData[] = await response.json();

    return data;
}