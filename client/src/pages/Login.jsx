import { useState } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ Google Login:", result.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google Sign-In Error", err);
    }
  };

  const loginWithEmail = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Email Login:", userCred.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login to StudyCircle</h2>

      <input
        className="w-full p-2 border mb-2"
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="w-full p-2 border mb-4"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-blue-600 text-white py-2 rounded mb-2"
        onClick={loginWithEmail}
      >
        Sign In with Email
      </button>

      <button
        className="w-full bg-red-500 text-white py-2 rounded mb-4"
        onClick={loginWithGoogle}
      >
        Sign In with Google
      </button>

      <p className="text-center">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;
