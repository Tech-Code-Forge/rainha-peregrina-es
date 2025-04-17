interface InputErrorMessageProps {
  error: string | undefined
}

export default function InputErrorMessage({ error }: InputErrorMessageProps) {
  return <span className="text-xs text-red-500">{error}</span>
}
