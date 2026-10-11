
import { scheduleRequest } from "../../utils/replay/request.scheduler";
import { delay } from "../../utils/delay";
import { OpenF1Error } from "../../utils/replay/openf1-error";

let attempts = 0;

const requestA = async (): Promise<string> => {
    attempts++;

    console.log(`A attempt ${attempts} at ${Date.now()}`);

    if (attempts === 1) {
        throw new OpenF1Error("Rate limited", 429);
    }

    console.log(`A succeeded at ${Date.now()}`);
    return "A success";
};

const requestB = async (): Promise<string> => {
    console.log(`B started at ${Date.now()}`);
    await delay(100);
    console.log(`B finished at ${Date.now()}`);

    return "B success";
};

const main = async () => {
    const results = await Promise.all([
        scheduleRequest(requestA),
        scheduleRequest(requestB),
    ]);

    console.log("Results:", results);
};

main().catch(console.error);
