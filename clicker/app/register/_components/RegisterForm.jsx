"use client"; 

import Link from "next/link"; 
import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
    const router = useRouter(); 
    const [ credentials, setCredentials ] = useState({ 
        name: "",
        email: "",
        password: "",
    }); 

    const [ error, setError ] = useState(""); 

    async function handleSubmit (e) { 
        e.preventDefault(); 

        if(!credentials.name || !credentials.email || !credentials.password) { 
            setError("All fields are necessary"); 
            return; 
        }

        try { 
            const userExistsResponse = await fetch("/api/user-exists", { 
                method: "POST", 
                mode: "cors", 
                headers: { 
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify({ email: credentials.email })
            }); 

            const { user } = await userExistsResponse.json(); 
            console.log({ user }); 
            if(user) { 
                setError("User already exists."); 
                return; 
            }

            const response = await fetch("api/register", { 
                method: "POST", 
                headers: { 
                    "Content-Type": "application/json", 
                }, 
                body: JSON.stringify(credentials)
            }); 

            if(response.ok) { 
                e.target.reset(); 
                router.push("/login"); 
            } else { 
                console.log("User registration failed"); 
            }
        } catch(err) { 
            console.log(err); 
            console.log("Error during registration"); 
        }
    }
  return (
    <div>
        <h1> Enter detail </h1>

        <form onSubmit = { handleSubmit }>  
            <input
                onChange = { (e) => setCredentials({
                    ...credentials, 
                    name: e.target.value, 
                })}
                type = "text"
                placeholder = "Full Name" 
            /> 
            <input
                onChange = { (e) => setCredentials({ 
                    ...credentials, 
                    email: e.target.value, 
                })}
                type = "text"
                placeholder = "Email"
            /> 
            <input
                onChange = { (e) => setCredentials({ 
                    ...credentials,
                    password: e.target.value, 
                })}
                type = "password"
                placeholder = "Password"
            />
            <button>
                Register    
            </button> 

            { error && 
                <div>
                    { error }
                </div>
            }
            <br />
            <Link href = "/login">
                Do you already have an account? Login
            </Link>
        </form>
    </div>
  )
}

export default RegisterForm; 