import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NG_ASYNC_VALIDATORS, Validators } from '@angular/forms';
import { CustomRegex } from './shared/const/validaters';
import { Icountry } from './shared/model/interface';
import { COUNTRIES_META_DATA } from './shared/component/coutry';
import { NoSpacevalidators } from './shared/const/nospace';
import { AsyncEmailValidator } from './shared/component/email';
import { EmpValidators } from './shared/component/empid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  signupForm!: FormGroup
  coutryInfo: Array<Icountry> = []

  ngOnInit(): void {
    this.coutryInfo = COUNTRIES_META_DATA
    this.createsignupform()
    this.sameadress()
    this.patch()
    this.enableConfirmPassword()
    this.passAndConfirmPassSame()
    
  

  }


  createsignupform() {
    this.signupForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.username),
        Validators.minLength(5),
        Validators.maxLength(8),

        NoSpacevalidators.npsapce
      ]),
      email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)], [AsyncEmailValidator.isEmailAvailable]),
      empid: new FormControl(null, [Validators.required, EmpValidators.isEmpidvalid]),
      gender: new FormControl(null),
      skills: new FormArray([new FormControl(null, [Validators.required])]),
      currentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required]),
      }),
      permanentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required]),
      }),
      isAddSame:new FormControl(null,[Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
      confirmPassword: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.pattern(CustomRegex.password)])



    })
  }



  onsignup() {
    console.log(this.signupForm.value);


  }

  get f() {
    return this.signupForm.controls
  }


  get username() {
    return this.signupForm.get("username") as FormControl
  }

  get skillsformArr() {
    return this.signupForm.get('skills') as FormArray
  }

  onaddskill() {
    if (this.skillsformArr.length < 5) {
      let skillcontrol = new FormControl(null, [Validators.required])
      this.skillsformArr.push(skillcontrol)
    }
  }

  onremoveskill(i: number) {
    this.skillsformArr.removeAt(i)
  }


sameadress(){
  this.f['currentAddress'].valueChanges.subscribe((res)=>{
   if(this.f['currentAddress'].valid){
    this.f['isAddSame'].enable()
   }else{
    this.f['isAddSame'].disable()
   }



  })



}

patch(){
  this.f['isAddSame'].valueChanges.subscribe((res)=>{
    if(res){
      let current = this.f['currentAddress'].value
      this.f['permanentAddress'].patchValue(current)
      this.f['permanentAddress'].disable()
    }
  })
}
  



validateCurrAdd() {
  this.f['currentAddress'].valueChanges
    .subscribe((res) => {
      console.log(res);
      // console.log(this.f['currentAddress'].valid);
      if (this.f['currentAddress'].valid) {
        this.f['isAddSame'].enable()
      } else {
        this.f['isAddSame'].disable()
        this.f['isAddSame'].patchValue(false)
      }
    })
}

patchPerAdd() {
  this.f['isAddSame'].valueChanges
    .subscribe((res) => {
      console.log(res);
      if (res) {
        this.f['permanentAddress'].patchValue(this.f['currentAddress'].value)
        this.f['permanentAddress'].disable();
      } else {
        this.f['permanentAddress'].enable();
        this.f['permanentAddress'].reset();
      }

    })
}

enableConfirmPassword() {
  // observable :- continuous stream of data.
  this.f['password'].valueChanges // valueChanges is a observables
    .subscribe((res) => {
      console.log(res);
      console.log(this.f['password'].valid);
      if (this.f['password'].valid) {
        this.f['confirmPassword'].enable()
      } else {
        this.f['confirmPassword'].disable()
      }
    })
}

passAndConfirmPassSame() {
  this.f['confirmPassword'].valueChanges
    .subscribe((res) => {
      console.log(res);
      if (res !== this.f['password'].value) {
        this.f['confirmPassword'].setErrors({ 'passAndConfErr': 'Password and Confirm Password must be same' })
      }
    })
}








}





