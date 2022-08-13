interface IObserver {
    update(subject: Subject): void;
}

interface Subject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
}

class Lead {
    constructor(public name: string, public phone: string) {}
}

class NewLead implements Subject {
    private observers: IObserver[] = [];
    public state: Lead;

    attach(observer: IObserver): void {
        if (this.observers.includes(observer)) {
            return;
        }
        this.observers.push(observer);
    }

    detach(observer: IObserver): void {
        const observerIndex = this.observers.indexOf(observer);

        if (observerIndex === -1) {
            return;
        }

        this.observers.splice(observerIndex, 1);
    }

    notify(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

class NotificationService implements IObserver {
    update(subject: Subject): void {
        console.log(`NotificationService get notification`);
        console.log(subject);
    }
}

class LeadService implements IObserver {
    update(subject: Subject): void {
        console.log(`LeadService get notification`);
        console.log(subject);
    }
}

const subject = new NewLead();
subject.state = new Lead('Jenya', '1993');
const n1 = new NotificationService();
const n2 = new LeadService();

subject.attach(n1);
subject.attach(n2);
subject.notify();
subject.detach(n1);
subject.notify();