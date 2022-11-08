export class Respuesta{
    public id: number;
    public slydeId: number;
    public participante: string;
    public descripcionesRespuesta: Array<DescripcionRespuesta>;
    public descripcionGeneral: string;
}

export class DescripcionRespuesta{
    public id: number; 
    public respuestaId: number; 
    public descripcion: string; 
}