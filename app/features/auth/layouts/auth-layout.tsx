import { FlickeringGrid } from 'components/magicui/flickering-grid';
import { Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1  h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
        <div>
          <FlickeringGrid
            color="#E2254F"
            columns={30}
            cellSize={10}
            speed={1.5}
            opacity={0.8}
          />
        </div>

        <Outlet />
      </div>
    </div>
  );
}
