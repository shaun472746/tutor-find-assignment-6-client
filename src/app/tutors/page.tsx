import '@/../../assets/root.css';
import TutorsParent from '@/Components/tutors/components/TutorParentComp';
import { Suspense } from 'react';

export default function Tutors() {
  return (
    <div className="default-padding-body">
      <Suspense fallback={<div>Loading payment details...</div>}>
        <TutorsParent />
      </Suspense>
    </div>
  );
}
