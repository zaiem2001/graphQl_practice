import { useState } from "react";
import { useNavigate } from "react-router";
import { Route, Routes } from "react-router-dom";
import { isLoggedIn } from "./auth";
import CompanyDetail from "./components/CompanyDetail";
import LoginForm from "./components/LoginForm";
import JobBoard from "./components/JobBoard";
import JobDetail from "./components/JobDetail";
import JobForm from "./components/JobForm";
import NavBar from "./components/NavBar";
import CompaniesDetails from "./components/CompaniesDetails";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const GRAPHQL_URL = "http://localhost:9000/graphql";

function App() {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);

  const client = new ApolloClient({
    uri: GRAPHQL_URL,
    cache: new InMemoryCache(),
  });

  const handleLogin = () => {
    setLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <ApolloProvider client={client}>
      <NavBar loggedIn={loggedIn} onLogout={handleLogout} />
      <main className="section">
        <Routes>
          <Route exact path="/" element={<JobBoard />} />

          <Route path="/companies" element={<CompaniesDetails />} />

          <Route path="/companies/:companyId" element={<CompanyDetail />} />

          <Route exact path="/jobs/new" element={<JobForm />} />
          <Route path="/jobs/:jobId" element={<JobDetail />} />
          <Route
            exact
            path="/login"
            element={<LoginForm onLogin={handleLogin} />}
          />
        </Routes>
      </main>
    </ApolloProvider>
  );
}

export default App;
