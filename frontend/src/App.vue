<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import Form from '@/components/Form.vue'
import ListUsers from '@/components/ListUsers.vue'
import type { UserUpdate } from './types'
import Toast from '@/components/Toast.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})

const formRef = ref()

const editUser = (user: UserUpdate) => {
  formRef.value.editUser(user)
}
</script>

<template>
  <div class="d-flex min-vh-100">
    <Toast />
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="p-4 p-md-5">
            <h1 class="text-center display-4 mb-5">CRUD - USUÁRIOS 👽</h1>
            <Form ref="formRef" />
          </div>

          <hr class="border-top border-primary my-4" />

          <ListUsers :onEditUser="editUser" />
        </div>
      </div>
    </div>
  </div>
</template>
