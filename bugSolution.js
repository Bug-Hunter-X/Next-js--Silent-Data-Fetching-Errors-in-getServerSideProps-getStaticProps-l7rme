// bug.js
export async function getServerSideProps() {
  try {
    const res = await fetch('https://api.example.com/data'); // Simulate a failing API call
    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { error: error.message } };
  }
}

export default function MyComponent({ data, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  }
  return <div>Data: {JSON.stringify(data)}</div>;
}

// bugSolution.js
export async function getServerSideProps() {
  try {
    const res = await fetch('https://api.example.com/data');
    if (!res.ok) {
      // Handle non-200 status codes
      return { props: { error: `API request failed with status ${res.status}` } };
    }
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { props: { error: 'An unexpected error occurred' } };
  }
}

export default function MyComponent({ data, error }) {
  if (error) {
    return <div>Error: {error}</div>;
  } else {
    // ... your normal component code here
    return <div>Data: {JSON.stringify(data)}</div>;
  }
}