[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/YQXQPCe3)
# 🚀 Classroom Management System Challenge

**Duration:** 90 Minutes

---

## 🛠️ Tech Stack

-   **Backend:** .NET 8, Entity Framework Core (In-Memory DB), ASP.NET Core Identity
-   **Frontend:** React (TypeScript), Axios, React Router, Bootstrap

---

## 📝 Challenge Overview

Build a classroom management system where **Admins** can:

1.  **Create, edit, and view classrooms.**
2.  **Assign teachers and learners to classrooms.**
3.  **Enforce classroom capacity limits.**

---

## 🏛️ Classroom Entity Design

Design the `Classroom` entity to support these requirements:

1.  Each classroom has:
    * A unique ID
    * Name (required, max 100 chars)
    * Capacity (required, minimum 1)
2.  Relationships:
    * One Teacher (reference to `ApplicationUser` with role "Teacher")
    * Many Learners (reference to `ApplicationUser`s with role "Learner")
3.  Add proper data annotations/EF configurations.

Create this class in `Models/Classroom.cs` and configure the relationships in `AppDbContext`.

---

## ⚙️ Setup Instructions

### Backend (.NET 8)

1.  **Clone the repository** and navigate to the `backend` folder.
2.  **Restore dependencies:**
    ```
    dotnet restore
    ```
3.  **Define the `Classroom` Model and Configure DbContext:**
    * Create the `Classroom.cs` model file in a `Models` folder (or an appropriate location) as per the **Classroom Entity Design** section.
    * Open `AppDbContext.cs`.
    * Add `DbSet<Classroom> Classrooms { get; set; }` to the `AppDbContext` class.
    * Complete the `OnModelCreating` method to configure the `Classroom` entity relationships (Teacher and Learners). You will need to define how `Classroom` relates to `ApplicationUser` for both teachers and learners. For example:
        ```csharp
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Example: Configure the Classroom entity and its relationships
            // You will need to complete this based on your Classroom model design
            // and the ApplicationUser entity.

            // builder.Entity<Classroom>()
            //     .HasOne(c => c.Teacher) // Assuming a Teacher property of type ApplicationUser
            //     .WithMany() // Or a specific navigation property on ApplicationUser if defined
            //     .HasForeignKey(c => c.TeacherId) // Assuming a TeacherId foreign key
            //     .OnDelete(DeleteBehavior.Restrict); // Or another appropriate delete behavior

            // builder.Entity<Classroom>()
            //     .HasMany(c => c.Learners) // Assuming a Learners collection of type ApplicationUser
            //     .WithMany(); // Or a specific navigation property on ApplicationUser if representing a many-to-many through a join table, or .WithOne if a classroom has many learners and a learner belongs to one classroom.
        }
        ```
4.  **Seed initial users** (already implemented in `Program.cs`):
    * **Admin:** `admin@test.com` (Password: `Admin@123`)
    * **Teacher:** `teacher@test.com` (Password: `Teacher@123`)
    * **Learner:** `learner@test.com` (Password: `Learner@123`)
5.  **Run the backend:**
    ```bash
    dotnet run
    ```
    The API will start at `https://localhost:5001`.

---

### Frontend (React)

1.  Navigate to the `client` folder.
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Start the React app:**
    ```bash
    npm start
    ```
    The app will open at `http://localhost:3000`.

---

## 🎯 Tasks

### Backend (⏱️ 40 Minutes)

* **Implement the `Classroom` entity:**
    * Ensure it meets the design requirements specified in the **Classroom Entity Design** section.
    * Ensure relationships between `Classroom`, `Teacher` (ApplicationUser), and `Learners` (ApplicationUser) are correctly configured in EF Core.
* **Add API endpoints:**
    * `GET /api/classrooms`: Return all classrooms. The response for each classroom should include its details, the assigned teacher's information (e.g., name or email), and a list of assigned learners' information (e.g., names or emails).
    * `POST /api/classrooms`: Create a new classroom. Validate that capacity ≥ 1.
    * `POST /api/classrooms/{id}/assign-learners`: Assign learners to a classroom. Ensure the total number of learners doesn’t exceed the classroom's capacity.
    * *(Optional)* You may need to add endpoints to fetch available teachers and all learners (not yet assigned or generally) for assignment purposes (e.g., `GET /api/users?role=Teacher`, `GET /api/users?role=Learner`).
* **Add role-based authorization:** Only **Admins** can create/edit classrooms and assign teachers/learners.

---

### Frontend (⏱️ 40 Minutes)

* **Implement Basic Login Page:**
    * Create a login form (email and password).
    * On submit, authenticate against the backend (ASP.NET Core Identity).
    * Store the authentication token (e.g., JWT) and manage user session.
    * Redirect to the Classroom List Page upon successful login.
    * Protect routes so that only authenticated users (specifically Admins for management tasks) can access them.
* **Classroom List Page:**
    * Fetch and display classrooms in a table or a similar list format.
    * For each classroom, display its name, capacity, the assigned teacher's information (e.g., name or email).
    * Also, display a list of all learners assigned to that classroom (e.g., their names or emails). This might be a sub-list or an expandable section within each classroom's entry.
* **Create Classroom Form:**
    * Allow input for classroom name and capacity.
    * Include a dropdown to select an available teacher (fetched from the backend).
    * Submit data to `POST /api/classrooms`.
* **Assign Learners Modal (or a dedicated page):**
    * When an "Assign Learners" action is triggered for a classroom:
        * Display the classroom's name and capacity.
        * Use a multi-select component (or similar UI) to choose from available learners (fetched from the backend).
        * Submit the selected learner IDs to `POST /api/classrooms/{id}/assign-learners`.

---

### ⭐ Bonus (⏱️ 10 Minutes)

* Add a **search bar** on the Classroom List Page to filter classrooms by name.
* Implement **backend validation** to prevent duplicate classroom names.

---

## 📊 Assessment Criteria

* **Backend:** Correct `Classroom` entity implementation, EF relationships, API logic (including returning detailed classroom, teacher, and learner data), validation, authorization, and error handling.
* **Frontend:** Implementation of a functional login page and session management. Functional UI components, correct API integration for displaying classroom data (including teacher and a list of all assigned learners), creating classrooms, and assigning learners. Secure frontend routes.

---

Good luck! 🚀
