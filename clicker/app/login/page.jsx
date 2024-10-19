import LoginForm from "./_components/LoginForm"; 
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Login () {
  const session = await getServerSession(authOptions); 
  if(session) redirect("/dashboard"); 

  return (
      <LoginForm /> 
  )
}; 

