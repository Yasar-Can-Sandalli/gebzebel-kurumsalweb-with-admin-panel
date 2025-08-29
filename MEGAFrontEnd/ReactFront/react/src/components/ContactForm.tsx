import { useState } from "react";
import { createContactMessage } from "../files/api/contactApi";

export default function ContactForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    messageText: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Ad Soyad zorunlu";
    if (!form.email.trim()) return "E-posta zorunlu";
    if (!/\S+@\S+\.\S+/.test(form.email)) return "E-posta formatı hatalı";
    if (!form.messageText.trim()) return "Mesaj zorunlu";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }
    setLoading(true);
    try {
      const res = await createContactMessage(form);
      setDone(`Mesajınız alındı. ID: ${res.id}`);
      setForm({ fullName: "", email: "", phone: "", subject: "", messageText: "" });
    } catch (err: any) {
      setError(err?.message || "Bir hata oluştu");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      {done && <div style={{ color: "green" }}>{done}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="fullName" placeholder="Ad Soyad" value={form.fullName} onChange={onChange} className="border p-2 rounded" />
        <input name="email" placeholder="E-posta" value={form.email} onChange={onChange} className="border p-2 rounded" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <input name="phone" placeholder="Telefon" value={form.phone} onChange={onChange} className="border p-2 rounded" />
        <input name="subject" placeholder="Konu" value={form.subject} onChange={onChange} className="border p-2 rounded" />
      </div>
      <div className="mt-4">
        <textarea name="messageText" placeholder="Mesajınız" value={form.messageText} onChange={onChange} className="border p-2 rounded w-full h-32" />
      </div>
      <button type="submit" disabled={loading} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Gönderiliyor..." : "Gönder"}
      </button>
    </form>
  );
}


