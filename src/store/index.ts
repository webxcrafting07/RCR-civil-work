import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
}

interface AuthState {
  user: AdminUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: AdminUser | null) => void
  setLoading: (loading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: 'rcr-admin-auth', partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }) }
  )
)

// UI Store
interface UIState {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  toggleMobileMenu: () => void
  adminSidebarOpen: boolean
  setAdminSidebarOpen: (open: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  mobileMenuOpen: false,
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
  toggleMobileMenu: () => set((s) => ({ mobileMenuOpen: !s.mobileMenuOpen })),
  adminSidebarOpen: true,
  setAdminSidebarOpen: (open) => set({ adminSidebarOpen: open }),
}))
