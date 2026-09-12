import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export abstract class BaseRequest<_T, U = unknown> {
    private readonly BASE_URL = `MY-SERVICE-API-ENDPOINT`;

    protected readonly http = inject(HttpClient);

    /**
     * Generic GET
     * @param endpoint API endpoint (relative)
     * @param params Optional query parameters
     */
    protected get<T>(endpoint: string, options?: { params?: HttpParams | Record<string, unknown> }): Observable<T> {
        // Convert the `params` object to `HttpParams`
        const url = `${this.BASE_URL}${endpoint}`;
        if (options?.params) {
            if (options.params instanceof HttpParams) {
                return this.http.get<T>(url, { params: options.params });
            }
            const httpParams = new HttpParams({
                fromObject: Object.fromEntries(Object.entries(options.params).map(([k, v]) => [k, String(v)])),
            });
            return this.http.get<T>(url, { params: httpParams });
        }
        return this.http.get<T>(url);
    }

    /**
     * Generic POST
     * @param endpoint API endpoint (relative)
     * @param body Request payload
     * @param headers Optional headers
     */
    public post<T>(endpoint: string, body: U, headers?: HttpHeaders): Observable<T> {
        const options = headers ? { headers } : {};
        return this.http.post<T>(`${this.BASE_URL}${endpoint}`, body, options);
    }

    /**
     * Generic PATCH
     * @param endpoint API endpoint (relative)
     * @param body Partial payload to update
     * @param headers Optional headers
     */
    public patch<T>(endpoint: string, body: U, headers?: HttpHeaders): Observable<T> {
        const options = headers ? { headers } : {};
        return this.http.patch<T>(`${this.BASE_URL}${endpoint}`, body, options);
    }

    /**
     * Generic DELETE
     * @param endpoint API endpoint (relative)
     * @param params Optional query parameters
     */
    public delete<T>(endpoint: string, params?: Record<string, string | string[]>): Observable<T> {
        const httpParams = params ? new HttpParams({ fromObject: params }) : undefined;

        return this.http.delete<T>(`${this.BASE_URL}${endpoint}`, httpParams ? { params: httpParams } : {});
    }
}
