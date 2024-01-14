import { api } from '@/api/Api'
import Layout from '@/layouts/MainLayout'
import React, { useEffect, useState } from 'react'
import { Course } from '../home'
import CourseCard from '@/components/CourseCard'
import styleSheet from './index.scss'
import { Input } from 'antd'

const Filters = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const fetchData = async () => {
    const resp = await api.get('/course/filter/1')
    setCourses(resp.data)
  }

  const handleSearch = async (value: string) => {
    if (!value) return fetchData()
    const resp = await api.get(`/course/name/${value}`)
    if (resp.data.length) setCourses(resp.data)
    else setCourses([])
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <Layout currentTabId="filters">
      <div className="filter-container">
        <Input.Search placeholder="Enter course Name" onSearch={handleSearch} />
        {courses.length ? (
          <div className="list-course">
            {courses.map((course) => (
              <CourseCard course={course} />
            ))}
          </div>
        ) : (
          <h2 style={{marginTop: 20}}>Không tìm thấy khóa học</h2>
        )}
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      </div>
    </Layout>
  )
}

export default Filters
