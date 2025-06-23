// app/contact/page.js
"use client";
import { useState } from "react";
import Navbar from '../components/Navbar';  // Import the Navbar component

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    // Validation
    if (!form.name || !form.email || !form.message) {
      setStatus("All fields are required.");
      return;
    }

    try {
      // Send POST request to API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      // Success state
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Fetch error:", error);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div>
     <Navbar/> {/* Include the Navbar component here */}
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
        {status && <p className="text-red-500">{status}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            className="w-full p-2 border rounded" 
            onChange={handleChange} 
            value={form.name} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            className="w-full p-2 border rounded" 
            onChange={handleChange} 
            value={form.email} 
            required 
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            className="w-full p-2 border rounded" 
            onChange={handleChange} 
            value={form.message} 
            required 
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
