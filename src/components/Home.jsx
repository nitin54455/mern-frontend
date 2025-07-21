// export default function Home({ age }) {
//   return age > 18 && <h2>Welcome</h2>;
// }

// export default function Home({ age }) {
//   return age > 18 ? <h2>Welcome</h2> : <h2>Not allowed</h2>;
// }

// export default function Home({ age }) {
//   if (age > 18) return <h2>Welcome</h2>;
//   else return <h2>Not allowed</h2>;
// }

// export default function Home({ age }) {
//   const handleClick = () => {
//     alert("Hello");
//   };
//   const handleSubmit = (name) => {
//     alert(`Hello ${name}`);
//   };
//   return (
//     <>
//       <h2>Hello World</h2>
//       <button onClick={handleClick}>Click</button>
//       <button onClick={() => handleSubmit("John")}>Submit</button>
//     </>
//   );
// }

import { useState } from "react";
export default function Home() {
  const [wicket, setWicket] = useState(0);
  const [run, setRun] = useState(0);
  const [message, setMessage] = useState();
  const [findValue, setFindValue] = useState("");
  const [findResult, setFindResult] = useState("");
  const incrementRun = () => {
    if (wicket < 10) {
      setRun(run + 1);
      setMessage("Well Done");
    }
  };
  const incrementWicket = () => {
    if (wicket < 10) {
      setWicket(wicket + 1);
      setMessage("Better Luck Next Time");
    } else {
      setMessage("Game Over");
    }
  };
  const handleFind = (e) => {
    e.preventDefault();
    setFindResult(findValue ? `You searched for: ${findValue}` : "Please enter something to find.");
  };

  return (
    <div className="home-container" style={{ maxWidth: 500, margin: '2rem auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <button className="home-btn" onClick={incrementRun} style={{ marginRight: 8, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600 }}>Run</button>
      <h3>{run}</h3>
      <button className="home-btn" onClick={incrementWicket} style={{ background: '#e11d48', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600 }}>Wicket</button>
      <h3>{wicket}</h3>
      <hr style={{ margin: '1.5rem 0' }} />
      <span className="home-message" style={{ display: 'block', marginBottom: '1.5rem', color: '#4f46e5', fontWeight: 500 }}>{message}</span>
      {/* Find Option */}
      <form onSubmit={handleFind} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <input
          type="text"
          value={findValue}
          onChange={e => setFindValue(e.target.value)}
          placeholder="Type to find..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #e5e7eb' }}
        />
        <button type="submit" style={{ background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', fontWeight: 600, cursor: 'pointer' }}>Find</button>
      </form>
      {findResult && <div style={{ color: '#16a34a', fontWeight: 600 }}>{findResult}</div>}
    </div>
  );
}
