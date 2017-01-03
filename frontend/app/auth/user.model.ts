export class User {
    constructor(public username: string, public password?: string, 
        public firstName?: string, public lastName?: string,
        public mobile?: string, public accessLevel?: string,
        public createdAt?: string, public updatedAt?: string) {}
}