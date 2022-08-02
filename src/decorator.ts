interface IUserService {
    users: number;
    getUserInDatabase(): number;
}

@setUserAdvanced(2)
@setUsers(4)
//@threeUserAdvanced
//@nullUser
class UserService implements IUserService {
    users: number = 1000;

    getUserInDatabase(): number {
        return this.users;
    }
}

function nullUser(target: Function) {
    target.prototype.users = 0;
}

function setUsers(users: number) {
    return (target: Function) => {
        target.prototype.users = 0;
    }
}

function setUserAdvanced(users: number) {
    return <T extends { new(...args: any[]): {} }>(constructor: T) => {
        return class extends constructor {
            users = users;
        }
    }
}

function threeUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        users = 3;
    }
}

console.log(new UserService().getUserInDatabase());