import {browser, element, by} from 'protractor';

describe('test', ()=>{

    beforeEach(()=>{
        browser.get("/");
    });

    it("el page login se muestra por defecto", ()=>{
        expect(element(by.css(".titulo2 ion-label")).getText()).toContain("inicia sesion o registrate para empezar");
    });
    
    it("se muestra el mensaje hola desconocido! en el page login", ()=>{
        expect(element(by.css(".titulo1 h1")).getText()).toContain("hola desconocido!");
    });
});