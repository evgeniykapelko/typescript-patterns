class Notify {
    send(template: string, to: string) {
        console.log(`Send ${template}: ${to}`);
    }
}

class Logger {
    log(message: string) {
        console.log(message);
    }
}

class Template {
    private template = [
        {name: 'other', template: '<h1>Шаблон</h1>'}
    ];

    getByName(name: string) {
        return this.template.find(t => t.name === name);
    }

}

class NotificationFacade {
    private notify: Notify;
    private logger: Logger;
    private template: Template;
    
    constructor() {
        this.logger = new Logger();
        this.notify = new Notify();
        this.template = new Template();
    }
    send(to: string, templateName: string) {
        const data = this.template.getByName(templateName);

        if (!data) {
            this.logger.log('Not find template');
            return;
        }

        this.notify.send(data.template, to);
        this.logger.log('Template has been send');
    }
}


const s = new NotificationFacade();

s.send('admin@admin.com', 'other');
