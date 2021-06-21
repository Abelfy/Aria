import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

function passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log('ici')
      return control.get('password')!.value === control.get('passwordConfirm')!.value
       ? null : {'mismatch': true};
    };
  }
export { passwordMatchValidator}