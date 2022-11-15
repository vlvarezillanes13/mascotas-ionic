import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { IMascota } from 'src/app/interfaces/mascota.interface';
import { OverlayEventDetail } from '@ionic/core/components';
import { PersonasService } from '../../../services/personas/personas.service';
import { IPersona } from '../../../interfaces/persona.interface';

@Component({
  selector: 'app-edit-mascota',
  templateUrl: './edit-mascota.component.html',
  styleUrls: ['./edit-mascota.component.scss'],
})
export class EditMascotaComponent implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  @Output() updateMascota = new EventEmitter<IMascota>();
  @Input() mascota: IMascota;

  miFormularioEdit: FormGroup;
  persona: IPersona;
  personas: IPersona[] = [];

  constructor(
    private fb: FormBuilder,
    private personasService: PersonasService
  ) {}

  ngOnInit() {
    this.loadPersons();
    this.getPerson(this.mascota.persona.id);
    this.loadDataForm();
  }

  cancel() {
    this.modal.dismiss(null, 'cancelar');
  }

  confirm() {
    if (this.miFormularioEdit.invalid) {
      this.miFormularioEdit.markAllAsTouched();
      return;
    }
    this.modal.dismiss(null, 'confirmar');
  }

  campoEsValido(campo: string) {
    return (
      this.miFormularioEdit.controls[campo].errors &&
      this.miFormularioEdit.controls[campo].touched
    );
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirmar') {
      
      const mascota: IMascota = {
        id: this.miFormularioEdit.controls['id'].value,
        nombre: this.miFormularioEdit.controls['nombre'].value,
        edad: this.miFormularioEdit.controls['edad'].value,
        tipo: this.miFormularioEdit.controls['tipo'].value,
        persona: this.miFormularioEdit.controls['persona'].value 
      };
      this.updateMascota.emit(mascota);
    }
  }

  loadDataForm() {
    this.personasService
      .getPersonaById(this.mascota.persona.id)
      .subscribe((person: IPersona) => {
        this.persona = person;

        this.miFormularioEdit = this.fb.group({
          id: [
            { value: this.mascota.id, disabled: true },
            [Validators.required],
          ],
          nombre: [
            this.mascota.nombre,
            [Validators.required, Validators.minLength(3)],
          ],
          edad: [
            this.mascota.edad,
            [Validators.required, Validators.min(0), Validators.max(200)],
          ],
          tipo: [
            this.mascota.tipo,
            [Validators.required, Validators.minLength(3)],
          ],
          persona: [this.persona , [Validators.required]],
        });
      });
  }

  loadPersons() {
    this.personasService.getAllPersonas().subscribe((persons: IPersona[]) => {
      this.personas = persons;
    });
  }

  getPerson(id: number) {
    this.persona = this.personas.find((p) => p.id === id);
  }

  selectPerson(id: number) {
    if (this.persona.id === id) {
      return true;
    }
    return false;
  }

}
