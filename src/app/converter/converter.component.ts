import { ApplicationRef, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ConverterServiceService,
  ConversionRequest,
  
} from '../converter-service.service';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  activeContent: string = '';
  Length_Convert: any;
  sourceValue!: number;
  fromUnit!: string;
  toUnit!: string;
  convertedValue?: number;

  showContent(content: string) {
    this.activeContent = content;
  }

  constructor(private converterService: ConverterServiceService,
    private cd: ChangeDetectorRef,private appRef: ApplicationRef ) {}

    convert(type: 'Length' | 'Mass' | 'Time'): void {
     
      const request: ConversionRequest = {
        sourceValue: this.sourceValue,
        fromUnit: this.fromUnit,
        toUnit: this.toUnit,
      };
  
      let conversionMethod;
      switch (type) {
        case 'Length':
          conversionMethod = this.converterService.convertLength(request);
          break;
        case 'Mass':
          conversionMethod = this.converterService.convertMass(request);
          break;
        case 'Time':
          conversionMethod = this.converterService.convertTime(request);
          break;
      }
  
      conversionMethod.subscribe({
        next: (response: number) => {
          this.convertedValue = response;          
          console.log(response);
          
          this.cd.detectChanges();
          this.cd.markForCheck();
          
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
}
