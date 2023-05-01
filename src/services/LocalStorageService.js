import { APP_EVENTS } from '../constants/appEvents';
import { eventEmitter } from '../core/EventEmitter';

class LocalStorageService {
  constructor() {
    this.storage = window.localStorage;
  }

  // добавить данные
  setItem(key, value) {
    try {
      this.storage.setItem(key, JSON.stringify(value));
      eventEmitter.emit(APP_EVENTS.storage, { data: this.getItem(key) });
    } catch (error) {
      console.error(error);
    }
  }

  // получить данные
  getItem(key) {
    try {
      return JSON.parse(this.storage.getItem(key));
    } catch (error) {
      console.error(error);
    }
  }

  // удалить данные
  removeItem(key) {
    this.storage.removeItem(key);
    eventEmitter.emit(APP_EVENTS.storage, { data: this.getItem(key) });
  }

  // очистить всё
  clear() {
    this.storage.clear();
    eventEmitter.emit(APP_EVENTS.storage, { data: null });
  }
}

export const localStorageService = new LocalStorageService();
