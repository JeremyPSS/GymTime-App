export class Coach{
    id?: string; //from firestore
    codigo: number;
    nombre: string;
    categoria: string;

    constructor(id:string, cod: number, nom: string, cat: string){
        this.id = id;
        this.codigo = cod;
        this.nombre = nom;
        this.categoria = cat;
    }
}