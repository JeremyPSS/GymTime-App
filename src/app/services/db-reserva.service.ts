import {Firestore,addDoc,collection,collectionData,deleteDoc,doc,getDoc,getDocs,query,updateDoc,where,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { Reserva } from '../Models/Reserva';
const PATH = 'reservations';

@Injectable({
  providedIn: 'root'
})
export class DbReservaService {

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor() { 
  }

  getReservas() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<Reserva[]>;
  }

  async getReserva(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as Reserva;
    } catch (error) {
      return undefined;
    }
  }

  async searchReservaByQuery(clase: string) {
    const q = query(
      this._collection,
      where('clase', '>=', clase),
      where('clase', '<=', clase + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let reservas: Reserva[] = [];
    querySnapshot.forEach((doc) => {
      reservas = [...reservas, { id: doc.id, ...doc.data() } as Reserva];
    });
    return reservas;
  }
  
  createReserva(reserva: Reserva) {
    return addDoc(this._collection, reserva);
  }

  deleteReserva(id: string) {
    return deleteDoc(this.document(id));
  }

  updateReserva(id: string, reserva: Reserva) {
    return updateDoc(this.document(id), { ...reserva });
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

}
