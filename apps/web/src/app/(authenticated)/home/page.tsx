'use client'

import {
  CommentOutlined,
  MessageOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { Api } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'
import { useAuthentication } from '@web/modules/authentication'
import { Card, Col, Row, Spin, Typography } from 'antd'
import { useParams, useRouter } from 'next/navigation'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'

import BusinessLocationsMap from './map/index'


const { Title, Text } = Typography




export default function HomePage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(true)
  const [overallStars, setOverallStars] = useState(0)
  const [overallReviews, setOverallReviews] = useState(0)
  const [overallReplies, setOverallReplies] = useState(0)

  const [locations, setLocations] = useState<string[]>([])    // locations can be replaced by addr below 

  const addr: string[] = ['1600 Amphitheatre Parkway, Mountain View, CA 94043, USA']  // Sample address for testing

  useEffect(() => {
    if (!userId) return

    const fetchData = async () => {
      try {
        const businessAccounts = await Api.BusinessAccount.findManyByUserId(
          userId,
          {
            includes: [
              'locations',
              'locations.reviews',
              'locations.reviews.replys',
            ],
          },
        )
        let stars = 0
        let reviews = 0
        let replies = 0
        let locs: string[] = []

        businessAccounts.forEach(account => {
          account.locations?.forEach(location => {
            location.reviews?.forEach(review => {
              stars += 1 // Assuming each review is a star
              reviews += 1
              replies += review.replys?.length || 0
            })
            locs.push(location.address) // Add location address to locs
          })
        })

        setOverallStars(stars)
        setOverallReviews(reviews)
        setOverallReplies(replies)
        setLocations(locs) // Set locations
      } catch (error) {
        enqueueSnackbar('Failed to fetch data', { variant: 'error' })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Dashboard</Title>
      <Text>Summary of your business performance</Text>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <StarOutlined style={{ fontSize: '24px', color: '#fadb14' }} />
              <Title level={4}>{overallStars}</Title>
              <Text>Overall Stars</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <MessageOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
              <Title level={4}>{overallReviews}</Title>
              <Text>Overall Reviews</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card>
              <CommentOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
              <Title level={4}>{overallReplies}</Title>
              <Text>Overall Replies</Text>
            </Card>
          </Col>
        </Row>
      )}
      
      {/* Add Google Maps integration here */}

      <Title level={2}>Business Locations</Title>

      {/* Using Sample Locations */}

      <BusinessLocationsMap address={addr} />

    </PageLayout>
  )
}
