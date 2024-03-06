export class User{
    id?: string; //from firestore
    nombre: string;
    apellido: string;
    email: string;
    password: string;

    constructor(id:string, nom: string, apel: string, email: string, pass: string){
        this.id = id;
        this.nombre = nom;
        this.apellido = apel;
        this.email = email;
        this.password = pass;
    }
}