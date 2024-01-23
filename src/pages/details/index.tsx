import { api } from '@/api/Api'
import Layout from '@/layouts/MainLayout'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Course } from '../home'
import { Flex, Spin, Table } from 'antd'
import CourseCard from '@/components/CourseCard'
import styleSheet from './index.scss'
import Router from 'next/router'

interface Lesson {
  lessonId: string
  moduleNumber: number
  lessonName: string
  duration: string
  link: string
}

const Detail: NextPage<any> = (props: any) => {
  const [course, setCourse] = useState<null | Course>(null)
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([])
  const [lessons, setLessons] = useState<Lesson[]>([])

  const [currentCourseId, setCurrentCourseId] = useState<number | null>(null)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.id) getCourse()
    else if (props.courseUrl) getCourseByUrl()
    else Router.push('/home')
  }, [])

  useEffect(() => {
    if (course) {
      getRelatedCourses()
      getLessons()
    }
  }, [course])

  useEffect(() => {
    if (currentCourseId) getCourse(currentCourseId)
  }, [currentCourseId])

  const getCourse = async (id: number | null = null) => {
    setLoading(true)
    try {
      const resp = await api.get(`/course/${id || props.id}`)
      setCourse(resp.data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const getLessons = async () => {
    if (!course) return
    try {
      const resp = await api.get('/lessons/link', { url: course.link })
      setLessons(resp.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getCourseByUrl = async () => {
    try {
      const resp = await api.get(`/course/link`, { url: props.courseUrl })

      setCourse(resp.data)
    } catch (error) {
      console.error(error)
    }
  }

  const getRelatedCourses = async () => {
    try {
      const resp = await api.get(
        `/course/${course?.courseId}/cluster/${course?.clusterId}`
      )
      setRelatedCourses(resp.data)
    } catch (error) {}
  }

  return (
    <Layout currentTabId="details">
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            minHeight: 500,
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {course && (
            <div className="detail-course">
              <div className="box-info name">{course.courseName}</div>
              <div className="box-info link">
                <a href={course.link}>{course.link}</a>
              </div>
              <div className="box-info duration">
                Duration: {course.duration} hours
              </div>
              <div className="box-info level">Level: {course.level}</div>
              <p className="box-info description">{course.description}</p>
              <div className="box-info num-enrolled">
                Number Enrolled: {course.numEnrolled}
              </div>
              <div className="box-info">
                Number Reviews: {course.numReviews}
              </div>
              <div className="box-info">reviewUrl: {course.reviewUrl}</div>
              <div className="box-info">Provider: {course.providerName}</div>
              <div className="box-info">
                Average Ratings: {course.averageRatings}
              </div>
              <div className="box-info">Source: {course.source}</div>
              <div className="box-info">Category: {course.categories}</div>
            </div>
          )}

          {!!lessons.length && (
            <div>
              <h2 style={{ margin: 24, textAlign: 'center' }}>Lessons</h2>

              <Table
                dataSource={lessons.map((l) => ({ ...l, key: l.lessonId }))}
                columns={[
                  {
                    dataIndex: 'lessonName',
                    title: 'Name',
                    render: (v) => v,
                  },
                  {
                    dataIndex: 'moduleNumber',
                    title: 'Module Number',
                    render: (v) => v,
                  },
                  {
                    dataIndex: 'duration',
                    title: 'Duration',
                    render: (v) => {
                      console.log(v)
                      return v
                    },
                  },
                ]}
                pagination={false}
              />
            </div>
          )}

          {!!relatedCourses.length && (
            <>
              <h2 style={{ margin: 24, textAlign: 'center' }}>
                Related Courses
              </h2>
              <Flex
                gap={16}
                className="related-course"
                style={{ overflowX: 'auto' }}
              >
                {relatedCourses.map((c) => (
                  <CourseCard
                    course={c}
                    onClick={() => setCurrentCourseId(c.courseId)}
                  />
                ))}
              </Flex>
            </>
          )}
        </div>
      )}
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
    </Layout>
  )
}

Detail.getInitialProps = async (ctx) => {
  const query = ctx.query
  return { ...query }
}

export default Detail
