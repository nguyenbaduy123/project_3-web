import Layout from '@/layouts/MainLayout'
import { Button, Flex, Input, Rate, notification, Space } from 'antd'
import React, { useState } from 'react'
import styleSheet from './index.scss'
import { recommendationApi } from '@/api/Api'
import { X } from '@phosphor-icons/react'

interface Course {
  course_link: string
  course_name: string
  similarity_score: number
}

const Search = (props: any) => {
  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [fetching, setFetching] = useState(false)

  // const handleClickCourse = () => {
  //   Router.push(
  //     {
  //       query: { id: course.courseId.toString() },
  //       pathname: '/details',
  //     },
  //     '/details'
  //   )
  // }

  const handlePressEnter = () => {
    if (!keyword) return
    if (keywords.includes(keyword)) {
      notification.error({
        message: 'Từ khóa đã tồn tại',
        description: 'Từ khóa này đã được chọn. Vui lòng chọn từ khóa khác.',
      })
      return
    }
    addKeywordToList()
  }

  const addKeywordToList = () => {
    setKeywords((prevs) => [...prevs, keyword])
    setKeyword('')
  }

  const handleSearch = async () => {
    setFetching(true)
    try {
      const resp = await recommendationApi.post('/keywords_recommendation', {
        keywords,
        top_n: 10,
      })
      setCourses(resp.data)
    } catch (error) {
      console.log(error)
    }
    setFetching(false)
  }

  const handleRemove = (k: string) => {
    setKeywords((prevs) => prevs.filter((keyword) => keyword !== k))
  }

  return (
    <Layout currentTabId="search">
      <div className="search-container">
        <div className="input-keyword">
          <Space.Compact style={{ width: '100%' }}>
            <Input
              placeholder="Nhập từ khóa tìm kiếm"
              onPressEnter={handlePressEnter}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button onClick={handlePressEnter} type="primary">
              Add
            </Button>
          </Space.Compact>
        </div>
        <div className="list-kw-container">
          <label>Danh sách từ khóa</label>
          <div className="list-keywords">
            {keywords.map((k, idx) => (
              <div className="keyword-item" key={idx}>
                <span>{k}</span>
                <span onClick={() => handleRemove(k)} className="icon-remove">
                  <X size={12} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <Flex justify="flex-end">
          <Button loading={fetching} type="primary" onClick={handleSearch}>
            Recommend
          </Button>
        </Flex>
        {!!courses.length && (
          <div>
            <Flex justify="center">
              <h2>Kết quả tìm kiếm</h2>
            </Flex>
            <div className="results-course">
              {courses.map((course) => {
                return (
                  <div className="course-item">
                    <div className="course-dum">Course</div>
                    <div className="course-name">{course.course_name}</div>
                    <div className="course-link">
                      <a href="#">{course.course_link.slice(0, 100)}</a>
                    </div>
                    <div className="course-score">
                      Similarity score: {course.similarity_score.toFixed(2)}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
    </Layout>
  )
}

export default Search
