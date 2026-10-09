import { delay } from "../delay";

const REQUEST_INTERVAL_MS = 500;

export const runSequentially = async <T>(tasks:(() => Promise<T>)[]) => {
    const results: T[] = [];
    const maximumRetries = 3;

    for(const task of tasks){
        let retries = 0;
        while(true){
            try {
                const result = await task();
                results.push(result);
                break;
            }
            catch(error){
                if(error instanceof Error && "status" in error && error.status === 429){
                    if(retries >= maximumRetries){
                        throw error;
                    }
                    retries++;

                    const delayMs = 1000 * 2 ** (retries - 1);  // exponential delay time 1-2-4 for 3 tries
                    console.log(`429 received. Retrying in ${delayMs}ms...`);
                    await delay(delayMs);
                }
                else{
                    throw error;
                }
            }
        }
    }
    
    return results;
}