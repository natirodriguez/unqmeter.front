import { Answer } from "./Answer";
import { OpcionesSlyde } from "./OpcionesSlyde";
import { Respuesta } from "./Respuesta";

export class Slyde{
    public id: number;
    public presentacionId: number;
    public tipoPregunta: number;
    public descripcionPregunta: string;
    public preguntaRealizada : string;
    public cantMaxRespuestaParticipantes : number;
    public opcionesSlydes : OpcionesSlyde[];
    public respuestas : Respuesta[];
    public habilitadoParaResponder: boolean;
    public answers: Answer[];

    public constructor(tipoPregunta : number){
        this.tipoPregunta = tipoPregunta;
        this.opcionesSlydes = [];
    }
}