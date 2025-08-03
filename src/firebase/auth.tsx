import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore_db } from "./config";

// Type for the context value
type userType = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  createdAt: Date;
};
interface AuthContextType {
  currentUser: userType | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

// Create the context with undefined default
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for consuming the context
export function UseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Props type for provider
interface AuthProviderProps {
  children: ReactNode;
}

// Main AuthProvider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<userType | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(firestore_db, "users", user.uid);
        const userSnap = await getDoc(docRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCurrentUser(userData as userType);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Login with Google
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result?.user;
    const docRef = doc(firestore_db, "users", user?.uid);
    const userSnap = await getDoc(docRef);
    if (!userSnap?.exists()) {
      await setDoc(docRef, {
        id: user?.uid,
        email: user?.email,
        role: "user",
        name: user?.displayName,
        avatar: user?.photoURL,
        createdAt: Timestamp.now(),
      });
    }
    if (userSnap?.exists() && userSnap.data().role !== "user") {
      return navigate("/");
    }

    return navigate("/login");
  };
  // Logout
  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  const value: AuthContextType = {
    currentUser,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
