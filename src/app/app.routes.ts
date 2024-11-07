import { Routes } from '@angular/router';
import { HomeComponent } from './myComp/home/home.component';
import { SearchComponent } from './myComp/search/search.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'search/:fromStationId/:toStationId/:dateOfTravel',
        component: SearchComponent
    }
];
