import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  /* Qualquer componente, independente do modulo vai ter acesso a esse serviço*/
  providedIn: 'root'
})
export class WheatherService {
private apiKey = 'c6899ebcce5d6d498906f76d390e0849';

constructor(private http: HttpClient) {}

getWeatherDatas(cityName: string): Observable<any>{
  return this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&mode=json&appid=${this.apiKey}`,
    {}
  );
}

}

