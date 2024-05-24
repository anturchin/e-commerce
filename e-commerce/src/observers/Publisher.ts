import { IObserver } from './Observer.interface';
import { ISubject } from './Subject.interface';

export class Publisher<T> implements ISubject<T> {
    private observers: Map<string, IObserver<T>> = new Map();

    registerObserver(key: string, observer: IObserver<T>): void {
        this.observers.set(key, observer);
    }

    removeObserver(key: string): void {
        this.observers.delete(key);
    }

    notifyObservers(data: T): void {
        this.observers.forEach((observer) => observer.updateData(data));
    }
}
