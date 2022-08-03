interface IUserServicePropertyDecorator {
    users: number;
    getUserInDatabase(): number;
}

class UserServicePropertyDecorator implements IUserServicePropertyDecorator {
    @Max(100)
    users: number = 1000;

    getUserInDatabase(): number {
        throw new Error('Ошибка')
    }
}

function Max(max: number) {
    return (
        target: Object,
        propertyKey: string | symbol
    ) => {
        let value: number;
        const setter = function (newValue: number) {
            if (newValue > max) {
                console.log(`Not set ${max}`)
            } else {
                value = newValue
            }
        }

        const getter = function () {
            return value
        }

        Object.defineProperty(target, propertyKey, {
            set: setter,
            get: getter
        })
    }
}
const userService = new UserServicePropertyDecorator();
userService.users = 1;
console.log(userService.users);
userService.users = 1000;
console.log(userService.users);
