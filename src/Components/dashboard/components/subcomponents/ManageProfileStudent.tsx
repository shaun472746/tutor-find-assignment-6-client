'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/DashboardMainPage.css';
import '@/../../assets/root.css';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Form, FormProps, Input, Row, Select, Space } from 'antd';
import { ClassList } from '@/utils/constants';
import { ProfileDetailStudent } from '@/types';
import { toast } from 'sonner';
import {
  updateCurrentUser,
  getProfileDetail,
  updateStudentProfile,
} from '@/services/AuthService';
import { useEffect, useState } from 'react';
import UploadProfileImage from './UploadProfilePic';

export default function ProfileManagementStudent() {
  const { user, setIsLoading } = useUser();
  const [profileData, setProfileData] = useState<ProfileDetailStudent | null>(
    null
  );

  const [updateProfileMode, setUpdateProfileMode] = useState<
    boolean | undefined
  >(false);

  const [form] = Form.useForm<Partial<ProfileDetailStudent>>();

  useEffect(() => {
    const getProfileDetailFunc = async () => {
      const result = await getProfileDetail(user?.userId as string);
      setProfileData(result.data);
    };
    getProfileDetailFunc();
    form.resetFields();
    setUpdateProfileMode(user?.updateProfile);
  }, [user, form]);

  const updateProfile = () => {
    form.setFieldsValue(profileData);
    setUpdateProfileMode(true);
  };
  const onUpdateUserProfile: FormProps<ProfileDetailStudent>['onFinish'] =
    async (values) => {
      let toastId: string | number = 'updateProfile';
      toastId = toast.loading('...Loading', { id: toastId });
      values!.id = user?.userId as string;
      if (profileData) {
        values!._id = profileData._id;
      }

      try {
        const res = await updateStudentProfile(values);
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
                <Form.Item<ProfileDetailStudent>
                  label="Address"
                  name="address"
                  className="label-input"
                  rules={[
                    { required: true, message: 'Please enter your address!' },
                  ]}
                >
                  <Input placeholder="Enter your address" className="input" />
                </Form.Item>
                <Form.Item<ProfileDetailStudent>
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
                <Form.Item<ProfileDetailStudent>
                  label="Class"
                  name="class"
                  className="label-input"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your class!',
                    },
                  ]}
                >
                  <Select
                    style={{ width: '100%' }}
                    placeholder="select your class"
                    options={ClassList}
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
                  <span className="info-title">Class:</span>{' '}
                  <span className="info-value">
                    {profileData?.class?.toString()}
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
