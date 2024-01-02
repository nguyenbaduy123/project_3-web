import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Layout from '@/layouts/MainLayout'
import { RootState } from '@/store'
import { AuthState } from '@/reducers/reducers'
import { api } from '@/api/Api'
import CourseCard from '@/components/CourseCard'
import styleSheet from './index.scss'

interface Props {
  auth: AuthState
}

interface Category {
  categoryId: number
  categoryName: string
  parentCategory: string
}

export interface Course {
  courseId: number
  clusterId: string
  courseName: string
  link: string
  duration: string
  level: string
  description: string
  numEnrolled: string
  numReviews: string
  price: string
  reviewUrl: string
  instructorId: string
  providerName: string
  averageRatings: string
  masterCategories: string
  source: string
  categories: string
}

const Home = (props: Props) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [courses, setCourses] = useState<{ [key: number]: Course[] }>({})
  const [masterCategories, setMasterCategories] = useState<string[]>([])

  useEffect(() => {
    getRandomCategories()
    getMasterCategories()
  }, [])

  useEffect(() => {
    if (!categories.length) return
    categories.map(getCourseByCategory)
  }, [categories])

  const getRandomCategories = async () => {
    try {
      const resp = await api.get('/category/random')
      setCategories(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getMasterCategories = async () => {
    try {
      const resp = await api.get('/category/getMaster')
      setMasterCategories(resp.data)
    } catch (error) {}
  }

  const getCourseByCategory = async (category: Category) => {
    try {
      const resp = await api.get(`/course/category/${category.categoryName}/1`)
      setCourses((prev) => ({ ...prev, [category.categoryId]: resp.data }))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout currentTabId="home">
      <div className="home-container">
        <div>
          {!!categories.length &&
            categories.map((category) => {
              if (!courses[category.categoryId]) return <></>
              return (
                <div>
                  <h3>{category.categoryName}</h3>
                  <div className="list-course-container">
                    {courses[category.categoryId].map((course) => (
                      <CourseCard course={course} />
                    ))}
                  </div>
                </div>
              )
            })}
        </div>

        <div className="master-categories">
          {!!masterCategories.length &&
            masterCategories.map((category) => (
              <div className="master-category">{category}</div>
            ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: styleSheet }} />
    </Layout>
  )
}

function mapStateToProps(state: RootState) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Home)
