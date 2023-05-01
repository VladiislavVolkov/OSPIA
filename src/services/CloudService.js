import { initializeApp } from 'firebase/app';

class CloudService {
  constructor() {
    this._config = {
      apiKey: process.env.API_KEY,
      authDomain: 'ospia-60c9b.firebaseapp.com',
      projectId: 'ospia-60c9b',
      storageBucket: 'ospia-60c9b.appspot.com',
      messagingSenderId: '770920911344',
      appId: '1:770920911344:web:06a229a6cdeb27e0b34d35',
    };
    this.app = initializeApp(this._config);
  }
}

export const cloudService = new CloudService();
