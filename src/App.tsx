import Navbar from "./components/Shared/Navbar";
import { ThemeProvider } from "./components/theme-provider";
import Quiz from "./components/Quiz";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Quiz />
    </ThemeProvider>
  );
}

export default App;
