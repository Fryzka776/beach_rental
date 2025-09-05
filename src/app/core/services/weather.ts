import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private url = 'https://api.open-meteo.com/v1/forecast?latitude=54.352&longitude=18.6466&current_weather=true&hourly=temperature_2m,pressure_msl,cloudcover,windspeed_10m,winddirection_10m';

  constructor(private http: HttpClient) {}
  getCurrent() {
    return this.http.get<any>(this.url).pipe(
      map(r => ({
        temp: r.current_weather.temperature,
        pressure: r.hourly.pressure_msl.slice(-1)[0],
        cloud: r.hourly.cloudcover.slice(-1)[0],
        windSpeed: r.current_weather.windspeed,
        windDirDeg: r.current_weather.winddirection,
        time: r.current_weather.time
      }))
    );
  }

  degToDir(deg: number): string {
    const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
    const i = Math.round(deg / 22.5) % 16;
    return dirs[i];
  }
}