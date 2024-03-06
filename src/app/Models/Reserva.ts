export class Reserva{
    id?: string; //from firestore
    codigo: number;
    clase: string;
    hora: string;
    fecha: string;
    instructor: string;

    constructor(id:string, cod: number, cls: string, hr: string, fch: string, inst: string){
        this.id = id;
        this.codigo = cod;
        this.clase = cls;
        this.hora = hr;
        this.fecha = fch;
        this.instructor = inst;
    }
}