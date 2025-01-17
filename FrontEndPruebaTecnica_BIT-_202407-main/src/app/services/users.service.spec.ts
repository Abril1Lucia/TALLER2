import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';

describe('pruebas de servicio de usuarios', () => {
  let service: UsersService;
  let Mockhttp : HttpTestingController;
  const urltest = "http://localhost:9000/iniciarSesion"


  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
      UsersService,
      provideHttpClient(),
      provideHttpClientTesting()
    ] });

    
    service = TestBed.inject(UsersService);
   Mockhttp = TestBed.inject(HttpTestingController)
  });

  afterAll(()=>{
    Mockhttp.verify()
  })


  it('hacer la peticion del get para mostrar users' , ()=>{
    const mockUsers =[
      {
        fullName:'Sunny daily', email: 'mequieroiradormir@gmail.com', password: 'wenasNochesmini'
      },
      {
        fullName:'lazaro lucky', email: 'yaestoyhastalamadre@gmail.com', password: 'wenasNochesDisy'
      }
    ]
    
    const mockResponse = {
      mensaje: 'Se encontraron usuarios almacenados',
      numeroUsuarios: mockUsers.length,
      datos: mockUsers
    }


    service.getUser().subscribe(
      (res)=>{
        expect(res).toEqual(mockResponse)
    }
    )

    const req = Mockhttp.expectOne(urltest)
    expect(req.request.method).toBe('GET')

    req.flush(mockResponse)

})

});
