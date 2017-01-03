import { EventEmitter } from '@angular/forms/src/facade/async';

export class ErrorService {
    errorOccurred = new EventEmitter<Error>();

    handleError(message: string) {
        const errorData = new Error(message);
        this.errorOccurred.emit(errorData);
    }
}