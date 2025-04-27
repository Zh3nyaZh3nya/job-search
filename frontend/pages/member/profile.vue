<script setup lang="ts">
const store = useAuthStore()

const logout = async () => {
  try {
    await store.logout()
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <v-main>
    <section>
      <v-container>
        <h1 class="text-h4">
          {{ $t('your-profile') }}
        </h1>
      </v-container>
    </section>
    <section>
      <v-container>
        <Profile :user="store.user" @logout="logout" />
      </v-container>
    </section>
  </v-main>
</template>

<style scoped>

</style>