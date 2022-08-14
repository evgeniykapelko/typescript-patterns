import { StreamHandler } from './../../core/prompt/handlers/stream.handler';
import { FfmpegBuilder } from './ffmpeg.builder';
import { FileService } from './../../core/files/file.service';
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { CommandExecutor } from "../../core/prompt/executor/command.executor";
import { ICommandExec } from "../../core/prompt/executor/command.types";
import { IStreamLogger } from "../../core/prompt/handlers/stream-logger.interface";
import { IFfmpegInput, ICommandExecFfmpeg } from "./ffmpeg.types";
import { PromptService } from '../../core/prompt/prompt.service';

export class FfmpegExecutor extends CommandExecutor<IFfmpegInput>
{
    private fileService: FileService = new FileService();
    private promptService: PromptService = new PromptService();

    constructor(logger: IStreamLogger) {
        super(logger);
    }

    protected async prompt(): Promise<IFfmpegInput> {
        const width = await this.promptService.input<number>('Width', 'number');
        const height = await this.promptService.input<number>('Height', 'number');
        const path = await this.promptService.input<string>('Path to file', 'number');
        const name = await this.promptService.input<string>('Name', 'number');

        return { width, height, path, name };
    }

    protected build({ width, height, path, name }: IFfmpegInput): ICommandExecFfmpeg {
        const output = this.fileService.getFilePath(path, name, 'mp4');
        const args = (new FfmpegBuilder)
            .input(path)
            .setVideoSize(width, height)
            .output(output);
        
        return { command: 'ffmpeg', args, output }
    }

    protected spawn({output, command, args}: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
        this.fileService.deleteFileIfExists(output);

        return spawn(command, args);
    }
    protected processStream(stream: ChildProcessWithoutNullStreams, logger: IStreamLogger): void {
        const handler = new StreamHandler(logger);
        handler.processOutput(stream);
    }
    
}