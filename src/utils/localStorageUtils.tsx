import { LoginResponse } from "../interfaces";

export function isLoginResponse(obj: unknown): obj is LoginResponse {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Record<string, unknown>).token === "string" &&
    typeof (obj as Record<string, unknown>)._id === "string" &&
    typeof (obj as Record<string, unknown>).profile === "object" &&
    (obj as Record<string, unknown>).profile !== null &&
    typeof (obj as { profile: { fullName: unknown } }).profile.fullName ===
      "string" &&
    typeof (obj as { profile: { avatar: unknown } }).profile.avatar ===
      "string" &&
    typeof (obj as { profile: { role: unknown } }).profile.role === "string" &&
    typeof (obj as { profile: { email: unknown } }).profile.email === "string"
  );
}

export function safeParseJSON(value: string | null): unknown {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Error al parsear JSON desde localStorage:", error);
    return null;
  }
}

// Valida la estructura del usuario
export function validateUserStructure(user: unknown): LoginResponse | null {
  return isLoginResponse(user) ? user : null;
}
