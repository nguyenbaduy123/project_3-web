import { Course } from '@/pages/home'
import React from 'react'
import styleSheet from './index.scss'
import { Flex, Rate } from 'antd'
import Router from 'next/router'

interface Props {
  course: Course
}

const CourseCard = ({ course }: Props) => {
  const handleClickCourse = () => {
    Router.push(
      {
        query: { id: course.courseId.toString() },
        pathname: '/details',
      },
      '/details'
    )
  }

  return (
    <div className="course-card-container" onClick={handleClickCourse}>
      <img src="/static/img/default_course_img.png" />
      <div className="provider-name">{course.providerName}</div>
      <div className="course-name">{course.courseName}</div>
      <Flex gap={8} align="center">
        <Rate allowHalf value={parseFloat(course.averageRatings)} disabled />
        <div className="number-reviews">{course.numReviews}</div>
      </Flex>
      <div className="course-master-category">{course.masterCategories}</div>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
    </div>
  )
}

export default CourseCard
