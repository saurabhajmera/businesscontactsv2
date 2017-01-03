import { Injectable } from '@angular/core';

@Injectable()
export class ApplicationStateService {
  appState:string;

  constructor() {
    this.appState = 'default';
  }

}
