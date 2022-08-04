interface IUserServiceParamDecorator {
    getUserInDatabase(): number;
}

class UserServiceParamDecorator implements IUserServiceParamDecorator {
    private _users: number;

    getUserInDatabase(): number {
        return this._users;
    }

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
       console.log(target);
       console.log(propertyKey);
       console.log(parameterIndex);
    }
}
const userServiceParam = new UserServiceParamDecorator();

