class User {
    constructor(public userId: number) {}
}

class CommandHistory {
    public commands: Command[] = [];

    push(command: Command) {
        this.commands.push(command);
    }

    remove(command: Command) {
        this.commands = this.commands.filter(c => c.commandId !== command.commandId);
    }
}


abstract class Command {
    public commandId: number;

    abstract execute(): void;

    constructor(public history: CommandHistory) {
        this.commandId = Math.random();
    }
}

class AddUserCommand extends Command {
    constructor(
        private user: User,
        private receiver: UsersService,
        public history: CommandHistory
    ) {
        super(history);
    }

    execute(): void {
        this.receiver.saveUser(this.user);
        this.history.push(this);
    }

    undo() {
        this.receiver.deleteUser(this.user.userId)
        this.history.remove(this);
    }
}

class UsersService {
    saveUser(user: User) {
        console.log(`saveUser ${user.userId}`);
    }

    deleteUser(userId: number) {
        console.log(`deleteUser ${userId}`);
    }
}

class UsersController {
    receiver: UsersService;
    history: CommandHistory = new CommandHistory();

    addReceiver(receiver: UsersService) {
        this.receiver = receiver;
    }

    run() {
        const addUserCommand = new AddUserCommand(
            new User(1),
            this.receiver,
            this.history
        );
        addUserCommand.execute();
        console.log(addUserCommand.history);
        addUserCommand.undo();
        console.log(addUserCommand.history);
    }
}

const controllerCP = new UsersController();
controllerCP.addReceiver(new UsersService());
controllerCP.run();