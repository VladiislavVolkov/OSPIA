import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { cloudService } from './CloudService';

class FirebaseStorageService {
  constructor() {
    this.storage = getStorage(cloudService.app);
  }

  uploadFile(file, path) {
    const fileRef = ref(this.storage, `${path}/${file.name}`);
    return uploadBytes(fileRef, file);
  }

  downloadURL(ref) {
    return getDownloadURL(ref);
  }
}

export const firebaseStorageService = new FirebaseStorageService();
