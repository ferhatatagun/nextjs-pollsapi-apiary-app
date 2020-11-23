import { useEffect, useState } from 'react'
import { Row, Col, Card, Empty, Spin, Space } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import InternalLink from '../../components/InternalLink'
import moment from 'moment'

const options = {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
}

const QuestionList = ({ questions, error }) => {
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
          <Spin style={{ width: '100%' }} />
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
                extra={
                  <div type="link" href="#">
                    <Space>
                      <ArrowRightOutlined />
                      Go Vote
                    </Space>
                  </div>
                }
                title={question}
                key={url}
                style={{ width: '100%', marginTop: 16, cursor: 'pointer' }}
                loading={loading}
              >
                <div className="text--sm color--sec created-at--padding">
                  Creation Date:{' '}
                  {moment(published_at).startOf('hour').fromNow()}
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
        {error ? <Spin /> : null}
      </Col>
    </Row>
  )
}

export default QuestionList
