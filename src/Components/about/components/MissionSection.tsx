import '../assets/MissionSection.css';
import '@/../../assets/root.css';
import { Col, Row } from 'antd';

export default function MissionSection() {
  return (
    <div className="mission-section default-padding-body">
      <Row gutter={[16, 16]}>
        <Col span={24} className="gutter-row">
          <h3 className="header">Our Mission</h3>
          <p className="mission-detail">
            Our mission is to connect students with dedicated tutors who provide
            personalized, in-home learning experiences. By bringing quality
            education directly to students homes, we aim to enhance their
            talents, strengthen their academic skills, and build their
            confidence. Our platform ensures that each student receives the
            guidance they need to excel, fostering a supportive environment that
            empowers them to reach their full potential.
          </p>
        </Col>
      </Row>
    </div>
  );
}
