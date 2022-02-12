import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';

const routes: Routes = [

    {
        path: '', component: MainLayoutComponent, children : [
            {path: '', redirectTo: '/', pathMatch: 'full'},
            {path: '', component: HomePageComponent}
        ]
    },
    {
        path: 'auth', loadChildren: ()=> import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{
        preloadingStrategy: PreloadAllModules 
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
