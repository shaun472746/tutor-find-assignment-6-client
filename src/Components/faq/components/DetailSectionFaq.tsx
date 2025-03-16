'use client';

import '../assets/DetailSection.css';
import '@/../../assets/root.css';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Collapse, theme, CollapseProps } from 'antd';
import type { CSSProperties } from 'react';

const getTutoringItems: (
  panelStyle: CSSProperties
) => CollapseProps['items'] = (panelStyle) => [
  {
    key: '1',
    label: 'How do I find a tutor on your website?',
    children: (
      <p>
        Students can browse the tutor page, filter tutors by subject, hourly
        rate, or availability, and select a tutor that fits their needs. Once
        selected, they can book a session by choosing the subject, time, and
        duration.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: 'What subjects do tutors teach on your platform?',
    children: (
      <p>
        Tutors on our platform teach a wide range of subjects. When tutors
        update their profiles, they specify the subjects they teach, such as
        Math, Science, English, or Programming. Students can filter tutors based
        on the subject they need help with.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: '3',
    label: 'How do I know if a tutor is qualified?',
    children: (
      <p>
        Tutors provide details about their qualifications, experience, and
        expertise when updating their profiles. Students can review tutor
        profiles, including their education, teaching experience, and reviews
        from other students.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: '4',
    label: 'What happens if a tutor rejects my booking request?',
    children: (
      <p>
        If a tutor rejects your booking request, you will be notified
        immediately. You can then search for another available tutor and submit
        a new booking request.
      </p>
    ),
    style: panelStyle,
  },
];

const getPaymentItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
  panelStyle
) => [
  {
    key: '1',
    label: 'How do I pay for a tutoring session?',
    children: (
      <p>
        Once a tutor accepts your booking request, you will be directed to the
        payment page. You can complete the payment using available payment
        methods, such as credit/debit cards or digital wallets.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: 'Is my payment information secure?',
    children: (
      <p>
        Yes, we use secure payment gateways to ensure your payment information
        is encrypted and protected. We do not store your payment details on our
        servers.
      </p>
    ),
    style: panelStyle,
  },
];

const getAccountItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (
  panelStyle
) => [
  {
    key: '1',
    label: 'How do I update my profile information?',
    children: (
      <p>
        After logging in, go to your dashboard and click on the Edit Profile
        option. You can update your personal details, profile picture, and other
        information.
      </p>
    ),
    style: panelStyle,
  },
  {
    key: '2',
    label: 'How do I view my booking history or payment history?',
    children: (
      <p>
        In your dashboard, navigate to the Booking History or Payment History
        section. You will find a detailed list of all your past bookings and
        payments.
      </p>
    ),
    style: panelStyle,
  },
];

export default function DetailSectionFaq() {
  const { token } = theme.useToken();
  const panelStyle: React.CSSProperties = {
    marginBottom: 8,
    background: 'rgba(151, 157, 172, 0.15)',
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };
  return (
    <div className="faq-detail-section ">
      <h4 className="faq-title">Tutoring</h4>
      <Collapse
        bordered={false}
        expandIconPosition="end"
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) =>
          isActive ? <MinusOutlined /> : <PlusOutlined />
        }
        style={{ background: token.colorBgContainer }}
        items={getTutoringItems(panelStyle)}
      />
      <h4 className="faq-title">Payments</h4>
      <Collapse
        bordered={false}
        expandIconPosition="end"
        expandIcon={({ isActive }) =>
          isActive ? <MinusOutlined /> : <PlusOutlined />
        }
        style={{ background: token.colorBgContainer }}
        items={getPaymentItems(panelStyle)}
      />
      <h4 className="faq-title">Account Management</h4>
      <Collapse
        bordered={false}
        expandIconPosition="end"
        expandIcon={({ isActive }) =>
          isActive ? <MinusOutlined /> : <PlusOutlined />
        }
        style={{ background: token.colorBgContainer }}
        items={getAccountItems(panelStyle)}
      />
    </div>
  );
}
