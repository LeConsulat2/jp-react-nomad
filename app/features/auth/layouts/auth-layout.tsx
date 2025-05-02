import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-gradient-to-br from-primary via-rose-400 to-rose-500  " />
      <Outlet />
    </div>
  );
}
