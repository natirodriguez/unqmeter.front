import { NgModule } from '@angular/core';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

export class Presentacion{
    public nombre!: string;
    public usuarioCreador!: string;
    public fechaCreacion!: string;
    public tiempoDeVida!: number;
    public tipoTiempoDeVida!: number;
}