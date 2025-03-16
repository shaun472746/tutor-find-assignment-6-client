'use client';

import {
  Checkbox,
  Col,
  Row,
  GetProp,
  Rate,
  Slider,
  InputNumberProps,
  InputNumber,
  Select,
  Button,
  Radio,
  RadioChangeEvent,
} from 'antd';
import '../assets/SideBar.css';
import '@/../../assets/root.css';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ExpertiseSubject, locations } from '@/utils/constants';
import { useSearchParams } from 'next/navigation';

type sidebarPropType = {
  setQueryParams: Dispatch<SetStateAction<URLSearchParams>>;
  queryParams: URLSearchParams;
  queryParamsSorting: URLSearchParams;
  setQueryParamsSorting: Dispatch<SetStateAction<URLSearchParams>>;
};

export default function SidebarSection({
  setQueryParams,
  queryParams,
  setQueryParamsSorting,
}: sidebarPropType) {
  const [inputValue, setInputValue] = useState<number>(500);
  const [checkedValues, setCheckedValues] = useState<string[]>(['available']);
  const searchParams = useSearchParams();
  const [querySelfParams, setQuerySelfParams] = useState(
    new URLSearchParams(searchParams.toString())
  );

  useEffect(() => {
    const params = new URLSearchParams(queryParams.toString());
    params.set('subject', 'mathematics');
    params.set('grade', 'class 7');
    params.set('location', 'dhanmondi');
    params.set('rating', '0');
    params.set('rate', '500');
    params.set('isBlocked', 'false');
    setQuerySelfParams(params);
  }, [queryParams]);

  const onChangeRange: InputNumberProps['onChange'] = (newValue) => {
    setInputValue(newValue as number);
    onChangeFilter('rate', newValue as number);
  };

  const onChangeCheckbox: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    setCheckedValues(checkedValues as string[]);

    if (checkedValues.length) {
      onChangeFilter('isBlocked', 'false');
    } else {
      onChangeFilter('isBlocked', 'true');
    }
  };
  const onChangeNewProfile: GetProp<typeof Checkbox.Group, 'onChange'> = (
    checkedValues
  ) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', 'hourly_rate,rating,createdAt');

    if (checkedValues.length) {
      params.set('createdAt', 'desc');
    } else {
      params.set('createdAt', 'asc');
    }
    setQueryParamsSorting(new URLSearchParams(params.toString()));
  };

  const onChangePriceSort = (e: RadioChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', 'hourly_rate,rating,createdAt');
    params.set('hourly_rate', e.target.value === 0 ? 'desc' : 'asc');

    setQueryParamsSorting(new URLSearchParams(params.toString()));
    // setPriceSort(e.target.value);
  };
  const onChangeRatingSort = (e: RadioChangeEvent) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', 'hourly_rate,rating,createdAt');
    params.set('rating', e.target.value === 0 ? 'desc' : 'asc');

    setQueryParamsSorting(new URLSearchParams(params.toString()));
    // setRatingSort(e.target.value);
  };

  // Update queryParams state without pushing to router
  const onChangeFilter = (query: string, value: string | number | boolean) => {
    const params = new URLSearchParams(querySelfParams.toString());
    params.set(query, value.toString());

    setQuerySelfParams(params);
  };

  // Apply all stored filters when clicking the Search button
  const applyFilters = () => {
    const params = new URLSearchParams(querySelfParams.toString());
    setQueryParams(params);
  };

  return (
    <div className="sidebar-section ">
      <h3 className="search-header">Filter Search</h3>
      <div className="filter-area">
        <h5 className="filter-title">Subject</h5>
        <div className="options filter-list">
          <Select
            defaultValue="mathmatics"
            style={{ width: '100%' }}
            onChange={(value) => onChangeFilter('subject', value)}
            options={ExpertiseSubject}
          />
        </div>

        <h5 className="filter-title">Class</h5>
        <div className="options filter-list">
          <Select
            defaultValue="Class 7"
            style={{ width: '100%' }}
            onChange={(label) => onChangeFilter('grade', label)}
            options={[
              { value: 'Class 7', label: 'Class 7' },
              { value: 'Class 8', label: 'Class 8' },
              { value: 'Class 9', label: 'Class 9' },
              { value: 'Class 10', label: 'Class 10' },
            ]}
          />
        </div>
        <h5 className="filter-title">Rating</h5>
        <Rate
          defaultValue={0}
          onChange={(value) => onChangeFilter('rating', value)}
          className="filter-list"
        />

        <h5 className="filter-title">Hourly Rate(BDT)</h5>
        <div className="range-slider filter-list">
          <Slider
            min={500}
            max={4000}
            onChange={onChangeRange}
            className="slider-component"
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
          <InputNumber
            min={500}
            max={4000}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={onChangeRange}
          />
        </div>
        <h5 className="filter-title">Availability</h5>
        <Checkbox.Group
          className="filter-list"
          onChange={onChangeCheckbox}
          value={checkedValues}
        >
          <Row>
            <Col span={24}>
              <Checkbox value="available">Available</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
        <h5 className="filter-title">Location</h5>
        <div className="options filter-list">
          <Select
            defaultValue="dhanmondi"
            style={{ width: '100%' }}
            onChange={(value) => onChangeFilter('location', value)}
            options={locations}
          />
        </div>
      </div>
      <div className="filter-action-btn">
        <Button block onClick={applyFilters}>
          Apply Filter
        </Button>
      </div>
      <h3 className="search-header">Sort Tutors</h3>
      <div className="filter-area">
        <h5 className="filter-title">Rating</h5>
        <Radio.Group
          name="radiogroup"
          defaultValue={1}
          onChange={onChangeRatingSort}
          options={[
            { value: 1, label: 'Low To High' },
            { value: 0, label: 'High To Low' },
          ]}
        />
        <h5 className="filter-title">Pricing</h5>
        <Radio.Group
          name="radiogroup"
          defaultValue={1}
          onChange={onChangePriceSort}
          options={[
            { value: 1, label: 'Low To High' },
            { value: 0, label: 'High To Low' },
          ]}
        />
        <h5 className="filter-title">New Profiles</h5>
        <Checkbox.Group className="filter-list" onChange={onChangeNewProfile}>
          <Row>
            <Col span={24}>
              <Checkbox value="new">Find New Profile</Checkbox>
            </Col>
          </Row>
        </Checkbox.Group>
      </div>
      {/* <div className="filter-action-btn">
        <Button block onClick={applySorting}>
          Apply Sorting
        </Button>
      </div> */}
    </div>
  );
}
