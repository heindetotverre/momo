import { useUsers } from '~~/composables/useUsers'

export const useAuth = () => {
  const { createUser } = useUsers()
  
  const login = async (formValues : Record<string, any>) => {
    try {
      const { data, error } : { data : Ref<{authenticated: boolean} | null>, error : any } = await useFetch('/api/auth', {
        body: formValues,
        method: 'post'
      })
      if (!error.value && data.value?.authenticated) {
        const router = useRouter()
        router.push('/admin/dashboard')
        return
      }
      return error.value.data.message
    } catch (error) {
      return error
    }
  }

  const register = async (formValues : Record<string, any>) => {
    return await createUser(formValues)
  }

  return {
    login,
    register
  }
}