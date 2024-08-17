import { Server as SocketIOServer } from 'socket.io';

interface IBook {
    id: string;
    title: string;
    description: string;
    authors: string;
    favorite: boolean;
    fileCover: string;
    fileName: string;
    fileBook: string;
}

interface IWebsocketConnector {
    (io: SocketIOServer): void;
}

interface IUser {
    id: string;
    username: string;
    password: string;
}

type UserEmail = {
    value: string,
}

interface IUserRecord extends IUser{
    displayName: string,
    emails: UserEmail[]
}

type ServerError = Error | null
type IPassportCallback = (err?: ServerError, user?: IUser | string) => void
type IPassportDone = (err?: ServerError, status?: IUser | boolean) => void

export { IBook, IWebsocketConnector, IUser, IPassportCallback, IUserRecord, IPassportDone }
