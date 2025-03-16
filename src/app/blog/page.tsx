import '@/../../assets/root.css';
import BlogDetailSection from '@/Components/blog/components/BlogDetail';
import { Col, Row } from 'antd';

export default function Faq() {
  return (
    <div className="default-padding-body">
      <Row gutter={[16, 16]}>
        <Col span={24} className="gutter-row">
          <BlogDetailSection />
        </Col>
      </Row>
    </div>
  );
}
