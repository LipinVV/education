import { IPassportCallback, IUserRecord } from "../interfaces";

const records: IUserRecord[] = [
    {
        id: 1,
        username: 'user',
        password: '123456',
        displayName: 'demo user',
        emails: [{ value: 'user@mail.ru' }],
    },
    {
        id: 2,
        username: 'jill',
        password: 'birthday',
        displayName: 'Jill',
        emails: [{ value: 'jill@example.com' }],
    },
]

exports.allUsers = records;

exports.findById = function (id: number, cb: IPassportCallback) {
    process.nextTick(function () {
        const idx = id - 1;
        if (records[idx]) {
            cb(null, records[idx]);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    })
}

exports.findByUsername = function (username: string, cb: IPassportCallback) {
    process.nextTick(function () {
        let i = 0, len = records.length;
        for (; i < len; i++) {
            const record = records[i]
            if (record.username === username) {
                return cb(null, record);
            }
        }
        return cb(null, null);
    })
}

exports.verifyPassword = (user: IUserRecord, password: string) => {
    return user.password === password;
}

exports.addUser = function (user: IUserRecord, cb: IPassportCallback) {
    process.nextTick(function () {
        records.push(user);
        cb(null, user);
    });
};
