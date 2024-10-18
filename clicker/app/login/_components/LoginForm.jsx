import Link from "next/link"; 

const LoginForm = () => {
  return (
    <div>
        <h1> Enter details </h1>

        <form>
            <input type = "text" placeholder = "Email" /> 
            <input type = "password" placeholder = "Password" />
            <button>
                Login    
            </button> 

            <div> Error Message </div>
            <br />
            <Link href = "/register">
                Don't have an account? Register
            </Link>
        </form>
    </div>
  )
}

export default LoginForm; 