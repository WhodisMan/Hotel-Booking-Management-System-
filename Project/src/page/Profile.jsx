//import { EditOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import {
  Button, Descriptions, Image, Modal, Result, Skeleton, Tag, Tooltip, Upload
} from 'antd';
//import ImgCrop from 'antd-img-crop';
//import getConfig from 'next/config';
import React, { useState } from 'react';
// import useFetchData from '../../hooks/useFetchData';
//import ApiService from '../../utils/apiService';
import { getSessionToken, getSessionUser, setSessionUserKeyAgainstValue } from '../authentication';
import axios from 'axios';
//import notificationWithIcon from '../notification';
//import { userStatusAsResponse } from '../../utils/responseAsStatus';
// import ProfileEditModal from './ProfileEditModal';

//const { publicRuntimeConfig } = getConfig();
const { confirm } = Modal;

function MyProfile() {
  //const [editProfileModal, setEditProfileModal] = useState(false);
  const token = getSessionToken();
  const user = getSessionUser();

  // fetch user profile API data
  const [loading, error, response] = useState('null');

  return (
    <>
      <Skeleton loading={loading} paragraph={{ rows: 10 }} active avatar>
        {error ? (
          <Result
            title='Failed to fetch'
            subTitle={error}
            status='error'
          />
        ) : (
          <Descriptions
            title='Profile Information'
            bordered
            extra={(
              <>
                {!user?.verified && (
                  <Button
                    style={{ marginTop: '10px', marginRight: '20px' }}
                    //onClick={handleVerifyEmail}
                    shape='default'
                    type='primary'
                    size='large'
                  >
                    Verify Email
                  </Button>
                )}

                <Button
                  style={{ marginTop: '10px', marginRight: '20px' }}
                  //onClick={() => setEditProfileModal(true)}
                  shape='default'
                  type='primary'
                  size='large'
                >
                  Edit Profile
                </Button>
              </>
            )}
          >

            <Descriptions.Item label='Full Name'>
              {response?.data?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label='User Name' span={2}>
              {response?.data?.userName}
            </Descriptions.Item>
            <Descriptions.Item label='Email'>
              {response?.data?.email}
            </Descriptions.Item>
            <Descriptions.Item label='Phone' span={2}>
              {response?.data?.phone}
            </Descriptions.Item>

            <Descriptions.Item label='Role'>
              <Tag
                style={{ width: '60px', textAlign: 'center', textTransform: 'capitalize' }}
                color={response?.data?.role === 'admin' ? 'magenta' : 'purple'}
              >
                {response?.data?.role}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label='Verified'>
              <Tag
                style={{ width: '50px', textAlign: 'center', textTransform: 'capitalize' }}
                color={response?.data?.verified ? 'success' : 'error'}
              >
                {response?.data?.verified ? 'Yes' : 'No'}
              </Tag>
            </Descriptions.Item>
          </Descriptions>
        )}
      </Skeleton>
    </>
  );
}

export default React.memo(MyProfile);