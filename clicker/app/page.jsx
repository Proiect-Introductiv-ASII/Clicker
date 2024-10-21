import Link from "next/link";

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-links">
        <Link href="login">
          <p className="link-button">Login</p>
        </Link>
        <Link href="register">
          <p className="link-button">Register</p>
        </Link>
      </div>
    </div>
  );
}
