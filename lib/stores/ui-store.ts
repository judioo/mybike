import { create } from 'zustand';

// Notification types
export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number; // in milliseconds, 0 = persistent
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: Date;
}

// Modal types
export type ModalType =
  | 'cart'
  | 'search'
  | 'login'
  | 'signup'
  | 'product-quick-view'
  | 'filter-mobile'
  | 'address-form'
  | 'confirm-delete'
  | 'image-zoom'
  | null;

export interface ModalData {
  [key: string]: any;
}

// Loading states
export interface LoadingStates {
  page: boolean;
  cart: boolean;
  auth: boolean;
  search: boolean;
  filters: boolean;
  product: boolean;
}

// UI store state interface
interface UIState {
  // Notifications
  notifications: Notification[];

  // Modals
  activeModal: ModalType;
  modalData: ModalData;

  // Loading states
  loading: LoadingStates;

  // Navigation
  isMobileMenuOpen: boolean;
  isSearchOpen: boolean;

  // Layout
  sidebarCollapsed: boolean;
  headerHeight: number;

  // Actions - Notifications
  addNotification: (
    notification: Omit<Notification, 'id' | 'createdAt'>
  ) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;

  // Actions - Modals
  openModal: (type: ModalType, data?: ModalData) => void;
  closeModal: () => void;
  updateModalData: (data: Partial<ModalData>) => void;

  // Actions - Loading
  setLoading: (key: keyof LoadingStates, loading: boolean) => void;
  setMultipleLoading: (states: Partial<LoadingStates>) => void;

  // Actions - Navigation
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleSearch: () => void;
  closeSearch: () => void;

  // Actions - Layout
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setHeaderHeight: (height: number) => void;
}

// Default loading states
const defaultLoadingStates: LoadingStates = {
  page: false,
  cart: false,
  auth: false,
  search: false,
  filters: false,
  product: false,
};

// Generate unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Create the UI store (no persistence needed)
export const useUIStore = create<UIState>((set, get) => ({
  // Initial state
  notifications: [],
  activeModal: null,
  modalData: {},
  loading: defaultLoadingStates,
  isMobileMenuOpen: false,
  isSearchOpen: false,
  sidebarCollapsed: false,
  headerHeight: 80,

  // Notification actions
  addNotification: (notificationData) => {
    const notification: Notification = {
      ...notificationData,
      id: generateId(),
      createdAt: new Date(),
    };

    set((state) => ({
      notifications: [...state.notifications, notification],
    }));

    // Auto-remove notification if duration is set
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        get().removeNotification(notification.id);
      }, notification.duration);
    }
  },

  removeNotification: (id: string) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  },

  // Modal actions
  openModal: (type: ModalType, data: ModalData = {}) => {
    set({
      activeModal: type,
      modalData: data,
    });

    // Prevent body scroll when modal is open
    if (type && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  },

  closeModal: () => {
    set({
      activeModal: null,
      modalData: {},
    });

    // Restore body scroll
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  },

  updateModalData: (data: Partial<ModalData>) => {
    set((state) => ({
      modalData: { ...state.modalData, ...data },
    }));
  },

  // Loading actions
  setLoading: (key: keyof LoadingStates, loading: boolean) => {
    set((state) => ({
      loading: { ...state.loading, [key]: loading },
    }));
  },

  setMultipleLoading: (states: Partial<LoadingStates>) => {
    set((state) => ({
      loading: { ...state.loading, ...states },
    }));
  },

  // Navigation actions
  toggleMobileMenu: () => {
    set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen }));
  },

  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false });
  },

  toggleSearch: () => {
    set((state) => ({ isSearchOpen: !state.isSearchOpen }));
  },

  closeSearch: () => {
    set({ isSearchOpen: false });
  },

  // Layout actions
  toggleSidebar: () => {
    set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setSidebarCollapsed: (collapsed: boolean) => {
    set({ sidebarCollapsed: collapsed });
  },

  setHeaderHeight: (height: number) => {
    set({ headerHeight: height });
  },
}));

// Notification helper functions
export const showSuccess = (
  title: string,
  message?: string,
  duration = 4000
) => {
  useUIStore.getState().addNotification({
    type: 'success',
    title,
    message,
    duration,
  });
};

export const showError = (title: string, message?: string, duration = 6000) => {
  useUIStore.getState().addNotification({
    type: 'error',
    title,
    message,
    duration,
  });
};

export const showWarning = (
  title: string,
  message?: string,
  duration = 5000
) => {
  useUIStore.getState().addNotification({
    type: 'warning',
    title,
    message,
    duration,
  });
};

export const showInfo = (title: string, message?: string, duration = 4000) => {
  useUIStore.getState().addNotification({
    type: 'info',
    title,
    message,
    duration,
  });
};
