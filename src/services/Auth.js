import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import { cloudService } from './CloudService';

class AuthService {
  constructor() {
    this.auth = getAuth(cloudService.app);
    this._user = null;
  }

  authorizeUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        },
      );
    });
  }

  signIn(email, password) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signUp(email, password) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  signOut() {
    return signOut(this.auth);
  }
}

export const authService = new AuthService();
