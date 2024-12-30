import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditAttractionComponent } from './create-edit-attraction.component';

describe('CreateEditAttractionComponent', () => {
  let component: CreateEditAttractionComponent;
  let fixture: ComponentFixture<CreateEditAttractionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditAttractionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditAttractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
