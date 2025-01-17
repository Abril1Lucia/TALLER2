import { TestBed } from '@angular/core/testing';
//c trae lo que se quiere testear
import { EjemploService } from './ejemplo.service';

describe('EjemploService', () => {
  let service: EjemploService;
  //el beforeEach ews distinto we
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EjemploService]
    });

    service = TestBed.inject(EjemploService);
  });

  

  it('debe crearse el servivio', () => {
    expect(service).toBeTruthy();
  });

  it('debe sumar dos numeros', () => {
    const resultado = service.suma(2,5)
    expect(resultado).toBe(7)
  });


});
