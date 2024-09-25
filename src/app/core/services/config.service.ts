import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) { }

  loadConfig() {
    const configPath = 'assets/appsettings.json';
    return this.http.get(configPath)
      .toPromise()
      .then((data) => {
        this.config = data;
      });
  }

  get apiUrl(): string {
    return this.config?.apiUrl || '';
  }

}
