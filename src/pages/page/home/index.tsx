import React from 'react'
import { connect } from 'react-redux'

import Layout from '@/layouts/MainLayout'
import { RootState } from '@/store'
import { AuthState } from '@/reducers/reducers'

interface Props {
  auth: AuthState
}

const Home = (props: Props) => {
  return (
    <Layout>
      <div>Home</div>
    </Layout>
  )
}

function mapStateToProps(state: RootState) {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(Home)
