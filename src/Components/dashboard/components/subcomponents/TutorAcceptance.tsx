'use client';

import { useUser } from '@/context/UserContext';
import { useDashboard } from '@/context/DashboardContext';

import '../../assets/TutorAcceptance.css';
import '@/../../assets/root.css';

import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Table,
  TableProps,
  Tag,
} from 'antd';
import { useState } from 'react';
import { toast } from 'sonner';
import { TAcceptBookingRequest } from '@/types';
import { bookingPaymentDuration } from '@/types/Dashboard/AcceptanceTutor';
import { createPaymentService } from '@/services/DashboardService/StudentService';

export default function TutorAcceptance() {
  const { user, profileDetail } = useUser();
  const { acceptedBookingRequest } = useDashboard();
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm<bookingPaymentDuration>(undefined);
  const [bookingReq, setBookingReq] = useState<
    TAcceptBookingRequest | undefined
  >(undefined);

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const columns: TableProps<TAcceptBookingRequest>['columns'] = [
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'subject',
      render: (_, { tutor }) => (
        <p>{typeof tutor === 'object' ? tutor.name : tutor}</p>
      ),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Hourly Rate',
      dataIndex: 'hourly_rate',
      key: 'hourly_rate',
    },
    {
      title: 'Time',
      key: 'time',
      dataIndex: 'time',
      render: (_, { time_slot }) => (
        <>
          <Tag color="volcano" key={1}>
            {time_slot?.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Button
          type="primary"
          className="payment-button"
          onClick={() => makePayment(record)}
        >
          Make Payment
        </Button>
      ),
      fixed: 'right',
    },
  ];

  const onUpdatePaymentDuration: FormProps<bookingPaymentDuration>['onFinish'] =
    async (values) => {
      let toastId: string | number = 'payment';
      toastId = toast.loading('...Loading', { id: toastId });

      const userDtl = {
        customer_email: user?.userEmail,
        customer_name: user?.name,
        customer_address: profileDetail?.address,
        customer_phone: profileDetail?.phone,
        customer_city: values.city,
      };
      const paymentDur = {
        month: Number(values.month),
        hours: Number(values.hours),
        bookingRequestId: bookingReq?._id,
        hourly_rate: bookingReq?.hourly_rate as number,
        tutorId:
          typeof bookingReq?.tutor === 'object' ? bookingReq?.tutor?._id : '',
      };
      const obj = {
        ...paymentDur,
        userInfo: userDtl,
      };

      try {
        const res = await createPaymentService(obj);
        console.log(res);
        if (res?.success) {
          toast.success(res?.message, { id: toastId });
          onCloseDrawer();

          window.location.href = res?.data;
        } else {
          toast.error(res?.message, { id: toastId });
          console.log(res);
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An unknown error';
        toast.error(message, { id: toastId });
        console.log(err);
      }
    };

  const makePayment = (record: TAcceptBookingRequest) => {
    setOpen(true);
    form.resetFields();
    setBookingReq(record);
  };

  return (
    <>
      <div className="heading-info">
        <div className="welcome-message">
          <h3 className="header">Tutor Acceptance</h3>
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
              dataSource={acceptedBookingRequest}
              pagination={false}
              className="acceptance-table"
              scroll={{ x: 500 }}
            />
          </ConfigProvider>
        </Col>
      </Row>

      <Drawer title="Proceed to payment" onClose={onCloseDrawer} open={open}>
        <Form
          className="book-tutor-detail"
          name="basic"
          form={form}
          onFinish={onUpdatePaymentDuration}
          autoComplete="off"
        >
          <Form.Item<bookingPaymentDuration>
            label="Month"
            name="month"
            className="label-input"
            rules={[{ required: true, message: 'Please enter month!' }]}
          >
            <Input type="number" placeholder="Enter number of month" />
          </Form.Item>
          <Form.Item<bookingPaymentDuration>
            label="Hours"
            name="hours"
            className="label-input"
            rules={[{ required: true, message: 'Please enter hour!' }]}
          >
            <Input type="number" placeholder="Enter number of hours" />
          </Form.Item>
          <Form.Item<bookingPaymentDuration>
            label="City"
            name="city"
            className="label-input"
            rules={[{ required: true, message: 'Please enter city!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button className="dashboard-update-btn" htmlType="submit">
              Proceed
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
