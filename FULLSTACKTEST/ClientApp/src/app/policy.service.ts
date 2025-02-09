import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Policy } from './Models/policy.model';  // Create this model based on the Policy class

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  private baseUrl = 'https://localhost:7121/api/policy';

  constructor(private http: HttpClient) { }

  // Get all policies
  getAllPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.baseUrl);
  }

  // Get a policy by policy number
  getPolicy(policyNumber: number): Observable<Policy> {
    return this.http.get<Policy>(`${this.baseUrl}/${policyNumber}`);
  }

  // Add a new policy
  addPolicy(policy: Policy): Observable<Policy> {
    return this.http.post<Policy>(this.baseUrl, policy);
  }

   //Update an existing policy
  updatePolicy(policy: Policy): Observable<void> {
    return this.http.put<void>(this.baseUrl, policy);
  }

  // Remove a policy by policy number
  removePolicy(PolicyNumber: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${PolicyNumber}`);
  }
}
