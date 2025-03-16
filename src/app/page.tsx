import HeroSection from '@/Components/home/components/HeroSection';
import '../../assets/root.css';
import FindTutor from '@/Components/home/components/FindTutor';
import PopularTutors from '@/Components/home/components/PopularTutor';
import Testimonials from '@/Components/home/components/Testimonials';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FindTutor />
      <PopularTutors />
      <Testimonials />
    </div>
  );
}
