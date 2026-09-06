import { Component } from '@angular/core';
import { IonButton, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    standalone: true,
    imports: [IonButton, IonIcon, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab3Page {}
