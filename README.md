# Pâtisserie Store Website

A self-initiated learning project focused on building a dynamic, visually engaging, and interactive pâtisserie store website.  
Designed to simulate a real-world e-commerce experience with modern technologies and creative UI/UX components.

---

## Tech Stack

| Category        | Technologies Used                          |
|-----------------|---------------------------------------------|
| Frontend        | React, Tailwind CSS, Vite                  |
| Backend         | Supabase (PostgreSQL, Auth, Storage)       |
| 3D Rendering    | @react-three/fiber, @react-three/drei      |
| Dev Tools       | Git, ESLint, Prettier                      |

---

## Live Demo
[Watch the Demo](https://youtu.be/MdqHkrEGUHE)


---

## Project Structure

The application includes the following core **pages**:

- **Home** — Introduction & navigation
- **Menu** — Product list, 3D views, ordering system
- **Login / Sign Up** — Authentication flow
- **About** — Store and concept background

### Key Components in Menu Page

- `CakeModel.tsx`: Interactive 3D product viewer  
- `OrderForm.tsx`: Slide-up modal for placing orders  
- `AddressPopover.tsx`: Popup component for entering/selecting addresses  

---

## Completed Features

### Home
- Embedded promotional video
- Responsive navbar with internal routing

### Menu
- Centered modal with scrollable product details
- Price and description display
- Interactive 3D product viewer with flavor variations
- Flavor-specific 3D model switching
- Fully functional address selection and order form

---

## Current Challenge

### Precise 3D Model Positioning
- Current implementation uses `Bounds` to center models.
- **Issue**: Some models still appear off-centered or misaligned.
- **Goal**: Refine bounding logic or explore better framing methods (e.g., `useBounds`, `camera positioning`, model normalization).

---

## Future Development Plans

### Menu Enhancements
- Add **search** functionality by product name
- Add **filters** (e.g., allergen-free options)
- Improve modal UX:
  - Show **ingredient tags**
  - Display **3D annotations** (e.g., “macaron top,” “blueberry crème center”)

### Order System
- Implement **Add to Cart** system with live cart updates
- Restrict purchases to **authenticated users**
- Auto-fill order form using stored user data

### Address Integration
- Embed **Google Maps** for live location input

### Authentication
- Connect **Login** and **Sign Up** forms to Supabase backend
- Secure user registration and session persistence

---

## Planned Database Schema (Supabase)

| Table Name | Description                        |
|------------|------------------------------------|
| `customers` | Stores user profile & auth info    |
| `cart`      | Holds current user cart contents   |
| *(planned)* `orders`, `products`, `addresses` — for future scalability |

---

## Used Media

- **Promo Video:** [YouTube Link](https://youtu.be/4WVbeXkORrw?si=28uVGsgdmb2jaJZ3)

---

## Project Notes

> This project is a work-in-progress and serves as a platform for hands-on exploration of full-stack development, 3D UI/UX, and interactive e-commerce concepts.  
> Designed with a strong focus on user experience, modular architecture, and real-world functionality.

---
