# 🍽️ Catering System

A full-featured web-based catering management platform built with **Django**. It enables customers to browse menus, place orders, and manage catering bookings, while administrators can manage menus, track orders, and oversee the entire catering operation.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## ✨ Features

- 🧾 **Menu Management** – Add, update, and delete food items with categories and pricing
- 📦 **Order Management** – Place, track, and manage catering orders
- 👤 **User Authentication** – Register, login, and role-based access (Admin / Customer)
- 📅 **Booking System** – Schedule catering events with date and guest count
- 🛒 **Cart Functionality** – Add items to cart and proceed to checkout
- 📊 **Admin Dashboard** – Overview of orders, bookings, and revenue
- 📱 **Responsive UI** – Mobile-friendly interface using HTML, CSS, and JavaScript

---

## 🛠️ Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Backend      | Python 3.x, Django      |
| Frontend     | HTML5, CSS3, JavaScript |
| Database     | SQLite3 (default)       |
| ORM          | Django ORM              |
| Auth         | Django Authentication   |
| Templating   | Django Templates (Jinja2-style) |

---

## 🏗️ Architecture

The project follows Django's **MVT (Model-View-Template)** architecture pattern:

```
┌─────────────────────────────────────────────────────────────────┐
│                          CLIENT (Browser)                        │
│                    HTML + CSS + JavaScript                        │
└─────────────────────┬───────────────────────────────────────────┘
                       │  HTTP Request / Response
┌─────────────────────▼───────────────────────────────────────────┐
│                        DJANGO FRAMEWORK                          │
│                                                                   │
│  ┌──────────────┐   ┌──────────────┐   ┌──────────────────────┐  │
│  │   URL Router  │──▶│    Views     │──▶│     Templates        │  │
│  │  (urls.py)   │   │  (views.py)  │   │  (.html files)       │  │
│  └──────────────┘   └──────┬───────┘   └──────────────────────┘  │
│                             │                                      │
│                    ┌────────▼────────┐                            │
│                    │     Models      │                            │
│                    │  (models.py)    │                            │
│                    └────────┬────────┘                            │
│                             │ Django ORM                         │
└─────────────────────────────┼───────────────────────────────────┘
                               │
┌─────────────────────────────▼───────────────────────────────────┐
│                         DATABASE                                  │
│                        SQLite3 (db.sqlite3)                      │
└─────────────────────────────────────────────────────────────────┘
```

### Application Flow

```
User Request
     │
     ▼
urls.py (URL Dispatcher)
     │
     ▼
views.py (Business Logic)
     ├──▶ models.py (Data Access via ORM)
     │         │
     │         ▼
     │    db.sqlite3 (Database)
     │
     ▼
templates/ (HTML Rendering)
     │
     ▼
HTTP Response → Browser
```

### Django Apps

```
catering_system/          ← Django Project Root
│
├── catering_platform/    ← Main Application App
│   ├── models.py         ← Data models (Menu, Order, Booking, etc.)
│   ├── views.py          ← Request handlers & business logic
│   ├── urls.py           ← URL routing for this app
│   ├── forms.py          ← Django forms for input validation
│   ├── admin.py          ← Admin panel configurations
│   └── templates/        ← HTML templates
│
├── core/                 ← Core/Config App
│   ├── settings.py       ← Project settings
│   ├── urls.py           ← Root URL configuration
│   └── wsgi.py           ← WSGI entry point
│
├── manage.py             ← Django management CLI
└── db.sqlite3            ← SQLite database
```

---

## 📁 Project Structure

```
catering_system/
│
├── catering_platform/          # Main Django app
│   ├── migrations/             # Database migration files
│   ├── static/                 # App-specific static files
│   │   ├── css/                # Stylesheets
│   │   ├── js/                 # JavaScript files
│   │   └── images/             # Image assets
│   ├── templates/              # HTML templates
│   │   ├── base.html           # Base layout template
│   │   ├── home.html           # Landing page
│   │   ├── menu.html           # Menu listing
│   │   ├── cart.html           # Shopping cart
│   │   ├── order.html          # Order placement
│   │   ├── booking.html        # Event booking
│   │   └── dashboard.html      # Admin dashboard
│   ├── admin.py                # Admin configurations
│   ├── apps.py                 # App configuration
│   ├── forms.py                # Form definitions
│   ├── models.py               # Database models
│   ├── urls.py                 # URL patterns
│   └── views.py                # View functions/classes
│
├── core/                       # Project configuration
│   ├── settings.py             # Django settings
│   ├── urls.py                 # Root URL config
│   ├── asgi.py                 # ASGI config
│   └── wsgi.py                 # WSGI config
│
├── db.sqlite3                  # SQLite database
├── manage.py                   # Django CLI
└── README.md                   # This file
```

---

## 🗃️ Database Design

Key models in the system:

```
┌────────────┐       ┌──────────────┐       ┌──────────────┐
│    User    │       │   MenuItem   │       │    Order     │
├────────────┤       ├──────────────┤       ├──────────────┤
│ id         │       │ id           │       │ id           │
│ username   │       │ name         │       │ user (FK)    │
│ email      │  1:N  │ description  │  M:N  │ items        │
│ password   │──────▶│ price        │◀─────▶│ total_price  │
│ role       │       │ category     │       │ status       │
│ phone      │       │ image        │       │ created_at   │
└────────────┘       │ is_available │       └──────────────┘
      │              └──────────────┘
      │ 1:N
      ▼
┌────────────┐
│  Booking   │
├────────────┤
│ id         │
│ user (FK)  │
│ event_date │
│ guests     │
│ menu_type  │
│ status     │
│ message    │
└────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip
- virtualenv (recommended)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RIDDHIMETKAR/catering_system.git
   cd catering_system
   ```

2. **Create and activate a virtual environment**
   ```bash
   python -m venv venv
   
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install django
   # or if requirements.txt exists:
   pip install -r requirements.txt
   ```

4. **Apply database migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create a superuser (Admin)**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run the development server**
   ```bash
   python manage.py runserver
   ```

7. **Open in browser**
   ```
   http://127.0.0.1:8000/
   ```

   Admin panel:
   ```
   http://127.0.0.1:8000/admin/
   ```

---

## 💻 Usage

### Customer Flow
1. Register / Login to your account
2. Browse the menu and add items to your cart
3. Place an order or book a catering event
4. Track your order status from your profile

### Admin Flow
1. Login to the admin panel at `/admin`
2. Manage menu items (add, edit, delete)
3. View and update order statuses
4. Manage event bookings and customer inquiries

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---
