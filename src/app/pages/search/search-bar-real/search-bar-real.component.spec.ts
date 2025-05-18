import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarRealComponent } from './search-bar-real.component';

describe('SearchBarRealComponent', () => {
  let component: SearchBarRealComponent;
  let fixture: ComponentFixture<SearchBarRealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarRealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarRealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
