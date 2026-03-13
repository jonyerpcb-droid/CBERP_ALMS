"use client";

import { useState } from "react"; // ✅ Add this import
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  
  // ✅ 1. Define the state for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ 2. Now 'email' and 'password' are defined from state
      await authService.login(email, password); 
      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email} // ✅ 3. Link input to state
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email"
        required 
      />
      <input 
        type="password" 
        value={password} // ✅ 4. Link input to state
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password"
        required 
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
