import { useState, useEffect } from 'react'
import { useStore } from '../store';


function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .split('')
      .map(c => {
        switch (c) {
          case 'x': return (Math.random() * 16 | 0).toString(16);
          case 'y': return ((Math.random() * 4 | 0) + 8).toString(16);
          default: return c;
        }
      })
      .join('');
   }

export default function Login() {
  const { update_access_token} =  useStore()
  const [inputValue, setInputValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateInput = (value) => {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
    return regex.test(value)
  }

  useEffect(() => {
    const sampleUUID = uuid()
    setInputValue(sampleUUID)
    setIsValid(true) 
  }, []) 

  useEffect(() => {
    setIsValid(validateInput(inputValue))
  }, [inputValue])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid && !isSubmitted) {
     update_access_token(inputValue)
      setIsSubmitted(true)
      setInputValue('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center   w-[40%]  justify-end ">
      <input
        type="text"
        id="access_token"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`border-b-2 border-gray-300 focus:border-blue-500 w-full outline-none px-2 py-1 mr-2 ${
          isSubmitted ? 'bg-gray-100 text-gray-500' : ''
        }`}
        placeholder="Enter UUID"
        disabled={isSubmitted}
      />
      <button
        id="login"
        type="submit"
        disabled={!isValid || isSubmitted}
        className={`px-4 py-2 rounded ${
          isValid && !isSubmitted
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
         Login
      </button>
    </form>
  )
}

