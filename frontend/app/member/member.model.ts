export class Member {
    constructor(
        public memberId?: string,
        public firstName?: string,
        public middleName?: string,
        public lastName?: string,
        public dob?: Date,
        public panNo?: string,
        public aadharNo?: string,
        public gender?: string,
        public address?: string,
        public mobile?: string,
        public email?: string,
        public companyName?: string,
        public monthlyIncome?: Number,
        public designation?: string,
        public department?: string,
        public officeAddress?: string,
        public nomineeFirstName?: string,
        public nomineeMiddleName?: string,
        public nomineeLastName?: string,
        public nomineeAge?: number,
        public nomineeRelation?: string,
        public isActive?: boolean,
        public createdBy?: string        
    ) {}
}