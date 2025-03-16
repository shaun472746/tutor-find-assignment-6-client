'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/DashboardMainPage.css';
import '@/../../assets/root.css';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Form,
  FormProps,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from 'antd';
import {
  ExpertiseSubject,
  subjects,
  AvailableTimeSlot,
} from '@/utils/constants';
import { ProfileDetail } from '@/types';
import { toast } from 'sonner';
import {
  updateTutorProfile,
  updateCurrentUser,
  getTutorProfileDetail,
} from '@/services/AuthService';
import { useEffect, useState } from 'react';
import UploadProfileImage from './UploadProfilePic';

export default function ProfileManagement() {
  const { user, setIsLoading } = useUser();
  const [profileData, setProfileData] = useState<ProfileDetail | null>(null);
  const [updateProfileMode, setUpdateProfileMode] = useState<
    boolean | undefined
  >(false);

  const [form] = Form.useForm<Partial<ProfileDetail>>(undefined);

  useEffect(() => {
    const getProfileDetailFunc = async () => {
      const result = await getTutorProfileDetail(user?.userId as string);

      setProfileData(result.data);
    };
    getProfileDetailFunc();
    // form.resetFields();
    setUpdateProfileMode(user?.updateProfile);
  }, [user]);

  const updateProfile = () => {
    form.setFieldsValue(profileData);
    setUpdateProfileMode(true);
  };
  const onUpdateUserProfile: FormProps<ProfileDetail>['onFinish'] = async (
    values
  ) => {
    let toastId: string | number = 'updateProfile';
    toastId = toast.loading('...Loading', { id: toastId });
    values!.id = user?.userId as string;
    if (profileData) {
      values!._id = profileData._id;
    }

    try {
      const res = await updateTutorProfile(values);
      await updateCurrentUser(user?.userId as string);

      if (res?.success) {
        setIsLoading(true);
        setUpdateProfileMode(false);
        toast.success('Profile updated successfully!', { id: toastId });
      } else {
        toast.error(res.message, { id: toastId });
        console.log(res);
      }
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="heading-info">
        <div className="welcome-message">
          <h3 className="header">Manage Profile</h3>
          <p className="sub-header">Welcome, {user?.name}</p>
        </div>
        {updateProfileMode == false && user?.updateProfile == false && (
          <div className="edit-icon" onClick={updateProfile}>
            <EditOutlined />
          </div>
        )}
        {updateProfileMode == true && user?.updateProfile == false && (
          <div
            className="edit-icon"
            onClick={() => setUpdateProfileMode(false)}
          >
            <CloseOutlined />
          </div>
        )}
      </div>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24} className="gutter-row">
          {/* Student section */}

          {updateProfileMode == true ? (
            <div className="personal-detail">
              {user?.updateProfile == true ? (
                <div className="notification-message">
                  <p>Update Profile to proceed further</p>
                </div>
              ) : (
                ''
              )}

              <Form
                className="update-personal-detail"
                name="basic"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onUpdateUserProfile}
                autoComplete="off"
              >
                <Form.Item<ProfileDetail>
                  label="Address"
                  name="address"
                  className="label-input"
                  rules={[
                    { required: true, message: 'Please enter your address!' },
                  ]}
                >
                  <Input placeholder="Enter your address" className="input" />
                </Form.Item>
                <Form.Item<ProfileDetail>
                  label="Phone No."
                  name="phone"
                  className="label-input"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number!',
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your phone number"
                    className="input"
                  />
                </Form.Item>
                <Form.Item<ProfileDetail>
                  label="Hourly Rate"
                  name="hourly_rate"
                  className="label-input"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your hourly rate!',
                    },
                  ]}
                >
                  <InputNumber />
                </Form.Item>
                <Form.Item<ProfileDetail>
                  label="Subjects"
                  name="subjects"
                  className="label-select"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter subjects you want to teach!',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="select subjects"
                    options={subjects}
                    optionRender={(option) => (
                      <Space>
                        {option.data.label} - {option.data.grade}
                      </Space>
                    )}
                  />
                </Form.Item>
                <Form.Item<ProfileDetail>
                  label="Expertise"
                  name="expertise"
                  className="label-select"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter subjects you are expert in!',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="select subjects"
                    options={ExpertiseSubject}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
                  />
                </Form.Item>
                <Form.Item<ProfileDetail>
                  label="Available Slot(24Hr)"
                  name="availability_slot"
                  className="label-select"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter subjects you are expert in!',
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="select available time slot"
                    options={AvailableTimeSlot}
                    optionRender={(option) => (
                      <Space>{option.data.label}</Space>
                    )}
                  />
                </Form.Item>

                <Form.Item label={null}>
                  <Button className="dashboard-update-btn" htmlType="submit">
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : profileData != null ? (
            <div className="personal-data-photo">
              <div className="personal-detail">
                <p className="personal-info">
                  <span className="info-title">Name:</span>{' '}
                  <span className="info-value">{user?.name}</span>
                </p>
                <p className="personal-info">
                  <span className="info-title">Address:</span>
                  <span className="info-value">{profileData?.address}</span>
                </p>
                <p className="personal-info">
                  <span className="info-title">Email:</span>{' '}
                  <span className="info-value">{user?.userEmail}</span>
                </p>
                <p className="personal-info">
                  <span className="info-title">Mobile No.:</span>{' '}
                  <span className="info-value">{profileData?.phone}</span>
                </p>
                <p className="personal-info">
                  <span className="info-title">Selected Subjects:</span>{' '}
                  <span className="info-value">
                    {profileData?.subjects?.toString()}
                  </span>
                </p>
                <p className="personal-info">
                  <span className="info-title">Hourly Rate:</span>{' '}
                  <span className="info-value">{profileData?.hourly_rate}</span>
                </p>
                <p className="personal-info">
                  <span className="info-title">When Available:</span>{' '}
                  <span className="info-value">
                    {profileData?.availability_slot?.toString()}
                  </span>
                </p>
              </div>
              <UploadProfileImage />
            </div>
          ) : (
            ''
          )}

          {/* Tutor Section */}
        </Col>
      </Row>
    </>
  );
}
