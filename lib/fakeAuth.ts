export type Role = "intern" | "admin" | null;

const KEY = "kyzor_role";

export function setRole(role: Exclude<Role, null>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, role);
}

export function getRole(): Role {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  if (v === "intern" || v === "admin") return v;
  return null;
}

export function clearRole() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}