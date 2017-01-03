export class FixedDeposit {
    constructor(
        public name?: string,
        public interestType?: string,
        public interest?: Number,
        public specialInterest?: Number,
        public interestCalculation?: string,
        public periodType?: string,
        public to?: Number,
        public from?: Number,
        public schemeId?: string,
        public createdBy?: string,
        public updatedBy?: string,
        public createdAt?: Date,
        public updatedAt?: Date
    ) {}
}