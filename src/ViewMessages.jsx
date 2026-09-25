import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ViewMessages() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    loadMessages();
  }, []);

  async function loadMessages() {
    try {
      const res = await fetch('/api/messages');
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setMessages(data);
      setStatus(`${data.length} message(s) loaded.`);
    } catch (err) {
      setStatus('Error loading messages: ' + err.message);
    }
  }

  return (
    <div className="card">
      <h1>Saved messages</h1>
      <div className="status">{status}</div>
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>
            {msg.text}
            <span className="time">{new Date(msg.created_at).toLocaleString()}</span>
          </li>
        ))}
      </ul>
      <p><Link to="/">← Back to save a note</Link></p>
    </div>
  );
}