import '../assets/SuccessStories.css';
import '@/../../assets/root.css';
import { Carousel, Col, Row } from 'antd';
import Image from 'next/image';

export default function SuccessSection() {
  return (
    <div className="success-section default-padding-body">
      <h3 className="featured-story">Featured Stories</h3>
      <Row gutter={[16, 16]}>
        <Col span={24} className="gutter-row">
          <Carousel arrows infinite={false} dots={false}>
            <div>
              <div className="story-detail">
                <Image
                  src="/images/static/story-comma.png"
                  width={30}
                  height={30}
                  className="story-comma"
                  alt="inverted-comma"
                />
                <p className="description">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which dont look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isn&apos;t anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary,
                </p>
                <div className="story-teller-section">
                  <Image
                    src="/images/static/popular-tutor.png"
                    width={60}
                    height={60}
                    className="story-teller"
                    alt="our-user"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="story-detail">
                <Image
                  src="/images/static/story-comma.png"
                  width={30}
                  height={30}
                  className="story-comma"
                  alt="inverted-comma"
                />
                <p className="description">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which dont look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isnt anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary,
                </p>
                <div className="story-teller-section">
                  <Image
                    src="/images/static/popular-tutor.png"
                    width={60}
                    height={60}
                    className="story-teller"
                    alt="our-user"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="story-detail">
                <Image
                  src="/images/static/story-comma.png"
                  width={30}
                  height={30}
                  className="story-comma"
                  alt="inverted-comma"
                />
                <p className="description">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which dont look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isnt anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary,
                </p>
                <div className="story-teller-section">
                  <Image
                    src="/images/static/popular-tutor.png"
                    width={60}
                    height={60}
                    className="story-teller"
                    alt="our-user"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="story-detail">
                <Image
                  src="/images/static/story-comma.png"
                  width={30}
                  height={30}
                  className="story-comma"
                  alt="inverted-comma"
                />
                <p className="description">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour, or randomised words which dont look
                  even slightly believable. If you are going to use a passage of
                  Lorem Ipsum, you need to be sure there isnt anything
                  embarrassing hidden in the middle of text. All the Lorem Ipsum
                  generators on the Internet tend to repeat predefined chunks as
                  necessary,
                </p>
                <div className="story-teller-section">
                  <Image
                    src="/images/static/popular-tutor.png"
                    width={60}
                    height={60}
                    className="story-teller"
                    alt="our-user"
                  />
                </div>
              </div>
            </div>
          </Carousel>
        </Col>
      </Row>
    </div>
  );
}
