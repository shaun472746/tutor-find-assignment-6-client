'use client';

import Image from 'next/image';
import '../asset/HeroSection.css';
import '@/../../assets/root.css';
import { Col, Row, Input, Button } from 'antd';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

const { Search } = Input;

export default function HeroSection() {
  const router = useRouter();
  const { user } = useUser();
  const getSearchValue = (value: string) => {
    router.push(`/tutors?search=${value}`);
  };

  const navigateTo = (value: string) => {
    router.push(`/${value}`);
  };

  return (
    <div className="hero-section">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="gutter-row">
          <div className="default-left-padding left-section-padding">
            <h3 className="header">
              Best Platform to find Home and Online Tutors
            </h3>
            <p className="hero-description">
              Students looking for tuition help or Tutors waiting to share his
              knowledge, you have come to the right place.
            </p>
            <Search
              placeholder="Find Tutor by subject, grade, or tutor name"
              onSearch={getSearchValue}
              className="hero-search"
            />
            <div className="hero-action-btn">
              <Button
                block
                disabled={user?.userId ? true : false}
                onClick={() => navigateTo('login')}
              >
                Login
              </Button>
              <Button
                block
                disabled={user?.userId ? true : false}
                onClick={() => navigateTo('register')}
              >
                Register
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="gutter-row">
          <div className="default-right-padding right-section-padding">
            <Image
              src="/images/static/hero-illustration.png"
              width={400}
              height={200}
              alt="email-logo"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
}
