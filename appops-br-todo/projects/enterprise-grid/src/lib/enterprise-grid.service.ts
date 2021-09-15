import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseGridService {
  public refresh: EventEmitter<EnterpriseGridService> = new EventEmitter<EnterpriseGridService>();
  constructor() { }
}