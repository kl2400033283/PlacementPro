import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

const API = 'http://localhost:8080/api/applications'
const empty = { company:'', role:'', location:'', status:'Applied', appliedDate:'', packageLpa:'', notes:'' }

function App() {
  const [apps, setApps] = useState([])
  const [form, setForm] = useState(empty)
  const [editing, setEditing] = useState(null)

  const load = async () => {
    try { setApps((await axios.get(API)).data) }
    catch { setApps([]) }
  }

  useEffect(() => { load() }, [])

  const stats = useMemo(() => ({
    total: apps.length,
    interviews: apps.filter(a => a.status === 'Interview').length,
    offers: apps.filter(a => a.status === 'Offer').length,
    rejected: apps.filter(a => a.status === 'Rejected').length
  }), [apps])

  const submit = async e => {
    e.preventDefault()
    if (!form.company || !form.role) return
    if (editing) await axios.put(`${API}/${editing}`, form)
    else await axios.post(API, form)
    setForm(empty); setEditing(null); load()
  }

  const edit = a => {
    setEditing(a.id)
    setForm({company:a.company, role:a.role, location:a.location||'', status:a.status||'Applied',
      appliedDate:a.appliedDate||'', packageLpa:a.packageLpa||'', notes:a.notes||''})
  }

  const remove = async id => {
    await axios.delete(`${API}/${id}`); load()
  }

  return <div className="app">
    <header>
      <div>
        <p className="eyebrow">CAREER COMMAND CENTER</p>
        <h1>PlacementPro</h1>
        <p className="sub">Track applications. Prepare smarter. Land your next opportunity.</p>
      </div>
      <div className="badge">FULL STACK PROJECT</div>
    </header>

    <section className="stats">
      <div><span>Total Applications</span><strong>{stats.total}</strong></div>
      <div><span>Interviews</span><strong>{stats.interviews}</strong></div>
      <div><span>Offers</span><strong>{stats.offers}</strong></div>
      <div><span>Rejected</span><strong>{stats.rejected}</strong></div>
    </section>

    <main>
      <section className="panel">
        <h2>{editing ? 'Update Application' : 'Add Application'}</h2>
        <form onSubmit={submit}>
          <input placeholder="Company *" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/>
          <input placeholder="Job Role *" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/>
          <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/>
          <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
            <option>Applied</option><option>Interview</option><option>Offer</option><option>Rejected</option>
          </select>
          <input type="date" value={form.appliedDate} onChange={e=>setForm({...form,appliedDate:e.target.value})}/>
          <input placeholder="Package (LPA)" value={form.packageLpa} onChange={e=>setForm({...form,packageLpa:e.target.value})}/>
          <textarea placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}/>
          <div className="buttons">
            <button>{editing ? 'Update' : 'Add Application'}</button>
            {editing && <button type="button" className="secondary" onClick={()=>{setEditing(null);setForm(empty)}}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="panel">
        <div className="titleRow"><h2>Application Pipeline</h2><span>{apps.length} records</span></div>
        {apps.length === 0 ? <div className="empty">No applications yet. Add your first opportunity.</div> :
        <div className="cards">{apps.map(a =>
          <article className="card" key={a.id}>
            <div className="cardTop"><div><h3>{a.company}</h3><p>{a.role}</p></div><span className={`status ${String(a.status).toLowerCase()}`}>{a.status}</span></div>
            <div className="meta"><span>📍 {a.location || 'Not specified'}</span><span>📅 {a.appliedDate || 'No date'}</span>{a.packageLpa && <span>💰 {a.packageLpa} LPA</span>}</div>
            {a.notes && <p className="notes">{a.notes}</p>}
            <div className="actions"><button onClick={()=>edit(a)}>Edit</button><button className="danger" onClick={()=>remove(a.id)}>Delete</button></div>
          </article>
        )}</div>}
      </section>
    </main>
  </div>
}

export default App
