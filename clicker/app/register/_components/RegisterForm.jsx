import Link from "next/link"

const RegisterForm = () => {
  return (
    <div>
        <h1> Enter details </h1>

        <form>  
            <input type = "text" placeholder = "Full Name" /> 
            <input type = "text" placeholder = "Email" /> 
            <input type = "password" placeholder = "Password" />
            <button>
                Login    
            </button> 

            <div> Error Message </div>
            <br />
            <Link href = "/login">
                Do you already have an account? Login
            </Link>
        </form>
    </div>
  )
}

export default RegisterForm