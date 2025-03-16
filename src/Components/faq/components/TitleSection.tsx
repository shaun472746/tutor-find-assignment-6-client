'use client';

import '../assets/TitleSection.css';
import '@/../../assets/root.css';

export default function TitleSection() {
  return (
    <div className="title-section ">
      <p className="title-icon">FAQ</p>
      <h3 className="title-line">Frequently Asked Questions</h3>
      <p className="title-description">
        We compiled a list of answers to address your most pressing questions
        regarding our services.
      </p>
    </div>
  );
}
