interface IUserServiceCatchDecorator {
    users: number;
    getUserInDatabase(): number;
}

class UserServiceCatchDecorator implements IUserServiceCatchDecorator {
    users: number = 1000;

    @Catch({ rethrow: true })
    getUserInDatabase(): number {
        throw new Error('Ошибка')
    }
}

function Catch({ rethrow}: { rethrow: boolean } = { rethrow: true }) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const method = descriptor.value;

        descriptor.value = (...args: any[]) => {
            try {
                return method?.apply(target, args);
            } catch (e) {
                if (e  instanceof Error) {
                    console.log(e.message);
                    if (rethrow) {
                        throw e;
                    }
                }
            }
        }
    }
}

console.log((new UserServiceDecorator().getUserInDatabase()));