import { Hero } from '../components/Hero';
import { Message } from '../components/Message';
import { Calendar } from '../components/Calendar';
import { Gallery } from '../components/Gallery';
import { Location } from '../components/Location';
import { Contact } from '../components/Contact';
import { weddingData } from '../data/weddingData';
import '../styles/index.css';

export function WeddingPage() {
  // TODO: Get wedding data from URL params or context
  return (
    <div className="app">
      <Hero data={weddingData} />
      <Message data={weddingData} />
      <Calendar data={weddingData} />
      <Gallery data={weddingData} />
      <Location data={weddingData} />
      <Contact data={weddingData} />
    </div>
  );
}