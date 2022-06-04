import { SyntheticEvent } from "react"

export const onInputChange = <T>(
  e: SyntheticEvent,
  formValues: T,
  setFormValues: (formValues: T) => void
) => {
  const { name, value } = e.target as HTMLInputElement
  setFormValues({ ...formValues, [name]: value })
}
