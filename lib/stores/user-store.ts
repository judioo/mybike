import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User interface
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: Date;
  lastLoginAt: Date;
}

// User preferences interface
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD';
  language: 'en' | 'fr' | 'es' | 'de';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  defaultPaymentMethod?: string;
  shippingAddresses: Address[];
  billingAddresses: Address[];
}

// Address interface
export interface Address {
  id: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
  isDefault: boolean;
}

// Authentication state
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  token?: string;
  refreshToken?: string;
  expiresAt?: Date;
}

// User store state interface
interface UserState {
  // User data
  user: User | null;
  preferences: UserPreferences;
  auth: AuthState;

  // Actions
  login: (
    user: User,
    token: string,
    refreshToken?: string,
    expiresIn?: number
  ) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, updates: Partial<Address>) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string, type: 'shipping' | 'billing') => void;

  // Auth helpers
  setLoading: (loading: boolean) => void;
  refreshToken: () => Promise<void>;
  isTokenExpired: () => boolean;
}

// Default preferences
const defaultPreferences: UserPreferences = {
  theme: 'system',
  currency: 'USD',
  language: 'en',
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
  shippingAddresses: [],
  billingAddresses: [],
};

// Default auth state
const defaultAuthState: AuthState = {
  isAuthenticated: false,
  isLoading: false,
};

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create the user store with persistence
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      preferences: defaultPreferences,
      auth: defaultAuthState,

      login: (
        user: User,
        token: string,
        refreshToken?: string,
        expiresIn?: number
      ) => {
        const expiresAt = expiresIn
          ? new Date(Date.now() + expiresIn * 1000)
          : undefined;

        set({
          user,
          auth: {
            isAuthenticated: true,
            isLoading: false,
            token,
            refreshToken,
            expiresAt,
          },
        });
      },

      logout: () => {
        set({
          user: null,
          auth: defaultAuthState,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (!currentUser) return;

        set({
          user: { ...currentUser, ...updates },
        });
      },

      updatePreferences: (updates: Partial<UserPreferences>) => {
        set((state) => ({
          preferences: { ...state.preferences, ...updates },
        }));
      },

      addAddress: (addressData: Omit<Address, 'id'>) => {
        const newAddress: Address = {
          ...addressData,
          id: generateId(),
        };

        set((state) => {
          const addresses =
            addressData.type === 'shipping'
              ? state.preferences.shippingAddresses
              : state.preferences.billingAddresses;

          // If this is the first address of this type, make it default
          if (addresses.length === 0) {
            newAddress.isDefault = true;
          }

          return {
            preferences: {
              ...state.preferences,
              [addressData.type === 'shipping'
                ? 'shippingAddresses'
                : 'billingAddresses']: [...addresses, newAddress],
            },
          };
        });
      },

      updateAddress: (id: string, updates: Partial<Address>) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            shippingAddresses: state.preferences.shippingAddresses.map(
              (addr) => (addr.id === id ? { ...addr, ...updates } : addr)
            ),
            billingAddresses: state.preferences.billingAddresses.map((addr) =>
              addr.id === id ? { ...addr, ...updates } : addr
            ),
          },
        }));
      },

      removeAddress: (id: string) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            shippingAddresses: state.preferences.shippingAddresses.filter(
              (addr) => addr.id !== id
            ),
            billingAddresses: state.preferences.billingAddresses.filter(
              (addr) => addr.id !== id
            ),
          },
        }));
      },

      setDefaultAddress: (id: string, type: 'shipping' | 'billing') => {
        set((state) => {
          const addressArray =
            type === 'shipping'
              ? state.preferences.shippingAddresses
              : state.preferences.billingAddresses;

          const updatedAddresses = addressArray.map((addr) => ({
            ...addr,
            isDefault: addr.id === id,
          }));

          return {
            preferences: {
              ...state.preferences,
              [type === 'shipping' ? 'shippingAddresses' : 'billingAddresses']:
                updatedAddresses,
            },
          };
        });
      },

      setLoading: (loading: boolean) => {
        set((state) => ({
          auth: { ...state.auth, isLoading: loading },
        }));
      },

      refreshToken: async () => {
        const { auth } = get();
        if (!auth.refreshToken) return;

        try {
          set((state) => ({
            auth: { ...state.auth, isLoading: true },
          }));

          // TODO: Implement actual refresh token API call
          // const response = await api.refreshToken(auth.refreshToken);

          // For now, just update loading state
          set((state) => ({
            auth: { ...state.auth, isLoading: false },
          }));
        } catch (error) {
          console.error('Token refresh failed:', error);
          get().logout();
        }
      },

      isTokenExpired: () => {
        const { auth } = get();
        if (!auth.expiresAt) return false;
        return new Date() > auth.expiresAt;
      },
    }),
    {
      name: 'mybike-user', // localStorage key
      partialize: (state) => ({
        user: state.user,
        preferences: state.preferences,
        auth: {
          isAuthenticated: state.auth.isAuthenticated,
          token: state.auth.token,
          refreshToken: state.auth.refreshToken,
          expiresAt: state.auth.expiresAt,
          // Don't persist loading state
        },
      }),
    }
  )
);
