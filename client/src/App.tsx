import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import PracticePage from "@/pages/PracticePage";
import AboutPage from "@/pages/AboutPage";
import SessionsPage from "@/pages/SessionsPage";
import ResourcesPage from "@/pages/ResourcesPage";
import CleanSite, { CLEAN_PATHS } from "@/pages/CleanSite";
import NotFound from "@/pages/not-found";

// Matches "/", "/about", "/sessions" and the rest, with or without a trailing slash.
const CLEAN_ROUTE = new RegExp(`^(?:${CLEAN_PATHS.map((path) => path.replace(/\/$/, "")).join("|")})/?$`);

function Router() {
  return (
    <Switch>
      {/* The clean site. A single route covers all of its pages, so its shell stays mounted between them. */}
      <Route path={CLEAN_ROUTE} component={CleanSite} />

      {/* The earlier site, kept as it was. Not linked from the clean site. */}
      <Route path="/archive" component={Home} />
      <Route path="/archive/offerings" component={PracticePage} />
      <Route path="/archive/about" component={AboutPage} />
      <Route path="/archive/sessions" component={SessionsPage} />
      <Route path="/archive/resources" component={ResourcesPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
