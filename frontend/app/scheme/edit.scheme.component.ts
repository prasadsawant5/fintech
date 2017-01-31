import { NotificationService } from '../notification/notification.service';
import { Scheme } from './scheme.model';
import { ErrorService } from '../error/error.service';
import { NgForm } from '@angular/forms/src/directives';
import { SchemeService } from './scheme.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-edit-scheme',
    templateUrl: './edit.scheme.component.html',
    styleUrls: ['../app.component.css']
})

export class EditSchemeComponent implements OnInit {
    constructor(private errorService: ErrorService, private notificationService: NotificationService, private schemeService: SchemeService) {}

    loading: boolean = false;
    schemes: Array<any>;
    scheme: any;
    selected: boolean = false;
    ledgerName: string;
    ledgerType: string;
    ledgerNature: string;
    oldLedgerName: string;


    onChange(scheme) {
        if (scheme === '') {
            this.selected = false;
        } else {
            for (var i = 0; i < this.schemes.length; i++) {
                if (this.schemes[i].ledgerName === scheme) {
                    this.oldLedgerName = scheme;
                    this.scheme = this.schemes[i];
                    this.ledgerName = this.scheme.ledgerName;
                    this.ledgerNature = this.scheme.ledgerNature;
                    this.ledgerType = this.scheme.ledgerType;
                    this.selected = true;
                    break;
                }
            }
        }
    }

    onClick(editSchemeForm: NgForm) {
        editSchemeForm.reset();
        this.selected = false;
    }


    onSave(editScheme: NgForm) {
        this.loading = true;

        if (editScheme.value.ledgerName === null || editScheme.value.ledgerName === '') {
            this.errorService.handleError('Enter a Ledger Name.');
        } else if (editScheme.value.ledgerNature === null || editScheme.value.ledgerNature === '') {
            this.errorService.handleError('Enter a Ledger Nature.');
        } else if (editScheme.value.ledgerType === null || editScheme.value.ledgerType === '') {
            this.errorService.handleError('Enter a Ledger Type.');
        } else {
            this.schemeService.editScheme(this.scheme._id, editScheme.value.ledgerName, this.oldLedgerName)
                .subscribe(
                    data => {
                        if (data.obj !== null) {
                            this.schemeService.getAllSchemes()
                                .subscribe(
                                    data => {
                                        if (data.obj !== null) {
                                            this.schemes = data.obj;
                                        }
                                    },
                                    error => {
                                        this.loading = false;
                                        this.errorService.handleError(error.message);
                                    }
                                );
                            this.loading = false;
                            this.selected = false;
                            this.notificationService.handleNotification(data.message);
                        } else {
                            this.notificationService.handleNotification('Unable to save changes to the Scheme.');
                        }
                    },
                    error => {
                        this.loading = false;
                        this.errorService.handleError(error.message);
                    }
                )
        }

    }


    ngOnInit() {
        this.loading = true;

        this.schemeService.getAllSchemes()
            .subscribe(
                data => {
                    this.loading = false;
                    if (data.obj !== null) {
                        this.schemes = data.obj;
                        console.log(this.schemes);
                    } else {
                        this.errorService.handleError('Schemes not found.');
                    }
                },
                error => {
                    this.loading = false;
                    this.errorService.handleError(error.message);
                }
            );
    }
}