import { Link } from 'react-router';

export default function Navigation() {
  return (
    <nav className="">
      <div>
        <Link to="/" className="font-bold tracking-tighter text-lg">
          We-Create
        </Link>
      </div>
    </nav>
  );
}
