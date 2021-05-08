import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';




@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  // Output decorator for emit event to ParentComponent (ParentFormCreationComponent) when NEXT button is clicked
  @Output() clickNext: EventEmitter<any> = new EventEmitter();
  @Output() clickPrevious: EventEmitter<any> = new EventEmitter();
  @Output() clickSubmit: EventEmitter<any> = new EventEmitter();

  inCreatePage: boolean = true;
  inListPage: boolean = false;

  @Input() set inCreatePage_(value: any) {
    if (value !== undefined) { }
    this.inCreatePage = value;
  };

  @Input() set inListPage_(value: any) {
    if (value !== undefined) { }
    this.inListPage = value;
  }

  constructor(private changeDetection: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  clickOnNext() {
    this.clickNext.emit(true);
  };
  clickOnSubmit() {
    this.clickSubmit.emit(true);
  }
  clickOnPrevious() {
    this.clickPrevious.emit(true);
  }
}
