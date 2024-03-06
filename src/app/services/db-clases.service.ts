import {Firestore,addDoc,collection,collectionData,deleteDoc,doc,getDoc,getDocs,query,updateDoc,where,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Clases } from '../Models/Clases';
const PATH = 'classes';

@Injectable({
  providedIn: 'root'
})
export class DbClasesService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor() { 
  }

  getClases() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Clases[]>;
  }

  async getClass(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Clases;
    } catch (error) {
      return undefined;
    }
  }

  async searchClaseByQuery(title: string) {
    const q = query(
      this._collection,
      where('titulo', '>=', title),
      where('titulo', '<=', title + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let clases: Clases[] = [];
    querySnapshot.forEach((doc) => {
      clases = [...clases, { id: doc.id, ...doc.data() } as Clases];
    });
    return clases;
  }
  
  createClase(clase: Clases) {
    return addDoc(this._collection, clase);
  }

  deleteClase(id: string) {
    return deleteDoc(this.document(id));
  }

  updateClase(id: string, clase: Clases) {
    return updateDoc(this.document(id), { ...clase });
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

}
