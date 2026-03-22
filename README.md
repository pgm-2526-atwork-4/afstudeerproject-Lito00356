# RoomCraft - 3D Room Configurator

A web-based 3D room configurator that lets users design interior spaces from scratch. Draw a blueprint, convert it to 3D, furnish the room, customize materials and lighting, and share snapshots via email.

## Features

- **Blueprint Editor** — Draw room walls on a 2D canvas with snapping, distance feedback, and point dragging
- **3D Perspective View** — Automatically converts blueprints into a navigable 3D room with orbit and top-down camera controls
- **Furniture & Openings** — Place furniture, doors, and windows from a categorized model catalogue (GLTF/GLB)
- **Materials & Textures** — Apply PBR textures (baseColor, normal, roughness) to floors and walls, or pick solid colors
- **Lighting System** — Choose between procedural Sky presets or HDRI environments with full control over sun position, intensity, atmosphere, and colors
- **Camera Occlusion** — Walls automatically become transparent when blocking the camera's view
- **Snapshot System** — Take screenshots with a cinematic countdown and camera viewfinder overlay
- **Email Sharing** — Send renders to anyone via email with attachments (powered by Resend + Supabase Edge Functions)
- **Project Management** — Create, save, load, and delete projects with cloud persistence
- **Onboarding** — Multi-step spotlight-based tutorial system that guides new users through each feature
- **Toast Notifications** — Contextual feedback for save, delete, snapshot, login, and other actions

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 7 |
| 3D Rendering | Three.js, React Three Fiber, Drei |
| Post-processing | @react-three/postprocessing |
| CSG (wall openings) | @react-three/csg |
| State Management | React Query (TanStack) |
| Routing | React Router 7 |
| Forms | React Hook Form + Yup validation |
| Backend | Supabase (Auth, Database, Storage, Edge Functions) |
| Email | Resend (via Supabase Edge Function) |
| Icons | Lucide React |
| Compiler | React Compiler (via Babel plugin) |

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── design/          # UI components (menus, modals, buttons, overlays)
│   │   └── functional/      # Logic components (Room3D, Furniture, Camera, Auth, Toast)
│   └── pages/
│       ├── LandingPage/     # Marketing landing page
│       ├── Login/            # Authentication
│       ├── Register/         # User registration
│       ├── Collection/       # Project overview & render gallery
│       ├── Blueprint/        # 2D wall drawing editor
│       └── Perspective/      # 3D room view & design tools
├── core/
│   ├── config/              # Catalogues (furniture, materials, onboarding steps)
│   ├── hooks/               # Custom hooks (save, onboarding, furniture, selection, openings)
│   ├── modules/             # API modules (auth, projects, mailing, storage, onboarding)
│   ├── network/             # Supabase client
│   └── utils/               # Geometry utilities (walls, openings)
├── style/                   # Global styles, theme, reset
└── main.jsx                 # App entry point & routing
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- A [Supabase](https://supabase.com) project with Auth, Database, and Storage enabled
- A [Resend](https://resend.com) account (for email functionality)

### Installation

```bash
git clone <repository-url>
cd afstudeerproject-Lito00356
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For the email Edge Function, set the Resend API key as a Supabase secret:

```bash
npx supabase secrets set RESEND_API_KEY=your_resend_api_key
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`.

### Build

```bash
npm run build
npm run preview
```

### Deploy Edge Functions

```bash
npx supabase login
npx supabase functions deploy send-email
```

## 3D Models

Models are stored in `public/models/` organized by category. Each model uses the GLTF format with associated textures and binary data. The furniture catalogue (`src/core/config/furnitureCatalogue.js`) maps categories to model paths.

## Database

The app uses Supabase for:

- **Authentication** — Email/password sign-up and login
- **Projects table** — Stores room data (walls, furniture, openings, materials)
- **Storage** — Render images saved to a `renders` bucket
- **Onboarding table** — Tracks user tutorial progress
