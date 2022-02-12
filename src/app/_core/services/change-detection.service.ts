import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ChangeDetectionStServise{
    filter$ = new BehaviorSubject('all');
}