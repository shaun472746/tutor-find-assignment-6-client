'use client';

import '../assets/LoginPage.css';
import { Button, Card, Form, FormProps, Input } from 'antd';
import '@/../../assets/root.css';
import { FieldTypeLogin } from '@/types';
import Link from 'next/link';
import { toast } from 'sonner';
import { loginUser } from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { setIsLoading } = useUser();

  const onFinish: FormProps<FieldTypeLogin>['onFinish'] = async (values) => {
    let toastId: string | number = 'login';

    try {
      if (toastId == 'login') {
        toastId = toast.loading('...Loading', { id: toastId });
      }
      const userInfo = {
        email: values.email,
        password: values.password,
      };
      const res = await loginUser(userInfo);

      if (res?.success) {
        setIsLoading(true);
        router.push('/dashboard');
        toast.success(res?.message, { id: toastId });
      } else {
        toast.error(res?.message, { id: toastId });
      }
    } catch (err) {
      toast.error(err as string, { id: toastId });
    }
  };
  return (
    <div className="login-page">
      <Card className="login-card">
        <h1>Login Page</h1>
        <Form
          className="login-form"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldTypeLogin>
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

          <Form.Item<FieldTypeLogin>
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

          <Form.Item label={null}>
            <Button className="login-submit" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <h4>
          Don&apos;t have an account? Please{' '}
          <Link href="/register">Register</Link>
        </h4>
      </Card>
    </div>
  );
}
