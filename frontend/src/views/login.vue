<script setup lang="ts">
import { ref } from "vue"
import { useAuthStore } from "../store/auth.store.ts";
import router from "../router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { AlertCircle } from "lucide-vue-next"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"

const alertError = ref(false)

async function handleSubmit(event: Event) {
  event.preventDefault()

  const email = document.getElementById("email") as HTMLInputElement
  const password = document.getElementById("password") as HTMLInputElement

  try {
    await useAuthStore().login(email.value, password.value)
    router.push({ name: "dashboard" })
  }
  catch (error) {
    console.error("Error submitting form", error)
    alertError.value = true
  }
}
</script>

<template>

  <Alert v-if="alertError" variant="destructive" class="mb-4 text-left">
    <AlertCircle class="w-4 h-4" />
    <AlertTitle>Erreur de connexion</AlertTitle>
    <AlertDescription>
      Vos email et mot de passe sont incorrects.
    </AlertDescription>
  </Alert>

  <form @submit="handleSubmit">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle class="text-2xl">
          Connexion
        </CardTitle>
        <CardDescription>
          Entrez vos identifiants pour accéder à l'application.
        </CardDescription>
      </CardHeader>
      <CardContent class="grid gap-4">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required autocomplete="email" />
        </div>
        <div class="grid gap-2">
          <Label for="password">Mot de passe</Label>
          <Input id="password" type="password" required autocomplete="current-password" />
        </div>
      </CardContent>
      <CardFooter>
        <Button class="w-full" type="submit">
          Se connecter
        </Button>
      </CardFooter>
    </Card>
  </form>



</template>