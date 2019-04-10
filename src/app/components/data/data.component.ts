import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs';
@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  form:FormGroup;

  usuario = {
    nombreCompleto : {
      nombre: "Fabian",
      apellido: "Martinez"
    },
    correo: "fabianemartinez@gmail.com",
    pasatiempos: [
      "jugar",
      "estudiar"
    ]
  }

  constructor() {
    this.form = new FormGroup(
      {
        'nombreCompleto': new FormGroup({
                                'nombre': new FormControl('', [Validators.required, Validators.minLength(5)] ),
                                'apellido': new FormControl('', [Validators.required, Validators.minLength(5),this.noMartinez]),  
                            }),
        'correo': new FormControl('', [
                                        Validators.required,
                                        Validators.pattern("[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,3}$")
                                      ]),
        'pasatiempos': new FormArray([
          new FormControl('',Validators.required)
        ]),
        'username': new FormControl('', Validators.required, this.existeUsuario),
        'password1': new FormControl('', Validators.required),
        'password2': new FormControl()
      }
    );

    this.form.controls['password2'].setValidators([Validators.required, this.noIgual.bind(this.form)])

    this.form.valueChanges.subscribe(
      data => {
        console.log(data)
      });
    this.form.controls['username'].valueChanges.subscribe(
      data => {
        console.log(data)
      }
    )
    this.form.statusChanges.subscribe(
      data => {
        console.log(data)
      }
    )

    //this.form.setValue(this.usuario);

   }

   agregarPasatiempo(){
     (<FormArray>this.form.controls['pasatiempos']).push(
       new FormControl('', Validators.required)
     )
   }

   guardarCambios(){
     console.log(this.form.value)
     console.log(this.form)
     this.form.reset()
   }

   //Validación Recomienda un archivo externo si son varias
   noMartinez(control: FormControl):{[s:string]:boolean}{
     if(control.value == "Martinez"){
        return {
          noHerrera:false
        }
     }
     return null
   }

   noIgual(control: FormControl):{[s:string]:boolean}{
    let form:any = this;
    if( control.value !== form.controls['password1'].value){
       return {
         noiguales:true
       }
    }
    return null
  }

  existeUsuario(control:FormControl):Promise<any>|Observable<any>{
    let promise = new Promise(
      (resolve, reject)=>{
         setTimeout( ()=>{
           if(control.value === "ronin"){
             resolve({existe:true})
           }else{
             resolve(null)
           }
         },3000 )
      }
    )
    return promise
  }


  ngOnInit() {
  }

}




// Recomendación un archivo de validaciones
