import { OpcionesSlyde } from "./OpcionesSlyde";

export class Slyde{
    public id: number;
    public presentacionId: number;
    public tipoPregunta: number;
    public descripcionPregunta: string;
    public preguntaRealizada : string;
    public cantMaxRespuestaParticipantes : number;
    public opcionesSlydes : OpcionesSlyde[];

    public constructor(tipoPregunta : number){
        this.tipoPregunta = tipoPregunta;
        this.opcionesSlydes = [];
    }
}