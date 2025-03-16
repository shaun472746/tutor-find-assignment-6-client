'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/ReviewTutor.css';
import '@/../../assets/root.css';

import {
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Form,
  FormProps,
  Input,
  Rate,
  Row,
  Table,
  TableProps,
} from 'antd';
import { useEffect, useState } from 'react';
import {
  getPaymentHistoryService,
  getTutorProfileDetailService,
  updateTutorRatingService,
} from '@/services/DashboardService/StudentService';
import { TpaymentHistory } from '@/types/Dashboard/PaymentHistory';
import { TTutor } from '@/types/Dashboard/StudentDashboard';
import { toast } from 'sonner';
import { TTutorProfileDtl } from '@/types';

const { TextArea } = Input;

export default function ReviewTutors() {
  const { user } = useUser();

  const [paymentHistory, setPaymentHistory] = useState<TpaymentHistory[] | []>(
    []
  );
  const [open, setOpen] = useState<boolean>(false);
  const [tutor, setTutor] = useState<TTutor | null>(null);
  const [tutorProfileDtl, setTutorProfileDtl] = useState<TTutorProfileDtl>();
  const [form] = Form.useForm<TTutor>(undefined);

  const getPaymentHistory = async () => {
    const res = await getPaymentHistoryService();
    setPaymentHistory(res.data);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  useEffect(() => {
    getPaymentHistory();
  }, []);

  const rateTheTutor = async (tutor: TTutor) => {
    const res = await getTutorProfileDetailService(tutor._id as string);

    setTutorProfileDtl(res.data);
    setTutor(tutor);
    // form.resetFields();
    setOpen(true);
  };

  useEffect(() => {
    form.setFieldsValue({
      rate: tutorProfileDtl?.rating?.rate,
      review: tutorProfileDtl?.rating?.review,
    });
  }, [tutorProfileDtl, form]);

  const columns: TableProps<TpaymentHistory>['columns'] = [
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: '1',
      render: (_, Record) => <p>{Record.bookingRequestId.tutor.name}</p>,
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: '2',
      render: (_, Record) => <p>{Record.bookingRequestId.subject}</p>,
    },
    {
      title: 'Total Cost',
      dataIndex: 'hourly_rate',
      key: '3',
      render: (_, { hours, hourly_rate }) => <>{hours * hourly_rate}</>,
    },
    {
      title: 'Action',
      key: '4',
      dataIndex: 'action',
      render: (_, Record) => (
        <>
          <Button
            type="primary"
            className="payment-button"
            onClick={() => rateTheTutor(Record.bookingRequestId.tutor)}
          >
            Rate Him
          </Button>
        </>
      ),
      fixed: 'right',
    },
  ];

  const onRatingTheTutor: FormProps<TTutor>['onFinish'] = async (values) => {
    let toastId: string | number = 'payment';
    toastId = toast.loading('...Loading', { id: toastId });

    const objData = {
      ...values,
      tutorId: tutor?._id,
      review: values.review,
    };

    try {
      const res = await updateTutorRatingService(objData);

      if (res?.success) {
        toast.success(res?.message, { id: toastId });
        onCloseDrawer();
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

  return (
    <>
      <div className="heading-info">
        <div className="welcome-message">
          <h3 className="header">Review Tutors</h3>
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

      <Drawer title="Rate The Tutor" onClose={onCloseDrawer} open={open}>
        <h4 className="tutor-name">
          <span className="name-title">Name:</span>
          <span className="name-value">{tutor?.name}</span>
        </h4>
        <Form
          className="book-tutor-detail"
          name="basic"
          form={form}
          onFinish={onRatingTheTutor}
          autoComplete="off"
        >
          <Form.Item<TTutor>
            label="Rating"
            name="rate"
            className="label-input"
            rules={[{ required: true, message: 'Please give your rating!' }]}
          >
            <Rate
              defaultValue={0}
              // onChange={(value) => onChangeFilter('rating', value)}
              className="filter-list"
            />
          </Form.Item>

          <Form.Item<TTutor>
            label="Review"
            name="review"
            className="label-input"
            rules={[{ required: true, message: 'Please give your review!' }]}
          >
            <TextArea
              showCount
              maxLength={1000}
              placeholder="enter your review"
              style={{ height: 120, resize: 'none' }}
            />
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
