interface IUserServiceMethodDecorator {
    users: number;
    getUserInDatabase(): number;
}

class UserServiceMethodDecorator implements IUserServiceMethodDecorator {
    users: number = 1000;

    @Log()
    getUserInDatabase(): number {
        return this.users;
    }
}

function Log() {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);
        descriptor.value = () => {
            console.log('no error');
        }
    }
}

console.log((new UserServiceDecorator() as IUserServiceDecorator & CreatedAt).createdAt);