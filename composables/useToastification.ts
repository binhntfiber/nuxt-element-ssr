import { useToast } from 'vue-toastification'
import Success from '~~/components/Message/Success.vue'
import Error from '~~/components/Error.vue'

export const useToastification = () => {
  const toast = useToast()
  const toastSuccess = (message: string) => {
    toast({
      component: Success,
      props: {
        message,
      },
    })
  }
  const toastError = (message: string) => {
    toast({
      component: Error,
      props: {
        message,
      },
    })
  }
  return { toast, toastSuccess, toastError }
}
