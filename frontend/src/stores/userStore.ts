import { defineStore } from 'pinia'
import { userService } from '@/services/api'
import type { User, UserInput, UserUpdate } from '@/types'
import { useToast } from '@/helpers/useToast'

const { showToast } = useToast()

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[],
    currentUser: null as User | null,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await userService.getAllUsers()
        this.users = response
      } catch (err: any) {
        this.error = err.response.data.message || 'Erro ao buscar usuários'
        if (this.error) {
          showToast(this.error)
        }
      } finally {
        this.loading = false
      }
    },

    async fetchUserById(id: string) {
      this.loading = true
      this.error = null
      try {
        const response = await userService.getUserById(id)
        this.currentUser = response
      } catch (err: any) {
        this.error = err.response.data.message || 'Erro ao buscar usuário'
        if (this.error) {
          showToast(this.error)
        }
      } finally {
        this.loading = false
      }
    },

    async createUser(userData: UserInput) {
      this.loading = true
      this.error = null
      try {
        const newUser = await userService.createUser(userData)
        this.users.push(newUser)
        return newUser
      } catch (err: any) {
        this.error = err.response.data.message || 'Erro ao criar usuário'
        if (this.error) {
          showToast(this.error)
        }
      } finally {
        this.loading = false
      }
    },

    async updateUser(id: string, userData: UserUpdate) {
      this.loading = true
      this.error = null
      try {
        const updatedUser = await userService.updateUser(id, userData)
        const index = this.users.findIndex((user) => user.id === id)
        if (index !== -1) {
          this.users[index] = updatedUser
        }
        return updatedUser
      } catch (err: any) {
        this.error = err.response.data.message || 'Erro ao atualizar usuário'
        if (this.error) {
          showToast(this.error)
        }
      } finally {
        this.loading = false
      }
    },

    async deleteUser(id: string) {
      this.loading = true
      this.error = null
      try {
        await userService.deleteUser(id)
        this.users = this.users.filter((user) => user.id !== id)
      } catch (err: any) {
        this.error = err.response.data.message || 'Erro ao excluir usuário'
        if (this.error) {
          showToast(this.error)
        }
      } finally {
        this.loading = false
      }
    },
  },
})
