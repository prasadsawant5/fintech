import { EventEmitter } from '@angular/forms/src/facade/async';

export class NotificationService {
    errorOccurred = new EventEmitter<Error>();

    handleNotification(message: string) {
        const notificationDate = new Error(message);
        this.errorOccurred.emit(notificationDate);
    }
}