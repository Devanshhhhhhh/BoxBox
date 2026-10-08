type LocationData = {
    date: string;
    session_key: number;
    meeting_key : number;
    driver_number: number;
    x: number;
    z: number;
    y: number;
}

class OpenF1Error extends Error {
    status: number;

    constructor(message: string, status: number){
        super(message);
        this.status = status;
        this.name = "OpenF1Error"
    }
}

export const getLocationChunk = async (sessionKey: number, startTime: string, endTime: string): Promise<LocationData[]>=> {
    const url = `https://api.openf1.org/v1/location?session_key=${sessionKey}&date>=${startTime}&date<${endTime}`;
    const response = await fetch(url);

    if(!response.ok){
        throw new OpenF1Error(`OpenF1 location request failed: ${response.status}`, response.status);
    }

    const data: LocationData[] = await response.json();

    return data;
}