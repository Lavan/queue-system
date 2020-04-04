import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { EnterComponent } from './enter.component';

describe('EnterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EnterComponent],
      imports: [HttpClientModule]
    }).compileComponents();
  }));

});
