import { NotificationService } from '../notification/notification.service';
import { Scheme } from './scheme.model';
import { ErrorService } from '../error/error.service';
import { NgForm } from '@angular/forms/src/directives';
import { SchemeService } from './scheme.service';
import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-new-scheme',
    templateUrl: './add.new.scheme.component.html',
    styleUrls: ['./add.new.scheme.component.html']
})

export class AddNewSchemeComponent implements OnInit {

    constructor(private schemeService: SchemeService, private errorService: ErrorService, private notificationService: NotificationService) {}

     ledgers: any;
     ledgerId: string;
     ledgerNature: string;
     notificationFlag: boolean = false;
     errFlag: boolean = false;
     successFlag: boolean = false;
     loading: boolean = false;

     errMessage: string;
     successMessage: string;
     nature: string;


    onSave(newSchemeForm: NgForm) {

        this.loading = true;
        if (this.ledgerNature === null || this.ledgerNature === '')
            this.errorService.handleError('Please select a Ledger Nature.');
        else if (newSchemeForm.value.ledgerName === null || newSchemeForm.value.ledgerName === '')
            this.errorService.handleError('Please enter a Ledger Name.');
        else if (newSchemeForm.value.ledgerType === null || newSchemeForm.value.ledgerType === '')
            this.errorService.handleError('Ledger Type not specified.');
        else {
            const scheme = new Scheme(
                this.ledgerId,
                this.ledgerNature.toUpperCase(),
                newSchemeForm.value.ledgerName.toUpperCase(),
                newSchemeForm.value.ledgerType.toUpperCase(),
                null,
                null,
                null,
                null
            );

            this.schemeService.createScheme(scheme)
                .subscribe(
                    data => {
                        this.loading = false;
                        newSchemeForm.reset();
                        this.notificationService.handleNotification(data.message);
                    },
                    error => {
                        this.loading = false;
                        this.errorService.handleError(error.message);
                    }
                );
        }

    }


    onChange(parentLedgerName) {

        if (this.ledgers.length > 0) {
            for (var i = 0; i < this.ledgers.length; i++) {
                if (this.ledgers[i].name === parentLedgerName) {
                    this.ledgerId = this.ledgers[i]._id;
                    this.nature = this.ledgers[i].type;
                    this.ledgerNature = this.ledgers[i].name;
                    break;
                }
            }
        }
    }


    ngOnInit() {
        this.schemeService.getAllLedgers()
            .subscribe(
                data => {
                    if (data.obj !== null) {
                        this.ledgers = data.obj;
                    }
                },
                error => {
                    this.errorService.handleError('Unable to find all the ledgers at this moment.');
                }
            )
    }

}