interface IUserServiceAccessorDecorator {
    getUserInDatabase(): number;
}

class UserServiceAccessorDecorator implements IUserServiceAccessorDecorator {
    private _users: number;

    @LogAccessor()
    set users(num: number) {
        this._users = num;
    }

    get users() {
        return this._users;
    }

    getUserInDatabase(): number {
        throw new Error('Error');
    }

}

function LogAccessor() {
    return (
        target: Object,
        _: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
       const set = descriptor.set;
       descriptor.set = (...args: any) => {
        console.log(args);
        set?.apply(target, args);
       }
    }
}
const userServiceAccessor = new UserServiceAccessorDecorator();
userServiceAccessor.users = 1;
console.log(userServiceAccessor.users);

