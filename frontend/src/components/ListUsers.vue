<script setup lang="ts">
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const deleteUser = async (id: string) => {
  try {
    await userStore.deleteUser(id)
  } catch (error) {
    console.error('Erro ao excluir o usuário', error)
  }
}

defineProps(['onEditUser'])
</script>

<template>
  <div v-if="userStore.users.length > 0" class="p-4 p-md-5 mt-4">
    <h2 class="mb-4 text-center fs-2">Usuários Cadastrados</h2>
    <div class="table-responsive">
      <table class="table table-hover item">
        <thead class="table-dark">
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userStore.users" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td>
              <button class="btn btn-warning me-2" @click="onEditUser(user)">Editar</button>
              <button class="btn btn-danger" @click="deleteUser(user.id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
