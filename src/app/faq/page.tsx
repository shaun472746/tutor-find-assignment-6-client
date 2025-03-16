import '@/../../assets/root.css';
import DetailSectionFaq from '@/Components/faq/components/DetailSectionFaq';
import TitleSection from '@/Components/faq/components/TitleSection';
import { Col, Row } from 'antd';

export default function Faq() {
  return (
    <div className="default-padding-body">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={10} lg={10} xl={10} className="gutter-row">
          <TitleSection />
        </Col>
        <Col xs={24} sm={12} md={14} lg={14} xl={14} className="gutter-row">
          <DetailSectionFaq />
        </Col>
      </Row>
    </div>
  );
}
