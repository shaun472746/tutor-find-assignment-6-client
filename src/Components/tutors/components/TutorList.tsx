'use client';
import { BackwardOutlined } from '@ant-design/icons';
import '../assets/TutorList.css';
import '@/../../assets/root.css';
import {
  Button,
  Col,
  Drawer,
  Form,
  FormProps,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  createBookingRequestService,
  getAllTutors,
} from '@/services/TutorService';
import { allTutors, Tutor, tutorBookingData } from '@/types';
import { useUser } from '@/context/UserContext';
import { toast } from 'sonner';
import { useSearchParams } from 'next/navigation';

type sidebarPropType = {
  queryParams: URLSearchParams;
  queryParamsSorting: URLSearchParams;
};

export default function TutorList({
  queryParams,
  queryParamsSorting,
}: sidebarPropType) {
  const [viewDetail, setViewDetail] = useState<boolean>(false);
  const [tutors, setTutors] = useState<allTutors>(null);
  const [tutor, setTutor] = useState<Tutor>(null);
  const { user, profileDetail } = useUser();
  const [open, setOpen] = useState<boolean>(false);
  const [form] = Form.useForm<tutorBookingData>();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');

  const showDrawer = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (search) {
      try {
        const fetchTutors = async () => {
          if (search) {
            try {
              const params = new URLSearchParams();
              params.set('search', search);
              params.set('isBlocked', 'false');
              // Await the result of getAllTutors
              const result = await getAllTutors(params.toString());

              // Access the data property after the Promise resolves
              setTutors(result.data);
            } catch (err) {
              console.log(err);
            }
          }
        };

        fetchTutors();
      } catch (err) {
        console.log(err);
      }
    }
  }, [search]);

  const onCloseDrawer = () => {
    setOpen(false);
  };

  const showTutorDetail = (tutorItem: Tutor) => {
    setViewDetail(true);
    setTutor(tutorItem);
  };

  useEffect(() => {
    const getTutorsFunc = async () => {
      const result = await getAllTutors(queryParams.toString());
      setTutors(result.data);
    };
    getTutorsFunc();
  }, [queryParams]);

  useEffect(() => {
    const getTutorsSortedFunc = async () => {
      const result = await getAllTutors(queryParamsSorting.toString());
      setTutors(result.data);
    };
    getTutorsSortedFunc();
  }, [queryParamsSorting]);

  const onUpdateUserProfile: FormProps<tutorBookingData>['onFinish'] = async (
    values
  ) => {
    let toastId: string | number = 'updateProfile';
    toastId = toast.loading('...Loading', { id: toastId });
    if (values) {
      values.userId = user?.userId;
      values.tutorId = tutor?.id?._id || tutor?.userDetails?._id;
    }

    try {
      const res = await createBookingRequestService(values);
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
    <div className="tutor-section">
      <div className="heading-info">
        <h3 className="header">Meet Our Tutors</h3>
        <p className="sub-header">
          Dedicated to Unlocking Every Student’s Potential
        </p>
      </div>
      {viewDetail === false ? (
        <Row gutter={[16, 16]}>
          {tutors &&
            tutors.map((tutor, index) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                lg={8}
                xl={6}
                className="gutter-row"
                key={index}
              >
                <div className="personal-detail">
                  <Image
                    src={tutor?.id?.imageUrl || `/images/static/profile.png`}
                    width={90}
                    height={90}
                    className="team-image"
                    alt="team-image"
                  />
                  <h4 className="member-name">
                    {tutor?.id?.name || tutor?.userDetails?.name}
                  </h4>
                  <p
                    className="designation"
                    title={`Expert in ${tutor?.expertise.toString()}`}
                  >
                    Expert in {tutor?.expertise.toString()}
                  </p>
                  <Button block onClick={() => showTutorDetail(tutor)}>
                    View Detail
                  </Button>
                </div>
              </Col>
            ))}
        </Row>
      ) : (
        <>
          <p
            className="previous-page-link"
            onClick={() => setViewDetail(false)}
          >
            <BackwardOutlined />
            Go Back To Tutor List
          </p>
          <div className="tutor-header-info">
            <Image
              src={tutor?.id?.imageUrl || `/images/static/profile.png`}
              width={90}
              height={90}
              className="team-image"
              alt="team-image"
            />
            <div className="title-description">
              <h4 className="title">
                {tutor?.id?.name || tutor?.userDetails?.name}
              </h4>
              <span className="expert-in">
                {' '}
                Expert in {tutor?.expertise.toString()}
              </span>
            </div>
          </div>
          <div className="teaching-detail">
            <div className="tutor-info">
              <span className="info-title">Time Slots:</span>
              <span className="info-value">
                {' '}
                {tutor?.availability_slot.join(' / ')}
              </span>
            </div>
            <div className="tutor-info">
              <span className="info-title">Subjects:</span>{' '}
              <span className="info-value">{tutor?.subjects.toString()}</span>
            </div>
            <div className="tutor-info">
              <span className="info-title">Hourly Rate:</span>{' '}
              <span className="info-value">{tutor?.hourly_rate} BDT</span>
            </div>
            <Button
              block
              disabled={!user || !profileDetail || user?.role === 'tutor'}
              onClick={showDrawer}
            >
              Book Tutor
            </Button>
            {!user && (
              <p className="tutor-error-msg">Please login to book the tutor!</p>
            )}
            {!profileDetail && (
              <p className="tutor-error-msg">
                Please please provide detail information in Dashboard to book!
              </p>
            )}
          </div>
        </>
      )}

      <Drawer title="Book Tutor" onClose={onCloseDrawer} open={open}>
        <Form
          className="book-tutor-detail"
          name="basic"
          form={form}
          initialValues={{
            class: profileDetail?.class,
            hourly_rate: tutor?.hourly_rate,
          }}
          onFinish={onUpdateUserProfile}
          autoComplete="off"
        >
          <Form.Item<tutorBookingData>
            label="Time Slot"
            name="availability_slot"
            className="label-input"
            rules={[
              { required: true, message: 'Please enter your time slot!' },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="select your class"
              options={tutor?.availability_slot?.map((item, index) => ({
                label: item,
                value: item,
                key: index,
              }))}
              optionRender={(option) => <Space>{option.data.label}</Space>}
            />
          </Form.Item>
          <Form.Item<tutorBookingData>
            label="Subjects"
            name="subjects"
            className="label-input"
            rules={[
              {
                required: true,
                message: 'Please enter your phone number!',
              },
            ]}
          >
            <Select
              style={{ width: '100%' }}
              placeholder="select your subject"
              options={tutor?.subjects?.map((item, index) => ({
                label: item,
                value: item,
                key: index,
              }))}
              optionRender={(option) => <Space>{option.data.label}</Space>}
            />
          </Form.Item>
          <Form.Item<tutorBookingData>
            label="Class"
            name="class"
            className="label-input"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item<tutorBookingData>
            label="Hourly Rate"
            name="hourly_rate"
            className="label-input"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item label={null}>
            <Button className="dashboard-update-btn" htmlType="submit">
              Book Now
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}
