export class OpenF1Error extends Error {
    status: number;

    constructor(message: string, status: number){
        super(message);
        this.status = status;
        this.name = "OpenF1Error"
    }
}