import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../common/Sidebar/sidebar/sidebar.component';
import { HeaderComponent } from "../../common/Header/header/header.component";

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CompanyService } from '../../services/DashboardServices/company.service';


interface Company {
    id?: number;
  name: string;
  domain: string;
}

@Component({
  selector: 'app-company',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent,CommonModule,FormsModule,    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ToastModule],
      providers: [MessageService],
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  isSidebarActive = false;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  companies: Company[] = [];
  isModalOpen = false;
  modalTitle = 'Add Company';
  editingIndex: number | null = null;

  formData: Company = { name: '', domain: '' };

  constructor(private companyService: CompanyService, private messageService: MessageService) {}

  closeSidebarOnBodyClick() {
    if (this.isSidebarActive) {
      this.sidebar.closeSidebar();
    }
  }
 ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.GetAll().subscribe({
      next: (data) => this.companies = data,
      error: () => this.showError('Failed to load companies.')
    });
  }

  openModal(index?: number) {
    this.isModalOpen = true;
    if (index !== undefined) {
      this.modalTitle = 'Update Company';
      this.editingIndex = index;
      this.formData = { ...this.companies[index] };
    } else {
      this.modalTitle = 'Add Company';
      this.editingIndex = null;
      this.formData = { name: '', domain: '' };
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.formData = { name: '', domain: '' };
    this.editingIndex = null;
  }

  saveCompany() {
    if (this.editingIndex === null) {
      this.companyService.addCompany(this.formData).subscribe({
        next: (newCompany) => {
          this.companies.push(newCompany);
          this.showSuccess('Company added successfully');
          this.closeModal();
        },
        error: () => this.showError('Failed to add company.')
      });
    } else {
      const id = this.companies[this.editingIndex].id!;
      this.companyService.updateCompany(id, this.formData).subscribe({
        next: (updatedCompany) => {
          this.companies[this.editingIndex!] = updatedCompany;
          this.showSuccess('Company updated successfully');
          this.closeModal();
        },
        error: () => this.showError('Failed to update company.')
      });
    }
  }

   deleteCompany(index: number) {
    const id = this.companies[index].id!;
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(id).subscribe({
        next: () => {
          this.companies.splice(index, 1);
          this.showSuccess('Company deleted successfully');
        },
        error: () => this.showError('Failed to delete company.')
      });
    }
  }

  showSuccess(msg: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
  }

  showError(msg: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: msg });
  }
}
