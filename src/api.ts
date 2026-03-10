/// <reference types="vite/client" />
// e.g. client/src/api.ts
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";
const res = await fetch(`${backendUrl}/api/dashboard`);
