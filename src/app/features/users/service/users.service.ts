import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable()
export class UsersService {
    constructor(private http: HttpClient) {}

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.baseUrl}/users`);
    }

    updateUser(user: User): Observable<User> {
        if (!user) return EMPTY;
        return this.http.put<User>(`${environment.baseUrl}/users/${user.id}`, user);
    }

    removeUser(id: number): Observable<unknown> {
        if (!id) return EMPTY;
        return this.http.delete(`${environment.baseUrl}/users/${id}`);
    }

    newUser(item: User): Observable<User> {
        if (!item) return EMPTY;
        return this.http.post<User>(`${environment.baseUrl}/users`, item);
    }
}
