export class Slyde{
    public id: number;
    public presentacionId: number;
    public tipoPregunta: number;
    public descripcionPregunta: string;
    public preguntaRealizada : string;
    public cantMaxRespuestaParticipantes : number;

    public constructor(tipoPregunta : number){
        this.tipoPregunta = tipoPregunta;
    }
}