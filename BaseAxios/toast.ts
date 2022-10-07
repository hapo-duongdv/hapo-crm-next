import { toast } from 'react-toastify';

const options: any = {
  theme: 'colored',
  autoClose: 5000,
  pauseOnFocusLoss: false
}

export const successToast = (message: string) => {
  toast.success(message, options)  
}

export const errorToast = (message: string) => {
  toast.error(message, options)
}
