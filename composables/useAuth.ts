// @ts-nocheck
const user = ref(null)
const loading = ref(false)
let initialized = false

export const useAuth = () => {
    if (!initialized) {
        initialized = true
    }

    const login = async (email: string, password: string) => {
        loading.value = true
        try {
            // TODO: Implementar autenticación alternativa
            console.warn('Autenticación no implementada - Supabase eliminado')
            return { data: null, error: new Error('Autenticación no implementada') }
        } catch (error) {
            return { data: null, error }
        } finally {
            loading.value = false
        }
    }

    const register = async (email: string, password: string) => {
        loading.value = true
        try {
            // TODO: Implementar registro alternativo
            console.warn('Registro no implementado - Supabase eliminado')
            return { data: null, error: new Error('Registro no implementado') }
        } catch (error) {
            return { data: null, error }
        } finally {
            loading.value = false
        }
    }

    const logout = async () => {
        loading.value = true
        try {
            user.value = null
            return { error: null }
        } catch (error) {
            return { error }
        } finally {
            loading.value = false
        }
    }

    const getCurrentUser = async () => {
        // TODO: Implementar obtención de usuario alternativo
        return null
    }

    const onAuthStateChange = (callback: (event: string, session: any) => void) => {
        // TODO: Implementar listener de cambios de autenticación alternativo
        return { unsubscribe: () => {} }
    }

    return {
        user: readonly(user),
        loading: readonly(loading),
        login,
        register,
        logout,
        getCurrentUser,
        onAuthStateChange
    }
}
