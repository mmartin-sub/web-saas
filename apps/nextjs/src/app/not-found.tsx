import Link from "next/link";

const NotFound = () => {
  return (
    <div className="mt-12 text-center">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back to Home</Link>
    </div>
  );
};

export default NotFound;
