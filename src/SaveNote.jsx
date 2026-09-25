import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SaveNote() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveMessage() {
    if (!text.trim()) {
      setStatus('Write something first.');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);
      setText('');
      setStatus('Saved.');
    } catch (err) {
      setStatus('Error: ' + err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <h1>Drop a note</h1>
      <p>Write something below. It's saved privately.</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button onClick={saveMessage} disabled={saving}>
        {saving ? 'Saving...' : 'Save note'}
      </button>
      <div className="status">{status}</div>
      <p><Link to="/view">View saved messages →</Link></p>
    </div>
  );
}