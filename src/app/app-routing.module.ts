import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home.page/home.page.component';
import { PresentationsComponent } from './components/presentations/presentations.component';
import { PresentationEditionComponent } from './components/presentation-edition/presentation-edition.component';
import { SharePresentacionComponent } from './components/share-presentacion/share-presentacion.component';
import { ResponderPresentacionComponent } from './components/responder-presentacion/responder-presentacion.component';

const routes: Routes = [{path:'login', component: LoginComponent},
{path:'', component: HomePageComponent},
{path:'presentations', component: PresentationsComponent},
{path:'presentation-edition/:id', component: PresentationEditionComponent},
{path:'responder-presentacion/:id', component: ResponderPresentacionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
