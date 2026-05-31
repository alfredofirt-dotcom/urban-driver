import { useState } from "react"

export default function App() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [trips, setTrips] = useState([])

  const register = async () => {
    await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    alert("Usuario registrado")
  }

  const login = async () => {
    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    setToken(data.token)
  }

  const getTrips = async () => {
    const res = await fetch("http://localhost:3001/trips", {
      headers: {
        Authorization: "Bearer " + token
      }
    })

    const data = await res.json()
    setTrips(data)
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>🚗 UrbanDriver</h1>

      <input placeholder="email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="password" onChange={e => setPassword(e.target.value)} />

      <br /><br />

      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>

      <br /><br />

      <button onClick={getTrips}>Ver viajes</button>

      <h3>Token:</h3>
      <p style={{ wordBreak: "break-all" }}>{token}</p>

      <h3>Trips:</h3>
      {trips.map(t => (
        <p key={t.id}>
          {t.user} → {t.route}
        </p>
      ))}
    </div>
  )
}