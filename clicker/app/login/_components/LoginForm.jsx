"use client"; 

import Link from "next/link"; 
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter(); 
  const [ credentials, setCredentials ] = useState({ 
    email: "", 
    password: "",
  }); 

  const [ error, setError ] = useState(""); 

  async function handleSubmit (e) { 
    e.preventDefault(); 

    try { 
      const response = await signIn('credentials', { 
        email: credentials.email, 
        password: credentials.password, 
        redirect: false, 
      }); 

      if(response.error) { 
        setError("Invalid credentials"); 
        return; 
      }
  
      router.replace("dashboard"); 
    } catch(err) { 
      console.log(err); 
    }
  }

  return (
    <div>
        <h1> Enter details </h1>

        <form onSubmit = { handleSubmit }>
            <input
              onChange = { (e) => setCredentials({ 
                ...credentials, 
                email: e.target.value
              })}
              type = "text"
              placeholder = "Email"
            /> 
            <input
              onChange = { (e) => setCredentials({ 
                ...credentials, 
                password: e.target.value
              })}
              type = "password"
              placeholder = "Password"
            />
            <button>
                Login    
            </button> 
            
            { error && 
              <div>
                { error }  
              </div>
            }
            <br />
            <Link href = "/register">
                Don't have an account? Register
            </Link>
        </form>
    </div>
  )
}

export default LoginForm; 