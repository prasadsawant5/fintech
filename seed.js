'use strict';
var Ledger = require('./models/ledger');
var Member = require('./models/member');
var Nominee = require('./models/nominee');

Ledger.remove({})
    .then(() => {
        Ledger.create(
            {
                "name": "DAILY COLLECTION",
                "type": "LIABILITY"
            },
            {
                "name": "FIXED DEPOSIT",
                "type": "LIABILITY"
            },
            {
                "name": "INVESTMENT",
                "type": "ASSET"
            },
            {
                "name": "LOAN ACCOUNT",
                "type": "ASSET"
            },
            {
                "name": "OTHERS",
                "type": "ASSET"
            },
            {
                "name": "RECURRING DEPOSIT",
                "type": "LIABILITY"
            }
        );
    });


Member.remove({})
    .then(() => {
        Member.create(
            {
                "_id": "586d02ecb730c9db1c16d0b5",
                "memberId": "1415674902",
                "firstName": "PRASAD",
                "middleName": "BAJARANG",
                "lastName": "SAWANT",
                "dob": "10-05-1991",
                "panNo": "CXTPS0615M",
                "aadharNo": "224856231613",
                "gender": "MALE",
                "address": "A-1002, SIMRAN RESIDENCY, SECTOR - 7, KHARGHAR, NAVI MUMBAI 410210",
                "mobile": "9987566981",
                "email": "prasadsawant5@gmail.com",
                "companyName": "PLACES",
                "monthlyIncome": "5000",
                "designation": "LEAD ENGINEER",
                "department": "ENGINEERING",
                "officeAddress": "255 N MARKET ST., SAN JOSE CA 95050",    
                "isActive": "true",
                "createdBy": "585849736a807194f7782500"
            },
            {
                "_id": "586d02ecb730c9db1c16d0b6",
                "memberId": "1415671492",
                "firstName": "BAJARANG",
                "middleName": "RAMCHANDRA",
                "lastName": "SAWANT",
                "dob": "11-06-1954",
                "panNo": "AAEPS6894G",
                "aadharNo": "490526003610",
                "gender": "MALE",
                "address": "A-1002, SIMRAN RESIDENCY, SECTOR - 7, KHARGHAR, NAVI MUMBAI 410210",
                "mobile": "9322519933",
                "email": "brsawant_ca@yahoo.co.in",
                "companyName": "B R SAWANT & CO.",
                "monthlyIncome": "50000",
                "designation": "CHARTERED ACCOUNTANT",
                "department": "ACCOUNTING",
                "officeAddress": "APMC MARKET, TURBHE, NAVI MUMBAI 400705",    
                "isActive": "true",
                "createdBy": "585849736a807194f7782500"
            }
        );
    });

    Nominee.remove({})
        .then(() => {
            Nominee.create(
                {  
                    "_id": "585849736a807194f7782400",
                    "firstName": "BAJARANG",
                    "middleName": "RAMCHANDRA",
                    "lastName": "SAWANT",
                    "age": 60,
                    "relation": "FATHER",
                    "memberId": "586d02ecb730c9db1c16d0b5",
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                },
                {  
                    "_id": "585849736a807194f7782401",
                    "firstName": "BAJARANG",
                    "middleName": "RAMCHANDRA",
                    "lastName": "SAWANT",
                    "age": 60,
                    "relation": "FATHER",
                    "memberId": "586d02ecb730c9db1c16d0b6",
                    "createdAt": new Date(),
                    "updatedAt": new Date()
                }
            )
        });