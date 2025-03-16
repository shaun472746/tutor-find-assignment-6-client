'use client';

import Image from 'next/image';
import './assets/FooterSection.css';
import '@/../../assets/root.css';
import { Col, Row } from 'antd';

export default function FooterSection() {
  return (
    <div className="footer-section default-padding-body">
      <Row gutter={[16, 16]} className="footer-section-row">
        <Col xs={24} sm={8} md={8} lg={8} xl={8} className="gutter-row">
          <div className="nav-first-info">
            <Image
              src="/images/static/web-logo.png"
              width={200}
              height={30}
              alt="web-logo"
              className="web-logo"
            />
            <p className="footer-description">
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} className="gutter-row">
          <div className="nav-second-info">
            <h4 className="nav-title">Home</h4>
            <h4 className="nav-title">About Us</h4>
            <h4 className="nav-title">Blog</h4>
            <h4 className="nav-title">Tutor</h4>
          </div>
        </Col>
        <Col xs={24} sm={8} md={8} lg={8} xl={8} className="gutter-row">
          <div className="details">
            <span className="call-info">
              <Image
                src="/images/static/call-logo.png"
                width={25}
                height={18}
                className="call-logo"
                alt="call-logo"
              />
              +8801234567891
            </span>
            <span className="email-info">
              <Image
                src="/images/static/email-logo.png"
                width={25}
                height={18}
                alt="email-logo"
              />
              findTutor@gmail.com
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
