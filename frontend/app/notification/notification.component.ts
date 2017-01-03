import { NotificationService } from './notification.service';
import { selector } from 'rxjs/operator/multicast';
import { Component, OnInit, style } from '@angular/core';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styles: [`
        .backdrop {
            background-color: rgba(0, 0, 0, 0.6);
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
        }
    `]
})

export class NotificationComponent implements OnInit {
    error: Error;
    display = 'none';

    constructor(private notificationService: NotificationService) {}

    onErrorHandled() {
        this.display = 'none';
    }

    ngOnInit() {
        this.notificationService.errorOccurred
            .subscribe(
                (error: Error) => {
                    this.error = error;
                    this.display = 'block';
                }
            );
    }
}