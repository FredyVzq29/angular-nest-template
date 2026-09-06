import { Component } from '@angular/core';
import { IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    standalone: true,
    imports: [IonLabel, IonIcon, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class Tab2Page {}
