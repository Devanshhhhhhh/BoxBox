const OPENF1_URL = "https://api.openf1.org/v1"

export const getDrivers = async () => {
    const response = await fetch(`${OPENF1_URL}/drivers?session_key=latest`)
    const data = await response.json();
    return data;
}

export const getSessions = async () => {
    const response = await fetch(`${OPENF1_URL}/sessions`)
    const data = await response.json();
    return data;
}

export const getMeetings = async () => {
    const response = await fetch(`${OPENF1_URL}/meetings`)
    const data = await response.json();
    return data;
}