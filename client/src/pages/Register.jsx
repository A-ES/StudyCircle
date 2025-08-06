import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerWithEmail = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User Registered:", userCred.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Register Error:", err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register for StudyCircle</h2>

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
        className="w-full bg-green-600 text-white py-2 rounded mb-4"
        onClick={registerWithEmail}
      >
        Register
      </button>

      <p className="text-center">
        Already have an account?{" "}
        <span
          className="text-blue-600 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login here
        </span>
      </p>
    </div>
  );
}

export default Register;
