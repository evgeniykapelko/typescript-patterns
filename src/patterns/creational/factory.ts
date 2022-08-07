interface IInsurence {
    id: number;
    status: string;
    setVehicle(vehicle: any): void;
    submit(): Promise<boolean>;
}

class TFInsurence implements IInsurence {
    id: number;
    status: string;
    private vehicle: any;

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle;
    }

    async submit(): Promise<boolean> {
        const res = await fetch('',
        {
            method: 'POST',
            body: JSON.stringify({vehicle: this.vehicle})

        });
        const data = await res.json();
        return data.isSuccess;
    }
}

class ABInsurence implements IInsurence {
    id: number;
    status: string;
    private vehicle: any;

    setVehicle(vehicle: any): void {
        this.vehicle = vehicle;
    }

    async submit(): Promise<boolean> {
        const res = await fetch('ab',
        {
            method: 'POST',
            body: JSON.stringify({vehicle: this.vehicle})

        });
        const data = await res.json();
        return data.yes;
    }
}

abstract class InsurenceFactory {
    db: any;
    abstract createInsurance(): IInsurence;

    saveHistory(ins: IInsurence) {
        this.db.save(this.id, ins.status);
    }
} 

class TFInsurenceFactory extends InsurenceFactory {
    createInsurance(): TFInsurence {
        return new TFInsurence();
    }
}

class ABInsurenceFactory extends InsurenceFactory {
    createInsurance(): ABInsurence {
        return new ABInsurence();
    }
}

const tfInsurenceFactory = new TFInsurenceFactory();
const ins = tfInsurenceFactory.createInsurance();

tfInsurenceFactory.saveHistory(ins);





const INSURENCE_TYPE = {
    tf: TFInsurence,
    ab: ABInsurence
};

type IT = typeof INSURENCE_TYPE;

class InsurenceFactoryAlt {
    db: any;

    createInsurence<T extends keyof IT>(type: T): IT[T] {
        return INSURENCE_TYPE[type];
    }

    saveHistory(ins: IInsurence) {
        this.db.save(ins.id, ins.status);
    }
}

const insurenceFactoryAlt = new InsurenceFactoryAlt();
const ins2 = new (insurenceFactoryAlt.createInsurence('tf'));
insurenceFactoryAlt.saveHistory(ins2);