'use client';

import Image from 'next/image';
import '../asset/Testimonial.css';
import '@/../../assets/root.css';
import { Col, Row, Rate, Carousel } from 'antd';
import { useEffect, useState } from 'react';
import { TTutorTestimonials } from '@/types';
import { getAllTutorsProfileTestimonialService } from '@/services/TutorService';

export default function Testimonials() {
  const [tutorsList, setTutorList] = useState<TTutorTestimonials[]>();

  const getTutorsList = async () => {
    const result = await getAllTutorsProfileTestimonialService();

    setTutorList(result.data);
  };

  useEffect(() => {
    getTutorsList();
  }, []);

  return (
    <div className="testimonial-section">
      <Row gutter={[16, 16]} className="tutor-row">
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="gutter-row">
          <div className="testimonial-student left-section-padding">
            <h4 className="sub-heading">TESTIMONIALS</h4>
            <h2 className="heading">What Our Students Say About Us</h2>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className="gutter-row">
          <div className="student-review right-section-padding">
            <Carousel arrows infinite={false}>
              {tutorsList?.map((tutor, index) => (
                <div key={index}>
                  <div className="review-section">
                    <Rate
                      allowHalf
                      disabled
                      defaultValue={tutor.rating.rate}
                      className="rating"
                    />
                    <p className="review-description">{tutor.rating.review}</p>
                    <div className="user">
                      <Image
                        src={
                          tutor.rating.id.imageUrl || '/images/static/man.png'
                        }
                        width={50}
                        height={50}
                        className="user-image"
                        alt="user-image"
                      />
                      <div className="name-grade">
                        <h4 className="user-name">{tutor.rating.id.name}</h4>
                        <div className="user-grade">{tutor.rating.id.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </Col>
      </Row>
    </div>
  );
}
