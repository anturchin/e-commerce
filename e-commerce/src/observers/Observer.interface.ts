export interface IObserver<T> {
    updateData(data: T): void;
}
