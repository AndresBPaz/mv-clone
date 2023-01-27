import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemblanzaComponent } from './semblanza.component';

describe('SemblanzaComponent', () => {
  let component: SemblanzaComponent;
  let fixture: ComponentFixture<SemblanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemblanzaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemblanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
