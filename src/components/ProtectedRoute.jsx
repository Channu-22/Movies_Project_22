import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../slices/Auth";

function ProtectedRoute({ children }) {
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { user } = useAuth();

  useEffect(() => {
    const time = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearInterval(time);
  }, []);

  if (Loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#04152d" }}
      >
        <div className="px-4 sm:px-6 lg:px-14 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-400 mx-auto mb-4"></div>
            <div className="text-white text-lg font-medium">
              Loading Details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  try {
    if (!user) {
      return navigate("/login");
    }
  } catch (error) {
    console.error("Navigation error:", error);
  }

  return children;
}

export default ProtectedRoute;
