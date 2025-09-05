# Beach Rental

A web application for managing beach equipment rentals.  
Allows users to browse available equipment, add items to a cart, review rentals, and return equipment. The system supports user roles, updates equipment availability in real time, and displays current weather for a chosen location.

## Features

- Browse available equipment by type.  
- Add equipment to cart with quantity validation (cannot exceed available stock).  
- Rental summary with editable quantities before final confirmation.  
- Updates stock availability after confirming rental.  
- Return equipment (all or by category).  
- Display current weather for a selected location.  
- User role support (e.g., admin can add new equipment).  
- Responsive interface using Bootstrap 5 and FontAwesome.  

## Technologies

- **Angular 16** – front-end framework  
- **RxJS** – reactive data streams (BehaviorSubject, Observable)  
- **Bootstrap 5** – responsive layout and styling  
- **FontAwesome** – icons  
- **LocalStorage** – persistent storage for equipment and rentals  
- **TypeScript** – typed JavaScript

## Weather Configuration

Current weather is fetched from a free API (e.g., Open-Meteo, WeatherAPI). To change the location, modify the parameters in WeatherService.

## Usage

- Add equipment to cart: On the “Rent” page, select quantity and click “Add”.
- Summary: Click “Summary” in the top-right corner to edit quantities or remove items.
- Confirm rental: Updates stock availability and saves the order.
- Return equipment: “Return” page allows returning the entire rental or individual categories.
- Admin: Can add new equipment via the admin interface.
