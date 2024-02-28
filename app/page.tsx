import Hero from "../components/Hero";
import { ThemeProvider } from '../components/ThemeContext';
 
export default function Home() {
  return (
    <ThemeProvider>
    <Hero />
    </ThemeProvider>

  );
}
