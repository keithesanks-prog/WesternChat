// Simple diagnostic page to test API routes
export default function TestAPI() {
  const testRoute = async (route) => {
    try {
      const res = await fetch(route);
      const text = await res.text();
      const isJson = text.trim().startsWith('{');
      
      console.log(`Route: ${route}`);
      console.log(`Status: ${res.status}`);
      console.log(`Content-Type: ${res.headers.get('content-type')}`);
      console.log(`Response: ${text.substring(0, 200)}`);
      
      alert(`Route: ${route}\nStatus: ${res.status}\nIs JSON: ${isJson}\nResponse: ${text.substring(0, 100)}`);
    } catch (error) {
      alert(`Error testing ${route}: ${error.message}`);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>API Route Diagnostics</h1>
      <button onClick={() => testRoute('/api/test')}>Test /api/test</button>
      <button onClick={() => testRoute('/api/chat')} style={{ marginLeft: '1rem' }}>Test /api/chat</button>
    </div>
  );
}

