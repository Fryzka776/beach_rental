import { Component, inject, OnInit } from '@angular/core';
import { EquipmentService } from '../../core/services/equipment';
import { WeatherService } from '../../core/services/weather';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent implements OnInit{

  private ws = inject(WeatherService);
  private es = inject(EquipmentService);
  weather$ = this.ws.getCurrent();
  equipment$ = this.es.equipment$;
  constructor() {}

  ngOnInit(): void {}

  windDir(d: number){ 
    return this.ws.degToDir(d);
  }
}
