class EventEmitter {
  constructor() {
    this.eventTarget = document.appendChild(document.createComment('event-emitter'));
  }

  // слушает событие на которое подписывается
  // type- тип события
  // listner - обычный callback (вызван когда тип события произойдет)
  on(type, listner) {
    this.eventTarget.addEventListener(type, listner);
  }

  // отписывается от события
  off(type, listner) {
    this.eventTarget.removeEventListener(type, listner);
  }

  // главный метод - оповещает всех слушателей (кто подписался на кокое-то событие)
  // detail - данные которые хотим передать через событие
  emit(type, detail) {
    const customEvent = new CustomEvent(type, { detail });
    return this.eventTarget.dispatchEvent(customEvent);
  }
}

export const eventEmitter = new EventEmitter();
