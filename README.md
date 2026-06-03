# Daryll & Hannah — Wedding Website 💍

A custom-built wedding website celebrating the marriage of **Daryll and Hannah**. Features an invitation landing page, story timeline, venue and schedule details, online RSVP management, seat inquiry, and a full admin dashboard for guest list management.

Built with **[AdonisJS 7](https://adonisjs.com/)** (full-stack Node.js framework) and **[React](https://react.dev/)** / **[Inertia.js](https://inertiajs.com/)** on the frontend, powered by **MySQL** and styled with **Tailwind CSS** and **Motion** animations.

---

## ✨ Features

### 🌍 Public Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Home 🏠 | Landing page with our story, venue details, attire info, and photo gallery |
| `/rsvp` | RSVP 💌 | Invitation lookup and response submission via unique invite key |
| `/seat-inquiry` | Seat Inquiry 🪑 | Look up your assigned table by guest name |

### 🔐 Admin Pages
| Route | Page | Description |
|-------|------|-------------|
| `/login` | Admin Login 🔑 | Secure admin authentication |
| `/guests` | Guest Management 📋 | Full CRUD for families and guests; generate invite keys; view audit logs |
| `/statistics` | Dashboard 📊 | Guest stats, attendance counts, and data visualizations (via D3) |

### 🎯 Key Features
- **🔑 Invite Key System** — Each family receives a unique short code linked to their invitation, with expiration handling and QR code generation
- **📬 RSVP Workflow** — Guests scans the QR code or visit the generated link to view their invitation, confirm attendance, and specify guest count
- **🚦 Rate Limiting** — RSVP and login endpoints are throttled to prevent abuse
- **📝 Audit Logging** — Every RSVP action (IP, user agent, request data) is logged for security
- **🔍 Seat Finder** — Searchable guest directory showing table assignments
- **📱 Responsive Design** — Mobile-first layout with dynamic viewport height support
- **🖼️ Photo Gallery** — Pre-wedding shoot gallery with lazy-loaded images

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend Framework** | [AdonisJS 7](https://adonisjs.com/) |
| **Frontend** | [React 19](https://react.dev/) + [Inertia.js](https://inertiajs.com/) |
| **TypeScript** | TypeScript 6.0 |
| **Database** | MySQL 8+ (via `mysql2` + Lucid ORM) |
| **Validation** | [VineJS 4](https://vinejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) (CDN) |
| **Animations** | [Motion](https://motion.dev/) (successor to Framer Motion) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Auth** | AdonisJS Auth with API tokens |
| **Session** | Cookie-based sessions |
| **Security** | CSRF protection (Shield), CORS, rate limiting |
| **Testing** | Japa (unit + functional tests) |
| **Deployment** | PM2 cluster mode (production) |

---

## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js** >= 24.0.0
- **MySQL** 8+
- **npm** 10+

### 📦 Installation

```bash
# Clone the repository
git clone https://github.com/daryllmagsombol/daryll-and-hannah-wedding-site.git
cd daryll-and-hannah-wedding-site

# Install dependencies
npm install --legacy-peer-deps

# Copy environment file and configure
cp .env.example .env

# Generate application key
node ace generate:key

# Run database migrations
node ace migration:run

# (Optional) Seed sample data
node ace db:seed
```

### 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APP_KEY` | Application encryption key | *(generated)* |
| `DB_HOST` | MySQL host | `127.0.0.1` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | `root` |
| `DB_DATABASE` | MySQL database name | `app` |
| `SESSION_DRIVER` | Session storage driver | `cookie` |
| `LIMITER_STORE` | Rate limiter backend | `redis` |

### 💻 Development

```bash
# Start the dev server with hot module replacement
node ace serve --hmr
```

The app will be available at **http://localhost:3333**.

### 📦 Production Build

```bash
# Build the application
node ace build

# Navigate to build directory and install production deps
cd build
npm ci --omit=dev

# Start with PM2
pm2 start ../ecosystem.config.cjs
```

---

## 📁 Project Structure

```
├── ace.js                          # 🎯 CLI entrypoint
├── adonisrc.ts                     # ⚙️ AdonisJS configuration
├── app/
│   ├── controllers/                # 🎮 Route controllers
│   │   ├── guests_controller.ts    # 👥 Guest CRUD + invite keys
│   │   ├── login_controller.ts     # 🔑 Admin authentication
│   │   ├── rsvps_controller.ts     # 💌 RSVP submission logic
│   │   ├── seat_inquiries_controller.ts
│   │   └── statistics_controller.ts
│   ├── exceptions/
│   │   └── handler.ts              # 🚫 Error pages (404, 429, 5xx)
│   ├── middleware/
│   │   ├── auth_middleware.ts       # 🛡️ Auth guard
│   │   ├── audit_logger_middleware.ts
│   │   ├── container_bindings_middleware.ts
│   │   └── inertia_middleware.ts    # 🔄 Shared Inertia data
│   └── models/
│       ├── audit_log.ts
│       ├── family_invitation.ts
│       ├── family_invitation_guest.ts
│       ├── invitation_key.ts
│       └── user.ts
├── bin/                            # 🚪 Server entrypoints
├── build/                          # 📦 Production output
├── config/
│   ├── app.ts                      # ⚙️ HTTP config
│   ├── cors.ts
│   ├── database.ts                 # 🗄️ Lucid/MySQL config
│   ├── encryption.ts               # 🔐 Encryption driver
│   ├── inertia.ts                  # ⚛️ Inertia.js config
│   ├── limiter.ts                  # 🚦 Rate limiting
│   ├── session.ts
│   ├── shield.ts                   # 🛡️ Security headers
│   └── static.ts
├── database/
│   └── migrations/                 # 📜 Database migrations
├── inertia/                        # ⚛️ Frontend (React + Inertia)
│   ├── app.tsx                     # 🚀 App entrypoint
│   ├── pages/                      # 📄 Page components
│   │   ├── home.tsx                # 🏠 Landing page
│   │   ├── rsvp.tsx                # 💌 RSVP form
│   │   ├── seat-inquiry.tsx        # 🪑 Seat finder
│   │   ├── valentines.tsx
│   │   ├── admin-login.tsx
│   │   ├── admin/guests.tsx        # 📋 Guest management dashboard
│   │   ├── admin/statistics.tsx    # 📊 Statistics dashboard
│   │   ├── errors/                 # 🚫 Error pages
│   │   └── shared/                 # 🔄 Shared components
│   ├── components/                 # 🧩 Reusable UI components
│   ├── css/                        # 🎨 Global styles + Tailwind
│   ├── hooks/                      # 🪝 React hooks
│   ├── lib/                        # 🛠️ Utility functions
│   ├── shared/                     # 🔄 Shared frontend modules
│   ├── assets/                     # 🖼️ Images, videos, fonts
│   └── tsconfig.json
├── resources/views/
│   └── inertia_layout.edge         # 📐 Root Edge template
├── start/
│   ├── kernel.ts                   # 🔧 Middleware registration
│   ├── routes.ts                   # 🛣️ Route definitions
│   └── limiter.ts                  # 🚦 Rate limit config
└── tests/                          # 🧪 Test suites
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | 🔥 Start dev server with HMR |
| `npm run build` | 📦 Build for production |
| `npm run test` | 🧪 Run test suite |
| `npm run lint` | 🔍 ESLint check |
| `npm run format` | ✨ Prettier formatting |
| `npm run typecheck` | ✅ TypeScript type checking |

---

## 🚢 Deployment

The app is configured for deployment with **PM2** in cluster mode. It is deployed in Azure App Services, a full Node.js server.

### PM2

```bash
pm2 start ecosystem.config.cjs
```

### 🌐 Environment

Refer to `.env.example` for required environment variables. In production, ensure:
- `APP_KEY` is set to a secure random value
- `NODE_ENV=production`
- Database credentials are configured
- Redis is available for rate limiting (`LIMITER_STORE=redis`)

---

## 📄 License

UNLICENSED — Private project. 💒
