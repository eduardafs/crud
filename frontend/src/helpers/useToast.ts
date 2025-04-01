import { ref } from 'vue'

const visible = ref(false)
const message = ref('')

export function useToast() {
  const showToast = (msg: string) => {
    message.value = msg
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, 3000) // Exibe o toast por 3 segundos
  }

  const hideToast = () => {
    visible.value = false
  }

  return {
    visible,
    message,
    showToast,
    hideToast,
  }
}
