interface Mediator {
    notify(sender: string, event: string): void;

}

abstract class Mediated {
    mediator: Mediator;
    setMediator(mediator: Mediator) {
        this.mediator = mediator;
    }
}

class Notofications {
    send () {
        console.log('Send');
    }
}

class NotoficationLogger {
    log(message: string) {
        console.log(message)
    }
}

class EventHandler extends Mediated {
    myEvent() {
        this.mediator.notify('EventHandler', 'myEvent');
    }
}

class NotoficationMediator implements Mediator {
    constructor(
        public notifications: Notofications,
        public logger: NotoficationLogger,
        public handler: EventHandler
    ) {

    }
    notify(sender: string, event: string): void {
        switch(event) {
            case 'myEvent':
                this.notifications.send();
                this.logger.log('send');
                break;
        }
    }
}

const handler = new EventHandler();
const logger = new NotoficationLogger();
const notifications = new Notofications();

const m = new NotoficationMediator(
    notifications,
    logger,
    handler
);
handler.setMediator(m);
handler.myEvent();