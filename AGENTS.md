# The Paw Pad Engineering Rules

## Technology Stack

### Frontend

* Next.js App Router
* React with TypeScript
* CSS in `app/globals.css`
* Lucide React for icons

### Backend — Future Development

* Kotlin with Spring Boot
* PostgreSQL
* REST API
* Docker

## Architecture

The application must follow an N-Tier modular architecture:

```text
Presentation Layer
        ↓
Application Layer
        ↓
Domain Layer
        ↓
Infrastructure Layer
        ↓
Database
```

Dependencies must flow downward only.

* Presentation can use Application.
* Application can use Domain.
* Infrastructure implements data access required by Domain or Application.
* Domain must not depend on React, Next.js, HTTP clients, or database libraries.

## Frontend Structure

```text
app/
├── components/
│   ├── common/
│   ├── dashboard/
│   └── layout/
├── features/
│   ├── bookings/
│   ├── customers/
│   ├── employees/
│   ├── grooming/
│   ├── hotel/
│   ├── pets/
│   ├── pos/
│   └── reports/
├── services/
├── types/
├── globals.css
├── layout.tsx
└── page.tsx
```

## Frontend Layer Responsibilities

### Presentation Layer

Locations:

* `app/page.tsx`
* `app/components`
* Feature UI components

Responsibilities:

* Display information.
* Receive user input.
* Handle simple UI interaction.
* Call application functions or services.
* Do not contain database or complex business rules.

### Application Layer

Locations:

* Feature actions
* Feature services
* Feature-specific hooks when necessary

Responsibilities:

* Coordinate application workflows.
* Prepare data needed by the UI.
* Call API services.
* Apply use-case-level validation.
* Do not directly render UI.

Examples:

* Create booking
* Check hotel availability
* Complete grooming service
* Process checkout

### Domain Layer

Locations:

* Feature models
* Business rules
* Shared business types

Responsibilities:

* Represent business entities and rules.
* Remain independent from React and Next.js.
* Contain rules such as booking status and commission eligibility.

Main entities:

* Customer
* Pet
* Booking
* Service
* Employee
* Hotel Room
* Transaction
* Commission
* Payroll

### Infrastructure Layer

Locations:

* `app/services`
* API client files
* External integration files

Responsibilities:

* Communicate with the backend API.
* Handle HTTP requests.
* Convert API responses into application data.
* Handle external storage and notification integrations.

## Feature Module Structure

Use this structure only when a feature becomes large enough:

```text
features/
└── bookings/
    ├── components/
    ├── application/
    ├── domain/
    ├── services/
    └── types.ts
```

Do not create empty folders in advance. Add folders only when they are needed.

## Feature Engineering Standard

Use this structure for every feature that has workflow logic, business rules, or API communication. The Bookings feature is the reference pattern:

```text
features/
`-- feature-name/
    |-- components/      React UI only
    |-- application/     Use cases and workflows
    |-- domain/          Models, statuses, and business rules
    `-- services/        Backend API communication
```

Example:

```text
features/
`-- bookings/
    |-- components/
    |   |-- BookingCalendar.tsx
    |   |-- BookingForm.tsx
    |   |-- BookingDetails.tsx
    |   `-- TimeSlotPicker.tsx
    |-- application/
    |   |-- createBooking.ts
    |   `-- getAvailableSlots.ts
    |-- domain/
    |   |-- booking.ts
    |   `-- bookingRules.ts
    `-- services/
        `-- bookingApi.ts
```

Layer rules:

* `components/` may import from `application/` and `domain/`.
* `application/` may import from `domain/` and `services/`.
* `services/` may import domain types, but must not render UI.
* `domain/` must not import React, Next.js, services, API clients, or UI code.
* `page.tsx` files should compose the route shell and feature component only.

Naming rules:

* UI components use PascalCase, for example `BookingForm.tsx`.
* Application workflows use verb-first names, for example `createBooking.ts`.
* Domain models use entity names, for example `booking.ts`.
* Domain rules use `entityRules.ts`, for example `bookingRules.ts`.
* API files use `entityApi.ts`, for example `bookingApi.ts`.

Do not create empty feature layer folders in advance. Add a layer only when the feature needs it.

## Booking Engineering Reference

Booking availability must follow this workflow:

1. Customer or staff selects a date.
2. Frontend calls the availability workflow in `application/getAvailableSlots.ts`.
3. The availability workflow calls the API layer in `services/bookingApi.ts`.
4. Backend availability must check operating hours, employee schedule, existing appointments, service duration, and hotel room availability.
5. Backend returns available time slots.
6. Customer or staff selects a time slot.
7. Backend validates availability again before creating the booking.

Frontend responsibilities:

* Show dates, slots, forms, tables, and status.
* Do lightweight required-field validation before submit.
* Keep booking business rules in `domain/bookingRules.ts`.
* Keep create, cancel, update, and availability workflows in `application/`.
* Keep API calls in `services/bookingApi.ts`.

## Backend N-Tier Structure

The future Kotlin Spring Boot backend should follow:

```text
backend/src/main/kotlin/com/thepawpad/
├── presentation/
│   └── controllers/
├── application/
│   ├── services/
│   └── dto/
├── domain/
│   ├── models/
│   ├── repositories/
│   └── rules/
├── infrastructure/
│   ├── persistence/
│   ├── security/
│   └── configuration/
└── shared/
```

### Backend Presentation

* REST controllers
* Request and response handling
* Authentication checks
* Input validation

### Backend Application

* Use cases and workflows
* Transaction coordination
* DTO mapping
* Booking, checkout, and payroll operations

### Backend Domain

* Core business entities
* Business rules
* Repository interfaces
* No dependency on controllers or database implementations

### Backend Infrastructure

* PostgreSQL access
* Repository implementations
* Security configuration
* Email, SMS, storage, and payment integrations

## Core Business Rules

* One customer can own multiple pets.
* Every booking must reference a customer and pet.
* A room cannot have overlapping active hotel bookings.
* An unavailable employee cannot be assigned to a booking.
* Commission is generated only from an eligible completed service.
* Finalized transactions cannot be edited directly.
* Refunds and voids require authorization.
* Important changes must create an audit record.
* Financial records must not be permanently deleted.

## Development Approach

* Work on only one small feature at a time.
* Do not generate the entire application in one response.
* State the exact file that should be opened or created.
* Provide only the code required for the current step.
* Wait for confirmation before continuing.
* Do not rewrite unrelated working code.
* Preserve existing design and functionality.
* Prefer simple working code before adding abstraction.

## Context and Helper Rules

* Do not create React Context unless state is shared across many unrelated components.
* Prefer local state, props, server components, and server data.
* Do not create generic helpers, utilities, hooks, providers, or wrappers unless reused.
* Do not create unnecessary abstraction for simple operations.
* Avoid deeply nested providers.
* Do not add a state-management library unless explicitly requested.
* Do not duplicate interfaces or business types.
* Do not place business logic inside visual components.
* Do not create empty architecture folders just to complete the structure.

## Component Rules

* Keep each component focused on one responsibility.
* Extract a component when it becomes reusable or difficult to read.
* Keep `page.tsx` focused on page composition.
* Use descriptive component, function, and variable names.
* Prefer Server Components unless browser state or events require `"use client"`.

## Styling Rules

* Primary color: `#7446a8`.
* Background color: `#f7f6fa`.
* Keep the interface responsive, clean, and professional.
* Reuse existing CSS classes.
* Avoid inline styles unless necessary.
* Avoid excessive cards, animation, and decorative elements.
* Preserve accessibility and readable color contrast.

## Security Rules

* Ask before installing a new package.
* Do not delete files without permission.
* Do not modify configuration files without explaining why.
* Never expose credentials or API secrets.
* Store secrets in environment variables.
* Validate input on both frontend and backend.
* Enforce authorization in the backend, not only in the UI.
* Report errors clearly instead of silently ignoring them.

## Required Response Format

For every development step:

1. State the small feature being created.
2. State the exact file to open or create.
3. Provide a small code change.
4. Explain the expected result.
5. Stop and wait for confirmation.

## Code Comment Rules

* Add clear comments to code so a beginner can understand its purpose.
* Write comments in simple English.
* Explain important logic, business rules, data flow, and unusual decisions.
* Add a short comment above every major component, function, and data structure.
* Use JSDoc comments for reusable functions, services, and business logic.
* Explain the purpose of important props, parameters, and return values.
* Add comments when code communicates with an API or changes application state.
* Add comments to booking, payment, commission, payroll, and permission logic.
* Do not comment obvious syntax or every individual line.
* Keep comments accurate when modifying code.
* Remove comments that no longer describe the current behavior.

Example:

```tsx
// Defines the navigation items displayed in the main sidebar.
const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
];

/**
 * Displays the primary navigation for staff and administrators.
 */
export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Displays the Paw Pad brand at the top of the sidebar. */}
      <div className="sidebarBrand">
        <PawPrint size={25} />
        <h1>The Paw Pad</h1>
      </div>
    </aside>
  );
}
```
