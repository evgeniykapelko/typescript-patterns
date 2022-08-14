import { IStreamLogger } from './../../core/prompt/handlers/stream-logger.interface';

export class ConsoleLogger implements IStreamLogger {
    private static instance: IStreamLogger;

    private constructor() {};

    public static getInstance(): IStreamLogger {
        if (!ConsoleLogger.instance) {
            ConsoleLogger.instance = new ConsoleLogger();
        }

        return ConsoleLogger.instance;
    }
    
    log(...args: any[]): void {
        console.log(...args);
    }
    error(...args: any[]): void {
        console.log(...args);
    }
    end(): void {
        console.log('end');
    }

}