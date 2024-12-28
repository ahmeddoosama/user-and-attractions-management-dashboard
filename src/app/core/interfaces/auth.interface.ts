export interface IAuthModel {
    username: string;
    password: string;
}

export interface IAuthResponse {
    status: string;
    message: string;
    accessToken: string;
    expiresIn: number;
    user: IUser;
}

export interface IUser {
    id: number;
    fname: string;
    lname: string;
    username: string;
    password: string;
    email: string;
    avatar: string;
}
