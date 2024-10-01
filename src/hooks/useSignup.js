import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthcontext } from '../contexts/Authcontext'


const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const {authUser, setAuthUser}= useAuthcontext()

    const signup = async ({ email, username, password, confirmPassword }) => {
        const success = handleInputErrors({ email, username, password, confirmPassword })

        if(!success) return

        setLoading(true)

        try {
            const res = await fetch("/api/users/sign_up", {
                method: 'POST',
                headers: {
                      'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, username, password, confirmPassword })
            })
            const data = await res.json()
            if (data.error){
                throw new Error(data.error)
            }

            localStorage.setItem('chat-user', JSON.stringify(data))
            setAuthUser(data)

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return { loading, signup }
}

export default useSignup

function handleInputErrors({ email, username, password, confirmPassword }){
    if(!email || !username || !password || !confirmPassword){
        toast.error('Please fill all the feilds')
        return false
    }

    if(password !== confirmPassword){
        toast.error('passwords do not match')
        return false
    }

    if(password.length < 6){
        toast.error('Password must be atlease 6 characters')
        return false
    }

    return true
}