import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from 'src/app/apps/home/landing/landing.component';
import {HomeRoutingModule} from 'src/app/apps/home/home-routing.module';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
    declarations: [LandingComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatButtonModule
    ],
    exports: [LandingComponent]
})
export class HomeModule {
}
