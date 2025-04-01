<template>
  <div
    v-if="visible"
    class="toast align-items-center text-bg-danger border-0 show position-fixed top-0 end-0 m-3"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="d-flex">
      <div class="toast-body">
        {{ message }}
      </div>
      <button
        type="button"
        class="btn-close btn-close-white me-2 m-auto"
        aria-label="Close"
        @click="hideToast"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@/helpers/useToast'

const { visible, message, hideToast } = useToast()
</script>

<style>
.toast {
  z-index: 1055;
}
</style>
