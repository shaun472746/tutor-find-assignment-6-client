import '../assets/FuturePlan.css';
import '@/../../assets/root.css';
import { Col, Row } from 'antd';

export default function FuturePlan() {
  return (
    <div className="plan-section default-padding-body">
      <h3 className="plan-title">Future Plans for Our Tutoring Platform</h3>
      <p className="plan-description description-font">
        Our goal is to continuously improve and expand our platform to provide
        students with the best possible learning experience. Here’s what we
        envision for the future:
      </p>
      <Row gutter={[16, 16]}>
        <Col span={24} className="gutter-row">
          <h3 className="plan-subheader">Expanding Subject Offerings</h3>
          <p className="plan-detail description-font">
            We plan to introduce a wider range of subjects, including
            specialized courses like coding, music, arts, and competitive exam
            preparation, ensuring students get access to diverse learning
            opportunities.
          </p>
          <h3 className="plan-subheader">
            Global Reach & Multilingual Support
          </h3>
          <p className="plan-detail description-font">
            Currently serving local students, we aim to expand internationally,
            allowing students worldwide to connect with expert tutors. We also
            plan to add multilingual support to cater to students from different
            linguistic backgrounds.
          </p>
          <h3 className="plan-subheader">Online & Hybrid Learning Options</h3>
          <p className="plan-detail description-font">
            In addition to in-home tutoring, we will introduce online and hybrid
            learning models, offering flexible options for students who prefer
            virtual lessons or a mix of online and in-person teaching.
          </p>
          <h3 className="plan-subheader">AI-Powered Tutor Matching</h3>
          <p className="plan-detail description-font">
            To enhance the student-tutor matching process, we will implement
            AI-driven recommendations, ensuring students are paired with tutors
            based on learning styles, preferences, and academic goals.
          </p>
          <h3 className="plan-subheader">
            Progress Tracking & Personalized Learning Plans
          </h3>
          <p className="plan-detail description-font">
            We plan to integrate a student progress tracking system, where
            parents and students can monitor improvements, set learning goals,
            and receive personalized study plans.
          </p>
          <h3 className="plan-subheader">Mobile App for Easy Access</h3>
          <p className="plan-detail description-font">
            A dedicated mobile app will be developed, making it easier for
            students and tutors to schedule sessions, track progress, and
            communicate seamlessly.
          </p>
          <h3 className="plan-subheader">Community & Mentorship Programs</h3>
          <p className="plan-detail description-font">
            We will launch a student-tutor community, where students can engage
            in group discussions, mentorship programs, and peer learning to
            further boost confidence and skills.
          </p>
          <h3 className="plan-subheader">Affordable Learning for All</h3>
          <p className="plan-detail description-font">
            We aim to introduce scholarship programs and financial aid, ensuring
            that every student, regardless of financial background, has access
            to quality education. By implementing these future plans, we are
            committed to making learning more accessible, effective, and
            empowering for students worldwide.
          </p>
        </Col>
      </Row>
    </div>
  );
}
