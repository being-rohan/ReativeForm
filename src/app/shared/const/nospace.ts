import { AbstractControl, ValidationErrors } from "@angular/forms";



export class NoSpacevalidators{
    static npsapce(control:AbstractControl)
    :ValidationErrors| null{

        let val = control.value as string ;

        if(!val){
            return null
        }

        if(val.includes(' ')){

            return{
                npsapceerr: "space is not allowed"
            }

        }else{
            return null
        }
    }
}