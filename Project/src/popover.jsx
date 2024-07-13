
import { HistoryOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import {
  Avatar, Button, Popover, Typography
} from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import useMediaQuery from './useMediaQuery';
import { getSessionUser, removeSessionAndLogoutUser } from './authentication';
import notificationWithIcon from './notification';

const { Title } = Typography;

function UserPopover() {
  const isDesktop = useMediaQuery('(min-width: 1200px)');
  const [loading, setLoading] = useState();
  const user = getSessionUser();
  const router = useRouter();

  // function to handle user logout
  const userLogout = async () => {
    setLoading(true);
    try {
      const response = await Axios.post('http://127.0.0.1:5000/login');
      if (response?.result_code === 1) {
        removeSessionAndLogoutUser();
        setLoading(false);
      } else {
        notificationWithIcon('error', 'ERROR', 'Sorry! Something went wrong. App server error');
        removeSessionAndLogoutUser();
        setLoading(false);
      }
    } catch (error) {
      notificationWithIcon('error', 'ERROR', error?.response?.data?.result?.error || 'Sorry! Something went wrong. App server error');
      removeSessionAndLogoutUser();
      setLoading(false);
    }
  };

  return (
    <>
      <Popover
        placement='bottomRight'
        trigger='hover'
        title={(
          <span style={{ fontSize: '18px' }}>
            {user?.name}
          </span>
      )}
        content={(
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Button
              style={{ color: '#000', padding: '0px' }}
              onClick={() => router.push('/profile?tab=my-profile')}
              icon={<UserOutlined />}
              size='middle'
              type='link'
            >
              My Profile
            </Button>
            <Button
              style={{ color: '#000', padding: '0px' }}
              onClick={() => router.push('/profile?tab=booking-history')}
              icon={<HistoryOutlined />}
              size='middle'
              type='link'
            >
              Booking History
            </Button>
            <Button
              style={{ color: '#000', padding: '0px' }}
              icon={<LogoutOutlined />}
              onClick={userLogout}
              size='middle'
              type='link'
              loading={loading}
              disabled={loading}
            >
              Log Out
            </Button>
          </div>
        )}
      >
        <Avatar
          style={{
            position: 'absolute', right: '100px', top: '20px', cursor: 'pointer'
          }}
          src={(
            <img
              src={user?.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'}
              alt='avatar-img'
            />
        )}
          size='large'
        />
      </Popover>

      {isDesktop && (
        <Title
          style={{ position: 'absolute', right: '150px', top: '22px' }}
          level={3}
        >
          {`Welcome! ${user?.name || 'N/A'}`}
        </Title>
      )}
    </>
  );
}

export default UserPopover;
