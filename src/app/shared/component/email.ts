import { AbstractControl, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";



export class AsyncEmailValidator {
    static isEmailAvailable(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        let val: string = control.value;
        const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
            setTimeout(() => {
                if (val === "jhon@gmail.com") {
                    resolve({
                        emailExistErr: 'This Email id is already in use.'
                    })
                } else {
                    resolve(null)
                }
            }, 2500);
        })

        return promise;
    }
}