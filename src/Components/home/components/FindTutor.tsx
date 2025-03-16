'use client';

import Image from 'next/image';
import '../asset/FindTutor.css';
import '@/../../assets/root.css';
import { Col, Row, Button } from 'antd';
import { useRouter } from 'next/navigation';

export default function FindTutor() {
  const router = useRouter();
  const navigateTo = (value: string) => {
    router.push(`/${value}`);
  };
  return (
    <div className="find-tutor">
      <Row gutter={[16, 16]} className="tutor-row">
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="gutter-row">
          <div className="default-left-padding left-section-padding">
            <Image
              src="/images/static/find-tutor-illustration.png"
              width={400}
              height={300}
              alt="email-logo"
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="gutter-row">
          <div className="default-right-padding right-section-padding">
            <h3 className="header">Find Your Tutor Fast</h3>
            <p className="hero-description">
              In today’s fast-paced world, finding the right tutor quickly and
              efficiently is essential for students of all ages. Whether you’re
              preparing for an exam, struggling with a subject, or simply
              looking to enhance your skills, having access to the best tutors
              can make a significant difference.
            </p>

            <div className="hero-action-btn">
              <Button block onClick={() => navigateTo('tutors')}>
                Find Tutor
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
