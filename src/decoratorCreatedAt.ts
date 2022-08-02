interface IUserServiceDecorator {
    users: number;
    getUserInDatabase(): number;
}

@createdAt
class UserServiceDecorator implements IUserServiceDecorator {
    users: number = 1000;

    getUserInDatabase(): number {
        return this.users;
    }
}

function createdAt<A extends { new(...args: any[]): {} }>(constructor: A) {
    return class extends constructor {
        createdAt = new Date();
    }
}

type CreatedAt = {
    createdAt: Date;
}

console.log((new UserServiceDecorator() as IUserServiceDecorator & CreatedAt).createdAt);