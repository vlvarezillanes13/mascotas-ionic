import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { IMascota } from '../../../interfaces/mascota.interface';
import { PersonasService } from '../../../services/personas/personas.service';
import { IPersona } from '../../../interfaces/persona.interface';

@Component({
  selector: 'app-add-mascota',
  templateUrl: './add-mascota.component.html',
  styleUrls: ['./add-mascota.component.scss'],
})
export class AddMascotaComponent implements OnInit {

  @ViewChild(IonModal) modal: IonModal;
  @Output() addMascota = new EventEmitter<IMascota>();
  personas:IPersona[] = [];
  person:IPersona;

  miFormulario:FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.minLength(3) ], ],
    edad: [0, [ Validators.required, Validators.min(0), Validators.max(200) ], ],
    tipo: ['', [ Validators.required, Validators.minLength(3) ], ],
    persona: ['', [ Validators.required ], ],
    });

  constructor(
    private fb: FormBuilder,
    private personasService:PersonasService
  ) { }

  ngOnInit() {
    this.loadPersons();
  }

  cancel() {
    this.modal.dismiss(null, 'cancelar');
    this.miFormulario.reset(
      {
        edad: 0,
        persona: ''
      }
    );
  }

  confirm() {

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }
    this.modal.dismiss(null, 'confirmar');
  }

  campoEsValido( campo: string){

    return  this.miFormulario.controls[campo].errors &&
            this.miFormulario.controls[campo].touched;
  }
  
  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirmar') {
      
      this.personasService.getPersonaById(this.miFormulario.controls['persona'].value)
        .subscribe(
          (resp:IPersona) => {
            this.person = resp;
            const mascota:IMascota = {
              nombre: this.miFormulario.controls['nombre'].value,
              edad: this.miFormulario.controls['edad'].value,
              tipo: this.miFormulario.controls['tipo'].value,
              persona: this.person
            }           
            this.miFormulario.reset({
              edad:0,
              persona: ''
            })
            
            this.addMascota.emit( mascota);
          }
        )
    }
  }

  loadPersons(){
    this.personasService.getAllPersonas().subscribe(
      (persons:IPersona[]) => {
        this.personas = persons;
      }
    )
  }

}
