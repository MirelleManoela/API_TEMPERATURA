import { Component, OnDestroy, OnInit } from '@angular/core';
import { WheatherService } from '../../services/wheather.service';
import { weatherDatas } from 'src/app/models/interfaces/weather.interface';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrls: []
})
// Usando o ciclo de vida OnInit, ele carrega quando inicializa o component
export class WeatherHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = 'Recife'
weatherDatas!: weatherDatas;
searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WheatherService ){}


  ngOnInit(): void {
   this.getWheatherDatas(this.initialCityName)

  }
  /* Metodo para consumir o serviço */
  getWheatherDatas(cityName: string): void{
    // Fazendo a inscrição no observable com o subscribe
    this.weatherService.getWeatherDatas(cityName)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe({
      /* Fazendo a inscrição para receber o retorno da chamada*/
      next: (response) => {
       response && (this.weatherDatas = response);
       console.log(this.weatherDatas)
      },
      error: (error) => console.log(error),
    })
  }

  //  Metodo para pesquisar a cidade
  onSubmit():void {
    this.getWheatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  // Desescrevendo da assinatura do subscribe, sempre que mudar de rota, esse component é desmontado e executa o ngOnDestroy
  ngOnDestroy(): void {
   this.destroy$.next();
   this.destroy$.complete();
  }

}
