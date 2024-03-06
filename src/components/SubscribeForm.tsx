import { useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools"

type FormValues = {
  username: string;
  email: string;
}

export const SubscribeForm = () => {
  const { register, control, handleSubmit, formState } = useForm<FormValues>({
    defaultValues: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
      const data = await response.json();
      return {
        username: data.name,
        email: data.email
      }
    }
  });

  const { errors } = formState

  const onSubmit = (data: FormValues) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <label htmlFor="username">Username</label>
      <input 
        type="text" 
        id="username" 
        {
          ...register('username', {
            required: 'Username is needed'
          })
        }
      />
      <p>{errors.username?.message}</p>

      <label htmlFor="email">Email</label>
      <input 
        type="email" 
        id="email" 
        {
          ...register('email', {
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'Invalid email'
            },
            validate: {
              notAdmin: (fieldValue) => {
                return fieldValue !== 'admin@example.com' || 'Please use another email'
              }
            }
          })
        }
      />
      <p>{errors.email?.message}</p>

      <button>Submit</button>
      <DevTool control={control} />
    </form>
  )
}