import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <main id="main" className="page notfound">
      <h1>Not found</h1>
      <p>This page doesn’t exist.</p>
      <Link to="/" className="tag tag--link">
        Back to the work
      </Link>
      <Footer />
    </main>
  );
}
