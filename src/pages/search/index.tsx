import Layout from '@/layouts/MainLayout'
import { Button, Flex, Input, Rate, Select, notification } from 'antd'
import React, { useState } from 'react'
import styleSheet from './index.scss'
import api from '@/api/Api'
import { X } from '@phosphor-icons/react'

interface Course {
  course_link: string
  course_name: string
  similarity_score: number
}

const Search = () => {
  const [keyword, setKeyword] = useState('')
  const [keywords, setKeywords] = useState<string[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [fetching, setFetching] = useState(false)

  const handlePressEnter = () => {
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
      const resp = await api.post('/keywords_recommendation', {
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
          <Input
            placeholder="Nhập từ khóa tìm kiếm"
            onPressEnter={handlePressEnter}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button onClick={handlePressEnter} type="primary">
            Thêm
          </Button>
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
            Tìm kiếm
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
                    <img src="/static/img/default_course_img.png" />
                    <div className="course-name">{course.course_name}</div>
                    <div className="course-link">
                      <a href="#">{course.course_link.slice(0, 100)}</a>
                    </div>
                    <div className="course-score">
                      <Rate
                        allowHalf
                        value={course.similarity_score * 10}
                        disabled
                      />
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
