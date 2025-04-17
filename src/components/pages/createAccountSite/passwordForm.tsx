import Button from '@/components/button'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { InputFieldsCreateAccount } from '.'
import InputErrorMessage from '../inputErrorMessage'
import { PasswordInput } from '@/components/ui/password-input'
// import { validatePassword } from '@/components/utils/validatePassword'

export default function PasswordForm() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<InputFieldsCreateAccount>()

  const password = watch('password')

  return (
    <>
      <h1 className="text-2xl sm:text-[32px] text-primary font-bold">
        Crie uma senha
      </h1>

      <div className="w-full mt-14 flex flex-col gap-4">
        <p className="text-sm sm:text-center">
          Use pelo menos 10 caracteres, incluindo letras maiúsculas, letras
          minúsculas e números.
        </p>

        <PasswordInput
          placeholder="Insira sua senha"
          {...register('password', {
            required: 'Campo obrigatório',
            // validate: validatePassword,
          })}
          errorMessage={
            errors.password && (
              <InputErrorMessage error={errors.password?.message} />
            )
          }
        />

        <PasswordInput
          placeholder="Confirme sua senha"
          {...register('confirmPassword', {
            required: 'Campo obrigatório',
            validate: value => value === password || 'As senhas não coincidem',
          })}
          errorMessage={
            errors.confirmPassword && (
              <InputErrorMessage error={errors.confirmPassword?.message} />
            )
          }
        />

        <Button color="secondary" className="w-full" type="submit">
          Login
        </Button>

        <Button
          color="primary"
          variant="outlined"
          className="flex sm:hidden w-full"
        >
          Retornar
        </Button>
      </div>
    </>
  )
}
