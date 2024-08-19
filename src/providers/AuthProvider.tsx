'use client';

import ConsentBanner from '@/components/ConsentBanner';
import { BottomSheet } from 'react-spring-bottom-sheet';
import dynamic from 'next/dynamic';
import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import Cookies, { CookieSetOptions } from 'universal-cookie';

const Drawer = dynamic(() => import('react-modern-drawer').then((module) => module.default));

const cookies = new Cookies();

// Define the shape of your context state
interface AuthState {
  consentGiven: 'GIVE_CONSENT' | 'WITHDRAW_CONSENT';
}

// Define the actions that can be dispatched
type AuthAction = { type: 'GIVE_CONSENT' } | { type: 'WITHDRAW_CONSENT' } | { type: 'INITIAL_STATE' };

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
  isShowConsent?: string;
}

// Create context with initial state
export const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> }>({
  state: { consentGiven: 'GIVE_CONSENT' },
  dispatch: () => null,
});

// Reducer function
const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'GIVE_CONSENT':
      cookies.set('consent', 'WITHDRAW_CONSENT', { path: '/' } as CookieSetOptions);
      return { ...state, consentGiven: 'WITHDRAW_CONSENT' };
    case 'WITHDRAW_CONSENT':
      cookies.set('consent', 'WITHDRAW_CONSENT', { path: '/' } as CookieSetOptions);
      return { ...state, consentGiven: 'WITHDRAW_CONSENT' };
    case 'INITIAL_STATE':
      return { ...state };
    default:
      return state;
  }
};

// Context provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children, isShowConsent }) => {
  const [state, dispatch] = useReducer(reducer, { consentGiven: cookies.get('consent') });

  // Effect to set initial state based on cookie
  useEffect(() => {}, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BottomSheet open={state.consentGiven === 'GIVE_CONSENT' && isShowConsent === 'true'}>
        <ConsentBanner />
      </BottomSheet>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
