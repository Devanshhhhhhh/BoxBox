import { delay } from "../delay";

// controls the order
let requestQueue: Promise<void> = Promise.resolve();


const REQUEST_INTERVAL_MS = 500;
let lastRequestTime = 0;

// Request spacer
const waitForRequestSlot = async () => {
    const elapsed = Date.now() - lastRequestTime;
    const remaining = REQUEST_INTERVAL_MS - elapsed;

    if(remaining > 0){
        await delay(remaining);
    }

    lastRequestTime = Date.now();
}

export const scheduleRequest = async <T>(task: () => Promise<T>): Promise<T> => {
    const currentRequest =  requestQueue.then(async () => {
        let retries = 0;
        const maximumRetries = 3;
        
        while(true){
            await waitForRequestSlot();
            
            try {
                return await task();
            } catch (error) {
                if (error instanceof Error && "status" in error && error.status === 429) {
                    if (retries >= maximumRetries) {
                        throw error;
                    }
                    retries++;

                    const delayMs = 1000 * 2 ** (retries - 1);
                    console.log(`429 received. Retrying in ${delayMs}ms...`);
                    
                    await delay(delayMs);
                } else{
                    throw error;
                }
            }
        }    
    })

    requestQueue = currentRequest.then(
        () => undefined,
        () => undefined
    );

    return currentRequest;
}

// performs the actual request and handle it
export const runSequentially = async <T>(tasks:(() => Promise<T>)[]) => {
    const results: T[] = [];

    for(const task of tasks){
        const result = await scheduleRequest(task);
        results.push(result);
    }
    
    return results;
}