<template>
  <h2>{{ getContent('admin.auth.title') }}</h2>
  <MeshFormWrapper
    :content="getScopedContent"
    :form="currentForm"
    :formValues="formValues"
    @submit="onSubmit"
  />
  <MeshButton
    name="auth"
    id="auth_0"
    variant="tertiary"
    :label="authMethod === FORM_NAMES.LOGIN ? getContent('admin.auth.buttons.goToRegister') : getContent('admin.auth.buttons.goToLogin')"
    @click="updateAuthMethod()"
  />
  <p>{{ response }}</p>
</template>

<script setup lang="ts">
import { formData } from '~~/builders/forms'
import { useAuth } from '~~/composables/useAuth'
import { usePath } from '~~/composables/usePath'
import { useContent } from '~~/composables/useContent'
import { FORM_NAMES } from '~~/constants/forms'
import { MeshButton, MeshFormWrapper } from 'mesh-ui-components'

  definePageMeta({
    layout: 'admin'
  });

  const { queryKey, updateQuery } = usePath()
  const { getContent, getScopedContent } = useContent('global.forms')
  const { login, register } = useAuth()

  const authMethod = ref(queryKey === FORM_NAMES.LOGIN || !queryKey ? FORM_NAMES.LOGIN : FORM_NAMES.REGISTER)
  const formValues = ref({}) as Record<string, any>
  const response = ref() 

  const currentForm = computed(() => authMethod.value === FORM_NAMES.LOGIN ? formData.login : formData.register)

  const onSubmit = async ({ formValues } : Record<string, any>) => {
    if (authMethod.value === FORM_NAMES.LOGIN) {
      await login(formValues.value)
    }
    if (authMethod.value === FORM_NAMES.REGISTER) {
      await register(formValues.value)
    }
    formValues.value = {}
  }

  const updateAuthMethod = () => {
    authMethod.value = authMethod.value === FORM_NAMES.LOGIN ? FORM_NAMES.REGISTER : FORM_NAMES.LOGIN
    updateQuery(authMethod.value)
  }
</script>