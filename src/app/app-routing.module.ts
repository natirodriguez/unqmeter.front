import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home.page/home.page.component';
import { PresentationsComponent } from './components/presentations/presentations.component';
import { PresentationEditionComponent } from './components/presentation-edition/presentation-edition.component';

const routes: Routes = [{path:'login', component: LoginComponent},{path:'', component: HomePageComponent},{path:'presentations', component: PresentationsComponent},
{path:'presentation-edition/:id', component: PresentationEditionComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
