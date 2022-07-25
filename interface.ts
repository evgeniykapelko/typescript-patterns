
enum PaymentStatus {
    Success = 'success',
    Failed = 'failed',
}

interface IPayment {
    sum: number;
    from: number;
    to: number;
}

interface IPaymentRequest extends IPayment {}

interface IDataSuccess extends IPayment {
    databaseId: number;
}

interface IDataFailed {
    errorMessage: string;
    errorCode: number;
}

interface IResponseSuccess {
    status: PaymentStatus.Success;
    data: IDataSuccess;
}

interface IResponseFailed {
    status: PaymentStatus.Failed;
    data: IDataFailed;
}