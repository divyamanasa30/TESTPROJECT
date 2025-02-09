import { Component } from '@angular/core';
import { PolicyService } from '../app/policy.service';
import { Policy } from './Models/policy.model';
import { PolicyInput } from './Models/policyInput.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  policies: Policy[] = [];
  selectedPolicy: Policy[] = [];
  policy: Policy = new Policy()

  policyDialog: boolean = false;
  submitted: boolean = false;
  isUpdate: boolean = false;
  newPolicy: boolean = false;
  constructor(private policyService: PolicyService) { }

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.policyService.getAllPolicies().subscribe(
      (data) => {
        console.log('Policies Data:', data); 
        this.handlePoliciesData(data);
      },
      (error) => {
        console.error('Error fetching policies:', error); 
        this.handleError('Error fetching policies', error);
      }
    );
  }
  // methods for crud operations

  addPolicy(policy: Policy): void {
    const updatedModel = this.convertToInputModel(policy);
    this.policyService.addPolicy(updatedModel).subscribe(
      () => this.onPolicyActionSuccess(),
      (error) => this.handleError('Error adding policy', error)
    );
  }

  deletePolicy(policyNumber: number): void {
    this.policyService.removePolicy(policyNumber).subscribe(
      () => this.onPolicyActionSuccess(),
      (error) => this.handleError('Error deleting policy', error)
    );
  }

  updatePolicy(policy: Policy): void {
    this.policyService.updatePolicy(this.convertToInputModel(policy)).subscribe(
      () => this.onPolicyActionSuccess(),
      (error) => this.handleError('Error updating policy', error)
    );
  }


  editPolicy(policy: Policy): void {
    this.policy = { ...policy };
    this.policyDialog = true;
    this.isUpdate = true;
    this.submitted = false;
  }

  deleteSelectedProducts() {
    if (this.selectedPolicy) {
      this.selectedPolicy
        .filter((policy): policy is { PolicyNumber: number } => policy !== undefined)
        .forEach(policy => {
          this.deletePolicy(policy.PolicyNumber);
        });
    }
  }

  //Dialog Box methods

  openNew(): void{
    this.policy = new Policy();
    this.policyDialog = true;
    this.newPolicy = true;
    this.isUpdate = false;
    this.submitted = false;
  }

  hideDialog() : void {
    this.policyDialog = false;
    this.isUpdate = false;
    this.newPolicy = false;
    this.submitted = false;

  }

  savePolicy(policy: Policy): void {
    this.submitted = true;
    if (this.hasRequiredFields(policy)) {
      if (this.isUpdate) {
        this.updatePolicy(policy);
      } else if (this.newPolicy) {
        this.addPolicy(policy);
      }
    }
  }

  // private methods
  hasRequiredFields(policy: Policy): boolean {
    return policy.PolicyNumber != null &&
      policy.Name != null &&
      policy.Age != null &&
      policy.Gender != null &&
      policy.Name.trim() !== '' &&
      policy.Gender.trim() !== '';
  }


  private convertToInputModel(policy: Policy): PolicyInput {
    return {
      PolicyNumber: policy.PolicyNumber,
      PolicyHolder: {
        Age: policy.Age,
        Name: policy.Name,
        Gender: policy.Gender === 'Male' ? 0 : 1
      }
    };
  }


  private handlePoliciesData(data: any): void {
    this.policies = data.map((item: any) => {
      const policy = new Policy();
      policy.PolicyNumber = item.policyNumber;
      policy.Age = item.policyHolder.age;
      policy.Gender = item.policyHolder.gender === 0 ? 'Male' : 'Female';
      policy.Name = item.policyHolder.name;
      return policy;
    });
  }

  private onPolicyActionSuccess(): void {
    this.policyDialog = false;
    this.loadPolicies();
  }

  private handleError(message: string, error: any): void {
    console.error(message, error);
  }
}
