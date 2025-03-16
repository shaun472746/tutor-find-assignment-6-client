'use client';

import { Col, Row } from 'antd';
import SidebarSection from './SideBar';
import TutorList from './TutorList';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function TutorsParent() {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState(
    new URLSearchParams(searchParams.toString())
  );
  const [queryParamsSorting, setQueryParamsSorting] = useState(
    new URLSearchParams(searchParams.toString())
  );
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8} md={8} lg={8} xl={6} className="gutter-row">
        <SidebarSection
          setQueryParams={setQueryParams}
          queryParams={queryParams}
          queryParamsSorting={queryParamsSorting}
          setQueryParamsSorting={setQueryParamsSorting}
        />
      </Col>
      <Col xs={24} sm={16} md={16} lg={16} xl={18} className="gutter-row">
        <TutorList
          queryParams={queryParams}
          queryParamsSorting={queryParamsSorting}
        />
      </Col>
    </Row>
  );
}
