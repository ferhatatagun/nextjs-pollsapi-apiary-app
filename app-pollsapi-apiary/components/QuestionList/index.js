// import Link from 'next/link'
// import BubblyButton from '../BubblyButton'
import { Row, Col, Card, Empty, Spin, Button, Skeleton } from 'antd'
import { useEffect, useState } from 'react'
import InternalLink from '../../components/InternalLink'

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

const QuestionList = ({ questions }) => {
  const [initLoading, setInitLoading] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (questions.length > 0) {
      setInitLoading(!initLoading)
      setLoading(!loading)
    }
  }, [questions])

  return (
    <Row>
      {/* <BubblyButton /> */}
      <Col xs={{ span: 20, offset: 1 }} lg={{ span: 20, offset: 2 }}>
        {initLoading ? (
          <div className="example">
            <Spin />
          </div>
        ) : questions.length > 0 ? (
          questions.map(({ url, question, published_at, choices }) => (
            <InternalLink
              href={{
                pathname: '/question',
                query: {
                  queryId: url.split('/')[2]
                }
              }}
              as={`/questions/${url.split('/')[2]}`}
              key={url.split('/')[2]}
            >
              <Card
                extra={<a>Detail</a>}
                title={question}
                key={url}
                style={{ width: '100%', marginTop: 16, cursor: 'pointer' }}
                loading={loading}
              >
                <div className="text--sm color--sec created-at--padding">
                  Created at:{' '}
                  {new Date(published_at).toLocaleDateString('en', options)}
                </div>
                <div className="text--sm color--sec">
                  Choices: {choices.length}
                </div>
              </Card>
            </InternalLink>
          ))
        ) : (
          <Empty />
        )}
      </Col>
    </Row>
  )
}

export default QuestionList
