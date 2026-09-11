import { HttpParams, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { BaseRequest } from './base.service';

interface TestPayload {
    name: string;
}

interface TestResponse {
    id: number;
}

const BASE_URL = 'MY-SERVICE-API-ENDPOINT';

@Injectable()
class TestRequestService extends BaseRequest<TestResponse, TestPayload> {
    callGet<T>(endpoint: string, options?: { params?: HttpParams | Record<string, unknown> }) {
        return this.get<T>(endpoint, options);
    }
}

describe('BaseRequest', () => {
    let service: TestRequestService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TestRequestService, provideHttpClient(), provideHttpClientTesting()],
        });

        service = TestBed.inject(TestRequestService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('get', () => {
        it('sends a GET request to the built URL when no params are given', () => {
            const mockResponse: TestResponse = { id: 1 };

            service.callGet<TestResponse>('/items').subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne(`${BASE_URL}/items`);
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('converts a plain object of params into HttpParams', () => {
            const mockResponse: TestResponse = { id: 2 };

            service.callGet<TestResponse>('/items', { params: { page: 1, active: true } }).subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne(request => request.url === `${BASE_URL}/items` && request.params.get('page') === '1' && request.params.get('active') === 'true');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('passes an existing HttpParams instance through unchanged', () => {
            const mockResponse: TestResponse = { id: 3 };
            const params = new HttpParams().set('sort', 'asc');

            service.callGet<TestResponse>('/items', { params }).subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne(request => request.url === `${BASE_URL}/items` && request.params.get('sort') === 'asc');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('post', () => {
        it('sends a POST request with the given body', () => {
            const body: TestPayload = { name: 'test' };
            const mockResponse: TestResponse = { id: 4 };

            service.post<TestResponse>('/items', body).subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne(`${BASE_URL}/items`);
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual(body);
            req.flush(mockResponse);
        });
    });

    describe('patch', () => {
        it('sends a PATCH request with the given body', () => {
            const body: TestPayload = { name: 'updated' };
            const mockResponse: TestResponse = { id: 5 };

            service.patch<TestResponse>('/items/5', body).subscribe(response => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne(`${BASE_URL}/items/5`);
            expect(req.request.method).toBe('PATCH');
            expect(req.request.body).toEqual(body);
            req.flush(mockResponse);
        });
    });

    describe('delete', () => {
        it('sends a DELETE request without params', () => {
            service.delete('/items/5').subscribe();

            const req = httpMock.expectOne(`${BASE_URL}/items/5`);
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });

        it('sends a DELETE request with params', () => {
            service.delete('/items', { tag: ['a', 'b'] }).subscribe();

            const req = httpMock.expectOne(request => request.url === `${BASE_URL}/items` && request.params.getAll('tag')?.join(',') === 'a,b');
            expect(req.request.method).toBe('DELETE');
            req.flush(null);
        });
    });
});
