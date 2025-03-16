'use client';

import Image from 'next/image';
import styles from '@/app/page.module.css';
import '@/../../assets/root.css';
import { useRouter } from 'next/navigation';
import { ConfigProvider, Menu, MenuProps } from 'antd';
import {
  basicNavRoutes,
  AuthenticatedNavRoutes,
  MenuItem,
} from '@/utils/constants';
import { useUser } from '@/context/UserContext';
import { logout } from '@/services/AuthService';

import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const [navRoutes, setNavRoutes] = useState<MenuItem[]>(basicNavRoutes);

  const { user, setIsLoading } = useUser();

  useEffect(() => {
    if (user?.userId) {
      setNavRoutes(AuthenticatedNavRoutes);
    } else {
      setNavRoutes(basicNavRoutes);
    }
  }, [user]);

  const onClick: MenuProps['onClick'] = (e) => {
    document.title = e.key;

    if (e.key == 'logout') {
      setIsLoading(true);

      logout();
      router.push('/');
    } else {
      router.push(e.key);
    }
  };
  return (
    <>
      <div className={styles.topNav}>
        <p className={`${styles.topNavP} default-padding-body`}>
          <span className={styles.phoneDtl}>
            <Image
              src="/images/static/call-logo.png"
              width={25}
              height={18}
              className={styles.topNavLogo}
              alt="call-logo"
            />
            +8801234567891
          </span>
          <span className={styles.phoneDtl}>
            <Image
              src="/images/static/email-logo.png"
              width={25}
              height={18}
              alt="email-logo"
            />
            findTutor@gmail.com
          </span>
        </p>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemHoverColor: '#fff',
              itemColor: '#fff',
              popupBg: '#002855',
            },
          },
        }}
      >
        <div className={`${styles.navContainer} default-padding-body`}>
          <Image
            src="/images/static/web-logo.png"
            width={200}
            height={35}
            alt="email-logo"
          />
          <Menu
            mode="horizontal"
            onClick={onClick}
            items={navRoutes}
            className={styles.navStyle}
          />
        </div>
      </ConfigProvider>
    </>
  );
}
