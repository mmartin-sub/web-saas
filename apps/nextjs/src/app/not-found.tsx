import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="text-center mt-12">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </div>
  );
};

export default NotFound;
