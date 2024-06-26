import { AbstractControl, ValidationErrors } from "@angular/forms";




export class EmpValidators {
    static isEmpidvalid(control: AbstractControl): null | ValidationErrors {

        let val = control.value as string;
        if (!val) {
            return null
        }
        let regexExp = /^[A-Z]\d{3}$/;
        let isvalid = regexExp.test(val)

        if (isvalid) {
            return null
        }
        else {
            return {
                invalidEmpId: 'Emp Id must be start with one alphabet and ends with 3 number'
            }
        }
    }
}