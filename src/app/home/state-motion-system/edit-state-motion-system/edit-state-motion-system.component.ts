
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
    selector: 'app-edit-state-motion-system',
    templateUrl: './edit-state-motion-system.component.html',
    styleUrls: ['./edit-state-motion-system.component.css']
})
export class EditStateMotionSystemComponent {
    reactiveForm_edit_stateMotionSystem !: FormGroup;
    submitted: boolean = false
    loading_edit_stateMotionSystem: boolean = false
    @Input()
    stateMotionSystem_to_edit: any = {}
    @Output()
    cb_edit_stateMotionSystem = new EventEmitter()
    form_details: any = {}
    loading_get_details_add_stateMotionSystem_form = false
    constructor(private formBuilder: FormBuilder, public api: ApiService) {

    }
    ngOnInit(): void {
        this.get_details_add_stateMotionSystem_form()
        this.update_form(this.stateMotionSystem_to_edit)
    }
    // mise à jour du formulaire
    update_form(stateMotionSystem_to_edit: any) {
        this.reactiveForm_edit_stateMotionSystem = this.formBuilder.group({
            state: [stateMotionSystem_to_edit.state, Validators.required]
        });
    }

    // acces facile au champs de votre formulaire
    get f(): any { return this.reactiveForm_edit_stateMotionSystem.controls; }
    // validation du formulaire
    onSubmit_edit_stateMotionSystem() {
        this.submitted = true;
        console.log(this.reactiveForm_edit_stateMotionSystem.value)
        // stop here if form is invalid
        if (this.reactiveForm_edit_stateMotionSystem.invalid) {
            return;
        }
        var stateMotionSystem = this.reactiveForm_edit_stateMotionSystem.value
        this.edit_stateMotionSystem({
            condition: JSON.stringify({ id_stateMotionSystem: this.stateMotionSystem_to_edit.id_stateMotionSystem }),
            data: JSON.stringify(stateMotionSystem)
        })
    }
    // vider le formulaire
    onReset_edit_stateMotionSystem() {
        this.submitted = false;
        this.reactiveForm_edit_stateMotionSystem.reset();
    }
    edit_stateMotionSystem(stateMotionSystem: any) {
        this.loading_edit_stateMotionSystem = true;
        this.api.taf_post("stateMotionSystem/edit", stateMotionSystem, (reponse: any) => {
            if (reponse.status) {
                this.cb_edit_stateMotionSystem.emit({
                    new_data: JSON.parse(stateMotionSystem.data)
                })
                console.log("Opération effectuée avec succés sur la table stateMotionSystem. Réponse= ", reponse);
                this.onReset_edit_stateMotionSystem()
                alert("Opération effectuée avec succés sur la table stateMotionSystem")
            } else {
                console.log("L'opération sur la table stateMotionSystem a échoué. Réponse= ", reponse);
                alert("L'opération a echoué")
            }
            this.loading_edit_stateMotionSystem = false;
        }, (error: any) => {
            this.loading_edit_stateMotionSystem = false;
        })
    }
    get_details_add_stateMotionSystem_form() {
        this.loading_get_details_add_stateMotionSystem_form = true;
        this.api.taf_post("stateMotionSystem/get_form_details", {}, (reponse: any) => {
            if (reponse.status) {
                this.form_details = reponse.data
                console.log("Opération effectuée avec succés sur la table stateMotionSystem. Réponse= ", reponse);
            } else {
                console.log("L'opération sur la table stateMotionSystem a échoué. Réponse= ", reponse);
                alert("L'opération a echoué")
            }
            this.loading_get_details_add_stateMotionSystem_form = false;
        }, (error: any) => {
            this.loading_get_details_add_stateMotionSystem_form = false;
        })
    }
}
