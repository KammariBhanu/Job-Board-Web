import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import Companies from "./pages/Companies";
import Categories from "./pages/Categories";
import SavedJobs from "./pages/SavedJobs";
import AppliedJobs from "./pages/AppliedJobs";
import Profile from "./pages/Profile";
import EmployerDashboard from "./pages/EmployerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/login"} component={Login} />
      <Route path={"/signup"} component={SignUp} />
      <Route path={"/jobs"} component={Jobs} />
      <Route path={"/jobs/:id"} component={JobDetail} />
      <Route path={"/companies"} component={Companies} />
      <Route path={"/categories"} component={Categories} />
      <Route path={"/saved"} component={SavedJobs} />
      <Route path={"/applied"} component={AppliedJobs} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/employer-dashboard"} component={EmployerDashboard} />
      <Route path={"/admin-dashboard"} component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        switchable={true}
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
