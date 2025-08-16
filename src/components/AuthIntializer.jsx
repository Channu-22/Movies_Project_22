
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUser } from "../slices/authSlice";
import app from "../fireBase";

function AuthInitializer() {
  const dispatch = useDispatch();
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedInUser) => {
      dispatch(setUser(loggedInUser ? loggedInUser.toJSON() : null));
    });

    return () => unsubscribe();
  }, [dispatch, auth]);

  return null;
}

export default AuthInitializer;
