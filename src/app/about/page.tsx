import '@/../../assets/root.css';
import FuturePlan from '@/Components/about/components/FuturePlan';
import MissionSection from '@/Components/about/components/MissionSection';
import TeamSection from '@/Components/about/components/OurTeam';
import SuccessSection from '@/Components/about/components/SuccessStories';

export default function About() {
  return (
    <div>
      <MissionSection />
      <TeamSection />
      <SuccessSection />
      <FuturePlan />
    </div>
  );
}
