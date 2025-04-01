import axios from 'axios'
import { API_BASE_URL } from '@/config/apiConfig'
import type { ApiResponse, User, UserInput, UserUpdate } from '@/types'

const api = axios.create({
  baseURL: API_BASE_URL,
})

export const userService = {
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await api.get<ApiResponse<User[]>>('/users')
      return response.data.data
    } catch (error) {
      console.error('Erro ao listar usuários:', error)
      throw error
    }
  },

  async getUserById(id: string): Promise<User> {
    try {
      const response = await api.get<ApiResponse<User>>(`/users/${id}`)
      return response.data.data
    } catch (error) {
      console.error(`Erro ao obter usuário com ID ${id}:`, error)
      throw error
    }
  },

  async createUser(user: UserInput): Promise<User> {
    try {
      const response = await api.post<ApiResponse<User>>('/users/register', user)
      return response.data.data
    } catch (error) {
      console.error('Erro ao obter usuários', error)
      throw error
    }
  },

  async updateUser(id: string, userData: UserUpdate): Promise<User> {
    try {
      const response = await api.put<ApiResponse<User>>(`/users/${id}`, userData)
      return response.data.data
    } catch (error) {
      console.error('Erro ao atualizar usuário', error)
      throw error
    }
  },

  async deleteUser(id: string): Promise<void> {
    try {
      await api.delete(`/users/${id}`)
    } catch (error) {
      console.error('Erro ao deletar usuário', error)
      throw error
    }
  },
}
