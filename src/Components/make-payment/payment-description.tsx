'use client';

import { Badge, Card, Col, Row, Space } from 'antd';
import './payment-description.css';
import {
  AreaChartOutlined,
  MenuFoldOutlined,
  PicRightOutlined,
} from '@ant-design/icons';
import { PaymentData } from '@/types/Dashboard/MakePayment';
import { makePaymentVerifyService } from '@/services/DashboardService/StudentService';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const VerifyOrder: React.FC = () => {
  const searchParams = useSearchParams();
  const order_id = searchParams.get('order_id');
  const [paymentInfo, setPaymentInfo] = useState<PaymentData | null>(null);

  useEffect(() => {
    if (order_id) {
      makePaymentBookingRequest(order_id);
    }
  }, [order_id]);

  const makePaymentBookingRequest = async (id: string) => {
    let toastId: string | number = 'updateProfile';
    toastId = toast.loading('...Loading', { id: toastId });
    try {
      const res = await makePaymentVerifyService(id);
      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        setPaymentInfo(res?.data?.[0]);
      } else {
        toast.error(res?.message, { id: toastId });
        console.log(res);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="order-verify-page">
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <Card
            hoverable
            className="order-card"
            title={
              <Space align="center">
                <MenuFoldOutlined
                  style={{
                    fontSize: '20px',
                    color: '#1890ff',
                  }}
                />

                <h3 className="header-title">Order Details</h3>
              </Space>
            }
          >
            <h5>
              Order ID:{' '}
              <span className="title-value">{paymentInfo?.order_id} </span>
            </h5>
            <h5>
              Amount:{' '}
              <span className="title-value">
                {paymentInfo?.currency} {paymentInfo?.amount?.toFixed(2)}{' '}
              </span>
            </h5>
            <h5>
              Status:{' '}
              <span className="title-value">
                <Badge
                  count={paymentInfo?.bank_status}
                  showZero
                  color="#52c41a"
                />{' '}
              </span>
            </h5>
            <h5>
              Date:{' '}
              <span className="title-value">
                {new Date(
                  paymentInfo?.date_time as string
                )?.toLocaleString()}{' '}
              </span>
            </h5>
          </Card>
        </Col>
        <Col className="gutter-row" span={12}>
          <Card
            hoverable
            className="order-card"
            title={
              <Space align="center">
                <PicRightOutlined
                  style={{ fontSize: '20px', color: '#1890ff' }}
                />

                <h3 className="header-title">Payment Information</h3>
              </Space>
            }
          >
            <h5>
              Method: <span className="title-value">{paymentInfo?.method}</span>
            </h5>
            <h5>
              Transaction ID:{' '}
              <span className="title-value"> {paymentInfo?.bank_trx_id}</span>
            </h5>
            <h5>
              Invoice No:{' '}
              <span className="title-value">{paymentInfo?.invoice_no} </span>
            </h5>
            <h5>
              SP Code:{' '}
              <span className="title-value">{paymentInfo?.sp_code} </span>
            </h5>
            <h5>
              SP Message:{' '}
              <span className="title-value">{paymentInfo?.sp_message} </span>
            </h5>
          </Card>
        </Col>

        <Col className="gutter-row" span={12}>
          <Card
            hoverable
            className="order-card"
            title={
              <Space align="center">
                <AreaChartOutlined
                  style={{ fontSize: '20px', color: '#1890ff' }}
                />

                <h3 className="header-title">Customer Information</h3>
              </Space>
            }
          >
            <h5>
              Name: <span className="title-value">{paymentInfo?.name} </span>
            </h5>
            <h5>
              Email: <span className="title-value">{paymentInfo?.email} </span>
            </h5>
            <h5>
              Phone:{' '}
              <span className="title-value">{paymentInfo?.phone_no} </span>
            </h5>
            <h5>
              Address:{' '}
              <span className="title-value">{paymentInfo?.address} </span>
            </h5>
            <h5>
              City: <span className="title-value">{paymentInfo?.city} </span>
            </h5>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default VerifyOrder;
