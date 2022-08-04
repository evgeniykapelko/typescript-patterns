import 'reflect-metadata';

const POSITIVE_METADATA_KEY = Symbol('POSITIVE_METADATA_KEY');

interface IUserServiceParamDecorator {
    getUserInDatabase(): number;
}

class UserServiceParamDecorator implements IUserServiceParamDecorator {
    private _users: number;

    getUserInDatabase(): number {
        return this._users;
    }

    @Validate()
    setUsersInDatabase(@Positive() num: number): void {
        this._users = num;
    }
 
}

function Positive() {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
       console.log(Reflect.getOwnMetadata('design:type', target, propertyKey));
       console.log(Reflect.getOwnMetadata('design:paramtypes', target, propertyKey));
       console.log(Reflect.getOwnMetadata('design:returntype', target, propertyKey));
        
       let existParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
       existParams.push(parameterIndex);
    
       Reflect.defineMetadata(POSITIVE_METADATA_KEY, existParams, target, propertyKey);
    }
}

function Validate() {
    return (
        target: Object,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ) => {
        const method = descriptor.value;

        descriptor.value = function (...args: any) {
            let positivParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
        
            if (positivParams) {
                for (let index of positivParams) {
                    if (args[index] < 0) {
                        throw new Error('Number must be > 0')
                    }
                }
            }

            return method?.apply(this, args);
        }
    }
}
const userServiceParam = new UserServiceParamDecorator();
console.log(userServiceParam.setUsersInDatabase(10));
//console.log(userServiceParam.setUsersInDatabase(-1));

