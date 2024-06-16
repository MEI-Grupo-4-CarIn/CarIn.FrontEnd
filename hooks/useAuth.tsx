import { useState, useContext, createContext, ReactNode, useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextProps {
  user: User | null;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const user: User = {
          id: decodedToken.id,
          email: decodedToken.email,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          role: decodedToken.role,
        };
        setUser(user);
        return user;
      } catch (error) {
        console.log("Token validation failed:", error);
        logout();
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      await fetchUser();
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const loginMutation = useMutation(async (credentials: { email: string; password: string }) => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_GATEWAY_BASE_URL}/auth/login`, credentials)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        const decodedToken: any = jwtDecode(response.data.token);
        const user: User = {
          id: decodedToken.id,
          email: decodedToken.email,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          role: decodedToken.role,
        };
        setUser(user);
      })
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    queryClient.clear();
  };

  return <AuthContext.Provider value={{ user, login: loginMutation.mutateAsync, logout, isLoading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
