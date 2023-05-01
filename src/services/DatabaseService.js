import {
  addDoc,
  collection,
  getFirestore,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { cloudService } from './CloudService';

class DatabaseService {
  constructor() {
    this.database = getFirestore(cloudService.app);
  }

  createDocument(collectionKey, body) {
    const collectionRef = collection(this.database, collectionKey);
    return addDoc(collectionRef, body);
  }

  getCollection(collectionKey) {
    const collectionRef = collection(this.database, collectionKey);
    return getDocs(collectionRef).then((document) => {
      return document.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    });
  }

  getDocument(collectionKey, id) {
    const documentRef = doc(this.database, collectionKey, id);
    return getDoc(documentRef).then((data) => data.data());
  }

  updateDocument(collectionKey, id, body) {
    const document = doc(this.database, collectionKey, id);
    return updateDoc(document, body);
  }

  deleteDocument(collectionKey, id) {
    const document = doc(this.database, collectionKey, id);
    return deleteDoc(document);
  }
}

export const databaseService = new DatabaseService();
