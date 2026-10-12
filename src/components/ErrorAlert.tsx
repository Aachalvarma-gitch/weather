interface ErrorAlertProps {
  message: string
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <div className="error-alert">
      <i className="bi bi-exclamation-triangle-fill"></i>
      {message}
    </div>
  )
}
