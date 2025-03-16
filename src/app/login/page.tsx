import '@/../../assets/root.css';
import LoginPage from '@/Components/login/components/LoginPage';
import { Col, Row } from 'antd';

export default function Login() {
  return (
    <div className="default-padding-body">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="gutter-row">
          <LoginPage />
        </Col>
      </Row>
    </div>
  );
}
