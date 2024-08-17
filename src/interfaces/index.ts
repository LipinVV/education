import { Server as SocketIOServer } from 'socket.io';
import { Request } from "express";

interface IBook {
    id: string
    title: string
    description: string
    authors: string
    favorite: boolean
    fileCover: string
    fileName: string
    fileBook: string
}

interface IWebsocketConnector {
    (io: SocketIOServer): void
}

interface IUser {
    id: number
    username: string
    password: string
}

type UserEmail = {
    value: string
}

interface IUserRecord extends IUser {
    displayName: string
    emails: UserEmail[]
}

type ServerError = Error | null
type IPassportCallback = (err?: ServerError, user?: IUser | number) => void
type IPassportDone = (err?: ServerError, status?: IUser | boolean) => void
type DiskStorageCallback = (error: Error | null, info: string) => void

interface IExtendedRequest extends Request {
    user: IUserRecord
    id?: string
    isAuthenticated?: () => boolean
    logout?: (err: unknown) => void
}

export {
    IBook,
    IWebsocketConnector,
    IUser,
    IPassportCallback,
    IUserRecord,
    IPassportDone,
    DiskStorageCallback,
    IExtendedRequest
}
