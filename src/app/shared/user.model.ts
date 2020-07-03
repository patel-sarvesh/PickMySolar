
export class User {
    name: string;
    username: string;
    emailId: string;
    createdDate: string;
    id: number;
    role: string;
    // we can remove password from user model once we get token
    password?: string;
    profileImage?: string;
    coverImage?: string;
}