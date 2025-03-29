export enum StatusCode {
    E200 = 200, // OK
    E400 = 400, // bad request due to client error
    E401 = 401, // authorization error
    E402 = 402, // authentication error
    E403 = 403, // email or password NOT correct
    E404 = 404, // resources NOT found,
    E405 = 405, // need to refresh,
    E406 = 406, // resource has existed,
    E500 = 500  // there is something wrong with server, please try again later
}

export enum Message {
    OK = 'OK',
    ErrFind = 'Cannot find record in the database',
    ErrCreate = 'Cannot create record in the database',
    ErrParams = 'Necessary params NOT provided',
    ErrToken = 'Token is NOT valid',
    AuthorizationError = 'You do NOT have authorization',
    NoAuth = 'Your are not authenticated',
    EmailOrPasswordError = 'Email or password NOT correct',
    UserExist = 'Email has already been registered',
    ServerError = 'There is something wrong with server, please try again later',
}

class Error<T> {
    info: T
    statusCode: StatusCode
    message: Message

    constructor(data: T, statusCode: StatusCode, message: Message){
        this.info = data
        this.statusCode = statusCode
        this.message = message
    }

}

export default Error
