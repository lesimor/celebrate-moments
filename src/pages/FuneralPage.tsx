import { FuneralHero } from '../components/funeral/FuneralHero';
import { FuneralMessage } from '../components/funeral/FuneralMessage';
import { FuneralInfo } from '../components/funeral/FuneralInfo';
import { FuneralLocation } from '../components/funeral/FuneralLocation';
import { FuneralContact } from '../components/funeral/FuneralContact';
import { FuneralCondolences } from '../components/funeral/FuneralCondolences';
import { funeralData } from '../data/funeralData';
import '../styles/funeral.css';

export function FuneralPage() {
  // TODO: Get funeral data from URL params or context
  return (
    <div className="app funeral-app">
      <FuneralHero data={funeralData} />
      <FuneralMessage data={funeralData} />
      <FuneralInfo data={funeralData} />
      <FuneralLocation data={funeralData} />
      <FuneralContact data={funeralData} />
      <FuneralCondolences data={funeralData} />
    </div>
  );
}