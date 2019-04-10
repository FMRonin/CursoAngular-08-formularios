import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: []
})
export class TemplateComponent implements OnInit {

  constructor() { }

  usuario = {
    nombre: "",
    apellido: "",
    correo: "",
    pais: "",
    sexo: "hombre",
    membresia: "BAS",
    acepta: false
  }

  paises = [
    {
      code:"COL",
      nombre:"Colombia"
    },
    {
      code:"ESP",
      nombre:"España"
    }
  ]

  membresias = [
    {
      code:"BAS",
      nombre:"basica"
    },
    {
      code:"MED",
      nombre:"Media"
    },
    {
      code:"FUL",
      nombre:"Full"
    }
  ]

  guardar(form:NgForm){
    console.log(form);
    console.log(form.value);
    console.log(this.usuario)
  }

  ngOnInit() {
  }

}
