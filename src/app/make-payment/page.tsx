import '@/../../assets/root.css';
import VerifyOrder from '@/Components/make-payment/payment-description';
import { Col, Row } from 'antd';
import { Suspense } from 'react';

export default function Faq() {
  return (
    <div className="default-padding-body">
      <Row gutter={[16, 16]}>
        <Col span={24} className="gutter-row">
          <Suspense fallback={<div>Loading payment details...</div>}>
            <VerifyOrder />
          </Suspense>
        </Col>
      </Row>
    </div>
  );
}
