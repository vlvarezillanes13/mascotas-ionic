import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'mascotas', loadChildren: () => import('./pages/mascotas/mascotas.module').then( m => m.MascotasPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule) },
  { path: '**', redirectTo:'mascotas', pathMatch:'full'}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution:'corrected'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
