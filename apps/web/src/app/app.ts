import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Welcome } from "./welcome/welcome";

@Component({
    imports: [RouterModule, Welcome],
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
})
export class App {
    protected title = 'my-angular-nest-app';
}
