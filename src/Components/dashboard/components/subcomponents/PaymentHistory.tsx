'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/TutorAcceptance.css';
import '@/../../assets/root.css';

import { Col, ConfigProvider, Row, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { getPaymentHistoryService } from '@/services/DashboardService/StudentService';
import { TpaymentHistory } from '@/types/Dashboard/PaymentHistory';

export default function PaymentHistory() {
  const { user } = useUser();

  const [paymentHistory, setPaymentHistory] = useState<TpaymentHistory[] | []>(
    []
  );

  const getPaymentHistory = async () => {
    const res = await getPaymentHistoryService();
    setPaymentHistory(res.data);
  };

  useEffect(() => {
    getPaymentHistory();
  }, []);

  const columns: TableProps<TpaymentHistory>['columns'] = [
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'subject',
      render: (_, Record) => <p>{Record.bookingRequestId.tutor.name}</p>,
      fixed: 'left',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (_, Record) => <p>{Record.bookingRequestId.subject}</p>,
    },
    {
      title: 'Total Cost',
      dataIndex: 'hourly_rate',
      key: 'hourly_rate',
      render: (_, { hours, hourly_rate }) => <>{hours * hourly_rate}</>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_, Record) => (
        <>
          <Tag style={{ color: '#389e0d' }} key={1}>
            {Record.transaction.sp_message}
          </Tag>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="heading-info">
        <div className="welcome-message">
          <h3 className="header">Payment History</h3>
          <p className="sub-header">Welcome, {user?.name}</p>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="gutter-row">
          <ConfigProvider
            theme={{
              token: {
                /* here is your global tokens */
              },
            }}
          >
            <Table<TpaymentHistory>
              columns={columns}
              dataSource={paymentHistory}
              className="acceptance-table"
              scroll={{ x: 500 }}
            />
          </ConfigProvider>
        </Col>
      </Row>
    </>
  );
}
