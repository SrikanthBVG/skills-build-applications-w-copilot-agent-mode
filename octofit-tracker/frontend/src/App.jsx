import { Link, Routes, Route } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

function HomePage() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness platform for logging activities, managing teams,
            and staying motivated with a live leaderboard.
          </p>
          <div className="d-flex gap-3">
            <Link className="btn btn-primary btn-lg" to="/">Explore app</Link>
            <a className="btn btn-outline-secondary btn-lg" href="http://localhost:8000/api/health" target="_blank" rel="noreferrer">
              Check API
            </a>
          </div>
        </div>
        <div className="col-lg-5 text-center">
          <img src={octofitLogo} alt="OctoFit app logo" className="img-fluid rounded shadow" style={{ maxWidth: '260px' }} />
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <div className="min-vh-100 bg-light">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand fw-bold" href="/">OctoFit</a>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
