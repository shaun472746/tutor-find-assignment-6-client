'use client';

import '../assets/RegisterPage.css';
import { Button, Card, Form, FormProps, Input, Select } from 'antd';
import '@/../../assets/root.css';
import { FieldTypeRegister } from '@/types';
import Link from 'next/link';
import { toast } from 'sonner';
import { registerUser } from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function RegisterPage() {
  const router = useRouter();
  const { setIsLoading } = useUser();

  const onFinish: FormProps<FieldTypeRegister>['onFinish'] = async (values) => {
    const toastId: string | number = 'register';

    try {
      if (values.password != values.confirm_password) {
        toast.error('Password and Confirm Password does not match!', {
          id: toastId,
        });

        return;
      }

      const res = await registerUser(values);

      if (res?.success) {
        setIsLoading(true);
        router.push('/dashboard');
        toast.success(res?.message);
      } else {
        toast.error(res?.error?.[0]?.message);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error';
      toast.error(message, { id: toastId });
    }
  };
  return (
    <div className="register-page">
      <Card className="register-card">
        <h1>Register Page</h1>
        <Form
          className="register-form"
          name="basic"
          initialValues={{ role: 'student' }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldTypeRegister>
            label="Name"
            name="name"
            className="label-input"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input placeholder="Enter your name" className="input" />
          </Form.Item>
          <Form.Item<FieldTypeRegister>
            label="Email"
            name="email"
            className="label-input"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" className="input" />
          </Form.Item>

          <Form.Item<FieldTypeRegister>
            label="Password"
            className="label-input"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="input"
            />
          </Form.Item>
          <Form.Item<FieldTypeRegister>
            label="Confirm Password"
            className="label-input"
            name="confirm_password"
            rules={[
              { required: true, message: 'Please input your password again!' },
            ]}
          >
            <Input.Password
              placeholder="Enter your password again"
              className="input"
            />
          </Form.Item>
          <Form.Item<FieldTypeRegister>
            label="Role"
            className="label-input"
            name="role"
            rules={[{ required: false, message: 'Please select your role!' }]}
          >
            <Select
              style={{ width: 120 }}
              options={[
                { value: 'student', label: 'Student' },
                { value: 'tutor', label: 'Tutor' },
              ]}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button className="register-submit" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <h4>
          Already have an account? Please <Link href="/login">Login</Link>
        </h4>
      </Card>
    </div>
  );
}
