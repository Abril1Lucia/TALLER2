import { TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { provideHttpClient } from '@angular/common/http'
import { provideHttpClientTesting, HttpTestingController} from '@angular/common/http/testing';


describe('pruebas de loginServices', () => {

    let _loginServices : LoginService;
    let _httpMock : HttpTestingController;
    const urltest = "http://localhost:9000/iniciarSesion"
    const emailTest = "HenryDaniel@gmail.com"
    const passwordTest = "VivaElSancocho123"
    const tokenTest = "t7o0k7e3n5G9e3n5e3r6i1c4o7"

    beforeEach(()=>{
        TestBed.configureTestingModule({
            providers:[
                LoginService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });

        _loginServices = TestBed.inject(LoginService)
        _httpMock = TestBed.inject(HttpTestingController)

    })

    afterAll(()=>{
        _httpMock.verify();
    })

   

    it('Post para inicio de sesion' , ()=>{

        const MockPrueba = {
            mensaje: 'inicio de sesion exitoso',
            token: tokenTest
        }

        _loginServices.login(emailTest, passwordTest).subscribe(
            (res)=>{
                expect(res).toEqual(MockPrueba)
            }
        )

        const peticion = _httpMock.expectOne(urltest)

        expect(peticion.request.method).toBe('POST')


        peticion.flush(MockPrueba)


    })



    
    it('token almacenado del localstorage' , ()=>{
        localStorage.setItem('token', tokenTest)//esto es lo q se esta guardando en el localstorage
        expect(_loginServices.getToken()).toBe(tokenTest)

    })




    
    it('verificar al user si esta logueado' , ()=>{
        localStorage.setItem('token', tokenTest)
        expect(_loginServices.isLoggedIn()).toBeTrue

    })





    it('cierre de sesion' , ()=>{
        _loginServices.logout()
        expect(localStorage.getItem('token')).toBeNull();

    
    })
    


})