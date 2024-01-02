import { api } from '@/api/Api'
import Layout from '@/layouts/MainLayout'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Course } from '../home'
import { Flex } from 'antd'
import CourseCard from '@/components/CourseCard'
import styleSheet from './index.scss'

const Detail: NextPage<any> = (props: any) => {
  const [course, setCourse] = useState<null | Course>(null)
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([])

  useEffect(() => {
    if (props.id) getCourse()
  }, [])

  useEffect(() => {
    course && getRelatedCourses()
  }, [course])

  const getCourse = async () => {
    try {
      const resp = await api.get(`/course/${props.id}`)
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
            <div className="box-info">Number Reviews: {course.numReviews}</div>
            <div className="box-info">reviewUrl: {course.reviewUrl}</div>
            <div className="box-info">Provider: {course.providerName}</div>
            <div className="box-info">
              Average Ratings: {course.averageRatings}
            </div>
            <div className="box-info">Source: {course.source}</div>
            <div className="box-info">Category: {course.categories}</div>
          </div>
        )}

        {!!relatedCourses.length && (
          <>
            <h2 style={{ margin: 24, textAlign: 'center' }}>Related</h2>
            <Flex
              gap={16}
              className="related-course"
              style={{ overflowX: 'auto' }}
            >
              {relatedCourses.map((c) => (
                <CourseCard course={c} />
              ))}
            </Flex>
          </>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
    </Layout>
  )
}

Detail.getInitialProps = async (ctx) => {
  const query = ctx.query
  return { ...query }
}

// courseId: number
// clusterId: string
// courseName: string
// link: string
// duration: string
// level: string
// description: string
// numEnrolled: string
// numReviews: string
// price: string
// reviewUrl: string
// instructorId: string
// providerName: string
// averageRatings: string
// masterCategories: string
// source: string
// categories: string

export default Detail
