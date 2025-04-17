export const validatePassword = (value: string) => {
  if (value.length < 10) {
    return 'A senha deve ter no mínimo 10 caracteres'
  }

  if (!/[a-z]/.test(value)) {
    return 'A senha deve ter pelo menos uma letra minúscula'
  }

  if (!/[A-Z]/.test(value)) {
    return 'A senha deve ter pelo menos uma letra maiúscula'
  }

  if (!/[0-9]/.test(value)) {
    return 'A senha deve ter pelo menos um número'
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) {
    return 'A senha deve ter pelo menos um caractere especial'
  }
  if (/\s/.test(value)) {
    return 'A senha não pode ter espaços em branco'
  }

  return true
}
