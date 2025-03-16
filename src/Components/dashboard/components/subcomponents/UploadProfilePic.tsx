'use client';

import { useUser } from '@/context/UserContext';

import '../../assets/DashboardMainPage.css';
import '@/../../assets/root.css';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Upload, UploadProps } from 'antd';
import { toast } from 'sonner';
import { useState } from 'react';
import { uploadProfileImgService } from '@/services/DashboardService/StudentService';
import { updateCurrentUser } from '@/services/AuthService';

export default function UploadProfileImage() {
  const { user, setIsLoading } = useUser();
  const [ImgLoading, setImgLoading] = useState(false);

  const handleImageUpload: UploadProps['onChange'] = async (info) => {
    if (info.file.status === 'uploading') {
      setImgLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setImgLoading(false);
      const data = new FormData();
      data.append('file', info.file.originFileObj as File);
      data.append(
        'upload_preset',
        process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!
      );
      data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
      const toastId = toast.loading('...Loading', { id: 1 });
      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: data,
          }
        );
        const resp = await res.json();

        const result = await uploadProfileImgService({ url: resp.secure_url });

        if (result?.success) {
          await updateCurrentUser(user?.userId as string);
          toast.success(result.message, { id: toastId });
          setIsLoading(true);
        } else {
          toast.error(result.message, { id: toastId });
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {ImgLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {user?.imageUrl && user?.imageUrl?.length > 0
          ? 'Change Image'
          : 'Upload Image'}
      </div>
    </button>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={handleImageUpload}
      >
        {uploadButton}
      </Upload>
    </>
  );
}
