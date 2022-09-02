import { Component, ElementRef, ViewChild } from "@angular/core";
import KeenSlider, { KeenSliderInstance } from "keen-slider";
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: [
    "../../node_modules/keen-slider/keen-slider.min.css",
    "./app.component.scss",
  ],
})
export class AppComponent {
  @ViewChild("sliderRef")
  sliderRef!: ElementRef<HTMLElement>

  public slider!: KeenSliderInstance;

  public memberForm: FormGroup = new FormGroup ({
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    whatsApp: new FormControl("", [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    state:  new FormControl("", [Validators.required]),
    lga:  new FormControl("", [Validators.required]),
    pvc: new FormControl("", [Validators.required]),
  });

  public user: string = "";

  ngAfterViewInit() {
    this.slider = new KeenSlider(this.sliderRef.nativeElement, {
      loop: true,
      slides: {
        origin: "center",
        perView: 1,
        spacing: 0,
      },
      vertical: true,
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  save():void {
    this.user = JSON.stringify(this.memberForm.value);
  }
}
