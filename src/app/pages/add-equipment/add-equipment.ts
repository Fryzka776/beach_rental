import { Component } from '@angular/core';
import { EquipmentType } from '../../models';
import { EquipmentService } from '../../core/services/equipment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-equipment',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-equipment.html',
  styleUrl: './add-equipment.scss'
})
export class AddEquipmentComponent {

  types: EquipmentType[] = ['ręcznik','parasol','leżak','parawan'];
  type: EquipmentType = 'ręcznik';
  name = ''; 
  available = 1; 
  pricePerDay = 10;

  constructor(private es: EquipmentService) {}

  submit(){
    this.es.addEquipment(this.type, this.name, this.available, this.pricePerDay);
    alert('Dodano nowy sprzęt');
    this.type='ręcznik';
    this.name='';
    this.available=1;
    this.pricePerDay=10;
  }
}
