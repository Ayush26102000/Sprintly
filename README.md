
# 🚀 Sprintly – Enterprise Project Management System

**Sprintly** is a scalable, full-stack **Project Management System** inspired by tools like Jira and Asana. Built using **ASP.NET Core 8** and soon **Angular 17**, it follows **Clean Architecture** principles and demonstrates professional backend engineering, modular design, and production-level development practices.

---

## 🌟 Core Features

- 🏗️ **Clean Architecture** – Modular layers (Domain, Application, Infrastructure, API)
- 🧠 **Entity-Driven Design** – Code-first modeling with EF Core
- 🧾 **Multi-Tenant Support** – Organization-based data isolation
- 🎯 **Project, Sprint, Task, Issue Tracking**
- 📊 **Kanban Board + Gantt Chart** (with Angular D3 – upcoming)
- 🔔 **Real-time Notifications** (SignalR)
- 🔐 **Role-Based Access Control** – Admin, PM, Developer, Viewer
- 📈 **Audit Logs**, **Caching**, **Rate Limiting**
- 📤 **Export to Excel/PDF**
- 📚 **Swagger** + API Versioning
- 🧪 Ready for Integration & Unit Testing

---

## 🛠️ Tech Stack

- **Backend**: ASP.NET Core 8 Web API
- **Frontend**: Angular 17 (upcoming)
- **ORM**: Entity Framework Core
- **Architecture**: Clean Architecture (Domain-Driven Design)
- **Language**: C#
- **Database**: SQL Server (Code-First)
- **Tooling**: Visual Studio 2022, EF CLI, Git, GitHub

---

## 📂 Solution Structure

```
Sprintly/
├── Sprintly.API              → Entry point (Web API)
├── Sprintly.Application      → Use cases, DTOs, services
├── Sprintly.Domain           → Core domain models, enums
├── Sprintly.Infrastructure   → EF Core, database logic
└── Sprintly.sln              → Solution file
```

---

## ✅ Project Status

- [x] Solution Setup with Clean Architecture
- [x] SQL Server Database Design
- [x] Entity Framework Core Setup (Code First)
- [x] Entities, Enums, and DbContext Created
- [x] First Migration Applied
- [x] Repositories & Services 
- [x] Angular Frontend Setup 
- [ ] SignalR Notification System
- [x] Role Management & Auth
- [ ] Kanban/Gantt UI Views

---

## 🧠 What This Project Demonstrates

- ✅ Clean separation of concerns using layered architecture
- ✅ Deep understanding of EF Core and migrations
- ✅ RESTful API design with versioning
- ✅ Multi-tenant structure and scalable system design
- ✅ Backend-first mindset with extensible architecture
- ✅ Professional use of Git, GitHub, and commits

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/Ayush26102000/Sprintly.git
cd sprintly
```

### 2. Apply Migrations

```bash
dotnet ef database update --project Sprintly.Infrastructure --startup-project Sprintly.API
```

### 3. Run the API

```bash
cd Sprintly.API
dotnet run
```

---

## 📌 Planned Features (Next Milestones)

- Angular UI with D3-based Kanban/Gantt Chart
- SignalR-based real-time updates
- Advanced role/permission management
- Organization invites & user management
- Exporting reports as Excel/PDF
- Caching, logging, and request throttling

---


## 🤝 Contributing

This project is being built as a personal showcase. PRs, issues, and feedback are welcome. Collaboration requests? Reach out via LinkedIn or GitHub.

---

## 📬 Contact

- GitHub: https://github.com/Ayush26102000/
- LinkedIn: https://www.linkedin.com/in/ayush-kamble-7868371a4/
