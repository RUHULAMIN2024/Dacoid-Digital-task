import Container from "../Container";
import { ModeToggle } from "../mode-toggle";

export default function Navbar() {
  return (
    <nav className="w-full py-4 bg-gray-50 dark:bg-gray-900 shadow-lg rounded-lg">
      <Container>
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            MyTask
          </div>

          <ModeToggle />
        </div>
      </Container>
    </nav>
  );
}
