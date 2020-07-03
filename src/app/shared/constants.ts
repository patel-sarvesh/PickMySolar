export const Roles = [ 'Admin', 'Student', 'Teacher' ];

export const SnackBarTimeDuration = {
    timeInSecond: 2 * 1000
}

export const StorageKeys = {
    // we can remove password from user model once we get token
    User: 'user',
    Token: 'token',
    // this we can remove once we add token logic
    IsLogin: 'isLogin'
}

export const DisplayedColumns: string[] = ['id', 'name', 'emailId', 'role', 'createdDate'];

export const TablePageSizeOptions: number[] = [10, 25, 50];