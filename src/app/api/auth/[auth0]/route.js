// Handles 'api/auth/login' & 'api/auth/logout'.
import { handleAuth } from "@auth0/nextjs-auth0";

export const GET = handleAuth();
