import { Injectable, inject } from '@angular/core';
import {Firestore,addDoc,collection,collectionData,deleteDoc,doc,getDoc,getDocs,query,updateDoc,where,} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { User } from '../Models/User';
const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  currentUser: User | any; // O cualquier objeto que represente al usuario

  private _firestore = inject(Firestore);
  private _collection = collection(this._firestore, PATH);

  constructor(private storage: Storage) { 
    this.init();
  }

  async init() {
    await this.storage.create();
    const user = await this.storage.get('currentUser');
    this.currentUser = user;
  }

  async login(user: User) {
    this.currentUser = user;
    await this.storage.set('currentUser', user);
    console.log('CURRENT USER:' , this.currentUser);
  }

  logout() {
    this.currentUser = null;
    this.storage.remove('currentUser');
  }

  getUsers() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<User[]>;
  }

  async getUser(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as User;
    } catch (error) {
      return undefined;
    }
  }

  async searchUserByQuery(name: string) {
    const q = query(
      this._collection,
      where('nombre', '>=', name),
      where('nombre', '<=', name + '\uf8ff'),
    );
    const querySnapshot = await getDocs(q);
    let users: User[] = [];
    querySnapshot.forEach((doc) => {
      users = [...users, { id: doc.id, ...doc.data() } as User];
    });
    return users;
  }
  
  createUser(user: User) {
    return addDoc(this._collection, user);
  }

  deleteUser(id: string) {
    return deleteDoc(this.document(id));
  }

  updateUser(id: string, user: User) {
    return updateDoc(this.document(id), { ...user });
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

}
