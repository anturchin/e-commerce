import { IObserver } from './Observer.interface';

export interface ISubject<T> {
    registerObserver(key: string, observer: IObserver<T>): void;
    removeObserver(key: string): void;
    notifyObservers(data: T): void;
}
