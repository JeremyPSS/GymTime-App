import {Firestore,addDoc,collection,collectionData,deleteDoc,doc,getDoc,getDocs,query,updateDoc,where,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Coach } from '../Models/Coach';
const PATH = 'coaches';

@Injectable({
  providedIn: 'root'
})
export class DbCoachService {


  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor() { 
  }

  getCoaches() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Coach[]>;
  }

  async getCoach(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Coach;
    } catch (error) {
      return undefined;
    }
  }

  async searchCoachByQuery(name: string) {
    const q = query(
      this._collection,
      where('nombre', '>=', name),
      where('nombre', '<=', name + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let coaches: Coach[] = [];
    querySnapshot.forEach((doc) => {
      coaches = [...coaches, { id: doc.id, ...doc.data() } as Coach];
    });
    return coaches;
  }
  
  createCoach(coach: Coach) {
    return addDoc(this._collection, coach);
  }

  deleteCoach(id: string) {
    return deleteDoc(this.document(id));
  }

  updateCoach(id: string, coach: Coach) {
    return updateDoc(this.document(id), { ...coach });
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

}
