export class FixedDeposit {
    constructor(
        public name?: string,
        public interestType?: string,
        public interest?: Number,
        public specialInterest?: Number,
        public periodType?: string,
        public start?: Number,
        public end?: Number,
        public schemeId?: string,
        public createdBy?: string,
        public updatedBy?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}