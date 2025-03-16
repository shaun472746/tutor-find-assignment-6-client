/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Input } from 'antd';
import '../assets/BlogDetail.css';
import '@/../../assets/root.css';
import { getNewsItemsService } from '@/services/BlogService/blogService';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const { Search } = Input;

export default function BlogDetailSection() {
  const [newsList, setNewsList] = useState<any>(null);
  const getNewsContents = async (queryValue: string) => {
    const res = await getNewsItemsService(queryValue);
    setNewsList(res.data);
  };

  const getSearchValue = (value: string) => {
    const values = value.toString()?.length > 0 ? value : 'a';
    getNewsContents(values);
  };

  useEffect(() => {
    getNewsContents('a');
  }, []);

  return (
    <div className="detail-section ">
      <div className="title-and-search">
        <h3 className="blog-title">Blog Page</h3>
        <Search
          placeholder="Find Article by title"
          onSearch={getSearchValue}
          className="blog-search"
        />
      </div>
      {newsList &&
        newsList.map((item: any, index: number) => (
          <div key={index}>
            <p className="date-time">Author: {item?.author}</p>
            <h4 className="blog-title">{item?.title}</h4>
            <div className="blog-section-with-image">
              <Image
                src={item?.urlToImage || `/images/static/profile.png`}
                width={100}
                height={100}
                className="blog-image"
                alt="blog-image"
              />
            </div>
            <div className="blog-description">
              <p>{item.content}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
