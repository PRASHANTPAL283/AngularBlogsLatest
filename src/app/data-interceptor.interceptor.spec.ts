import { TestBed } from '@angular/core/testing';

import { DataInterceptorInterceptor } from './data-interceptor.interceptor';

describe('DataInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DataInterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DataInterceptorInterceptor = TestBed.inject(DataInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
