import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})

export class ContactComponent implements OnInit {

  verify: boolean = false;
  contactForm!: FormGroup;

  constructor(private readonly fb: FormBuilder,
    private service: ContactService)  {

  }

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      comentarios: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  onSubmit() {
    //console.log(this.contactForm.value);

    if (this.verify) {

      let params = new FormData();
//Return-Path:
      params.append('Content-Type', 'multipart/form-data');
      params.append('Return-Path', this.contactForm.value.correo);
      params.append('Reply-To', this.contactForm.value.correo);
      params.append('Subject', this.contactForm.value.nombre + 'te mando un mensaje');

      params.append('name', this.contactForm.value.nombre);
      params.append('email', this.contactForm.value.correo);
      params.append('telephone', this.contactForm.value.telefono);
      params.append('message', this.contactForm.value.comentarios);



      this.service.sendContact(params).subscribe(response => {
        this.contactForm.reset();
        // Swal.fire({
        //   icon: 'success',
        //   title: '¡Exito!',
        //   text: 'Envio de mensaje Exitoso',
        //   timer: 5000
        // });
      }, error => {
        console.log(error);
        // Swal.fire({
        //   icon: 'error',
        //   title: '¡Error!',
        //   text: 'Error al enviar mensaje',
        //   timer: 2000
        // });
      });

    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: '¡Error!',
      //   text: 'Debe comprobar que no es un robot',
      //   timer: 2000
      // });
    }
  }

  showResponse(event: any) {
    console.log(event);
    if (typeof event === 'string') {
      this.verify = true;
      // Swal.fire({
      //   icon: 'success',
      //   title: '¡Exito!',
      //   text: 'Verificacion Exitosa',
      //   timer: 2000
      // });
    } else {
      // Swal.fire({
      //   icon: 'error',
      //   title: '¡Error!',
      //   text: 'Error al verificar que no es robot',
      //   timer: 2000
      // });
    }
  }

}
