<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/types'

const userStore = useUserStore()

const newUser = reactive({
  name: '',
  email: '',
  phone: '',
})
const editing = ref(false)
const currentId = ref<string | null>(null)

const saveUser = async () => {
  const userPayload = {
    name: newUser.name,
    email: newUser.email,
    phone: newUser.phone,
  }

  try {
    if (editing.value && currentId.value) {
      await userStore.updateUser(currentId.value, userPayload)
      cancelEdit()
    } else {
      await userStore.createUser(userPayload)
    }

    newUser.name = ''
    newUser.email = ''
    newUser.phone = ''
  } catch (error) {
    console.error('Erro ao salvar o usuário', error)
  }
}

const editUser = (user: User) => {
  newUser.name = user.name
  newUser.email = user.email
  newUser.phone = user.phone
  editing.value = true
  currentId.value = user.id
}

const cancelEdit = () => {
  newUser.name = ''
  newUser.email = ''
  newUser.phone = ''
  editing.value = false
  currentId.value = null
}

defineExpose({ editUser })
</script>

<template>
  <form @submit.prevent="saveUser">
    <div class="row g-4">
      <div class="col-12 col-md-4">
        <label for="name" class="form-label fs-5">Nome</label>
        <input
          type="text"
          class="form-control form-control-lg"
          id="name"
          placeholder="Digite seu nome"
          v-model="newUser.name"
          required
        />
      </div>
      <div class="col-12 col-md-4">
        <label for="email" class="form-label fs-5">Email</label>
        <input
          type="email"
          class="form-control form-control-lg"
          id="email"
          placeholder="Digite seu e-mail"
          v-model="newUser.email"
          required
        />
      </div>
      <div class="col-12 col-md-4">
        <label for="phone" class="form-label fs-5">Telefone</label>
        <input
          type="tel"
          class="form-control form-control-lg"
          id="phone"
          placeholder="Digite seu telefone"
          v-model="newUser.phone"
          required
        />
      </div>
      <div class="col-12 text-center mt-4">
        <button type="submit" class="btn btn-primary btn-lg px-5">
          {{ editing ? 'Atualizar' : 'Cadastrar' }}
        </button>
        <button
          v-if="editing"
          type="button"
          class="btn btn-secondary btn-lg ms-3 px-4"
          @click="cancelEdit"
        >
          Cancelar
        </button>
      </div>
    </div>
  </form>
</template>
