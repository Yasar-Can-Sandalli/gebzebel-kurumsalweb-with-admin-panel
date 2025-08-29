const BASE_URL = import.meta.env.VITE_API_URL || "";

export type ContactCreateRequest = {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  messageText: string;
};

export async function createContactMessage(payload: ContactCreateRequest) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Request failed");
  }
  return res.json();
}


