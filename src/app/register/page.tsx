import '@/../../assets/root.css';
import RegisterPage from '@/Components/register/components/RegisterPage';
import { Col, Row } from 'antd';

export default function Register() {
  return (
    <div className="default-padding-body">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="gutter-row">
          <RegisterPage />{' '}
        </Col>
      </Row>
    </div>
  );
}
