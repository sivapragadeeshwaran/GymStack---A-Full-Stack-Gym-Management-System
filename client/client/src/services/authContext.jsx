// src/services/authService.jsx
// Replace base URL and field names with your backend's contract.
export async function loginAPI(username, password) {
  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login failed");
  }

  const data = await res.json();
  // expected shape: { token: "...", user: { username: "...", role: "...", ... } }
  return data;
}
