'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from 'react';
import api from '@/lib/utils/api.util';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  onboardingCompleted: boolean;
  role: string;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
}

interface AuthContextValue extends AuthState {
  tokenRef: React.MutableRefObject<string | null>;
  setAuth: (token: string, user: AuthUser) => void;
  clearAuth: () => void;
  isAuthenticated: boolean;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    accessToken: null,
    user: null,
  });

  // Ref for synchronous access before React flushes state
  const tokenRef = useRef<string | null>(null);

  const setAuth = useCallback((token: string, user: AuthUser) => {
    // Write to ref synchronously — available before React re-render
    tokenRef.current = token;
    // Set on the axios singleton — every subsequent request carries this automatically
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAuthState({ accessToken: token, user });
  }, []);

  const clearAuth = useCallback(() => {
    tokenRef.current = null;
    delete api.defaults.headers.common['Authorization'];
    setAuthState({ accessToken: null, user: null });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        tokenRef,
        setAuth,
        clearAuth,
        isAuthenticated: !!authState.accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
