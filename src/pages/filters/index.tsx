import { api } from '@/api/Api'
import Layout from '@/layouts/MainLayout'
import React, { useEffect, useState } from 'react'
import { Course } from '../home'
import CourseCard from '@/components/CourseCard'
import styleSheet from './index.scss'
import { Button, Input, InputNumber, Slider } from 'antd'

const Filters = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const fetchData = async () => {
    const resp = await api.get('/course/filter/1')
    setCourses(resp.data)
  }

  const [keywordName, setKeywordName] = useState('')
  const [filterDuration, setFilterDuration] = useState<number[]>([0, 1])
  const [star, setStar] = useState('4')

  const [searching, setSearching] = useState(false)

  const handleSearch = async () => {
    setSearching(true)
    try {
      const resp = await api.get(`/course/filter/1`, {
        name: keywordName,
        botDur: filterDuration[0],
        topDur: filterDuration[1],
        star: star,
      })

      if (resp.data.length) setCourses(resp.data)
      else setCourses([])
    } catch (error) {
      console.log(error)
    }
    setSearching(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const marksDur = {
    0: '0 hours',
    5: '5 hours',
    10: '10 hours',
    72: '3 days',
    24: '1 day',
    48: '2 days',
  }

  return (
    <Layout currentTabId="filters">
      <div className="filter-container">
        <div
          style={{
            padding: 12,
            display: 'flex',
            gap: 48,
            alignItems: 'center ',
          }}
        >
          <label style={{ marginTop: 6, width: 100 }}>Name: </label>
          <div style={{ width: '90%' }}>
            <Input.Search
              placeholder="Enter course Name"
              onChange={(e) => setKeywordName(e.target.value)}
              value={keywordName}
            />
          </div>
          <div
            style={{
              padding: 12,
              display: 'flex',
              gap: 48,
            }}
          >
            <label style={{ marginTop: 6, width: 50 }}>Star: </label>
            <InputNumber<string>
              style={{ width: 200 }}
              defaultValue="1"
              min="0"
              max="5"
              step="0.1"
              stringMode
              onChange={(v) => v && setStar(v)}
              value={star}
            />
          </div>
        </div>
        <div
          style={{
            padding: 12,
            display: 'flex',
            gap: 48,
          }}
        >
          <label style={{ marginTop: 6, width: 100 }}>Duration: </label>
          <div style={{ width: '90%' }}>
            <Slider
              min={0}
              max={72}
              range
              value={filterDuration}
              onChange={setFilterDuration}
              tooltip={{
                // @ts-ignore
                formatter: (v) => marksDur[v] || `${v} hours`,
              }}
              marks={marksDur}
            />
          </div>
        </div>
        <div
          style={{ margin: 16, display: 'flex', justifyContent: 'flex-end' }}
        >
          <Button type="primary" onClick={handleSearch} loading={searching}>
            Search
          </Button>
        </div>
        {courses.length ? (
          <div className="list-course">
            {courses.map((course) => (
              <CourseCard course={course} />
            ))}
          </div>
        ) : (
          <h2 style={{ marginTop: 20 }}>Không tìm thấy khóa học</h2>
        )}
        <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
      </div>
    </Layout>
  )
}

export default Filters
