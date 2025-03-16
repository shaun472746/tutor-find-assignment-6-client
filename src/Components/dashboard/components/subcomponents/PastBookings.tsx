'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/TutorAcceptance.css';
import '@/../../assets/root.css';

import { Col, ConfigProvider, Row, Table, TableProps, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { TAcceptBookingRequest } from '@/types';
import { getPastBookingsService } from '@/services/DashboardService/StudentService';

export default function PastBookings() {
  const { user } = useUser();

  const [pastBookingReq, setPastBookingReq] = useState<
    TAcceptBookingRequest[] | []
  >([]);

  const getPastBookings = async () => {
    const res = await getPastBookingsService();
    setPastBookingReq(res.data);
  };

  useEffect(() => {
    getPastBookings();
  }, []);

  const columns: TableProps<TAcceptBookingRequest>['columns'] = [
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: '1',
      render: (_, { tutor }) => (
        <p>{typeof tutor === 'object' ? tutor.name : tutor}</p>
      ),
      fixed: 'left',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: '2',
    },
    {
      title: 'Hourly Rate',
      dataIndex: 'hourly_rate',
      key: '3',
    },
    {
      title: 'Time',
      key: '4',
      dataIndex: 'time',
      render: (_, { time_slot }) => (
        <>
          <Tag color="volcano" key={1}>
            {time_slot?.toUpperCase()}
          </Tag>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="heading-info">
        <div className="welcome-message">
          <h3 className="header">Past Bookings</h3>
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
            <Table<TAcceptBookingRequest>
              columns={columns}
              dataSource={pastBookingReq}
              className="acceptance-table"
              scroll={{ x: 500 }}
            />
          </ConfigProvider>
        </Col>
      </Row>
    </>
  );
}
