export class Clases{
    id:string;
    codigo: number;
    categoria: string;
    titulo: string;
    instructor: string;
    duracion: string;
    fecha: string;
    hora: string;

    constructor(id:string,cod: number, cat: string, tl: string, instruc: string, dur: string, fch: string, hr: string) {
        this.id = id;
        this.codigo = cod;
        this.categoria = cat;
        this.titulo = tl;
        this.instructor = instruc;
        this.duracion = dur;
        this.fecha = fch;
        this.hora = hr;
        
    }
}