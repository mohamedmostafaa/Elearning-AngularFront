import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  baseURL = 'http://localhost:3000'


  constructor() { }
}
