import Layout from '../components/Layout'
import { Row, Col, Button, Card, Empty, Spin, Checkbox, Divider } from 'antd'
import { PoweroffOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
// import { postSingleQuestion, vote } from '../utils/api'

const Question = ({ id }) => {
  const router = useRouter()
  const queryString = require('query-string')
  const queryId = router.asPath.split('=')[1]
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [sendVote, setSendVote] = useState(false)
  const [checkboxState, setCheckboxState] = useState(false)

  const fetchData = () => {
    axios
      .get('https://polls.apiblueprint.org/questions/' + queryId)
      .then((res) => {
        setError(false)
        setData(res.data)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchData(queryId)
  }, [])

  return (
    <Layout title={'Question'} subtitle={data !== null ? data.question : false}>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={data !== null ? data.question : false}
        extra={
          <Button
            type="primary"
            icon={<PoweroffOutlined />}
            loading={sendVote}
            onClick={() => setSendVote(true)}
          >
            Send Vote
          </Button>
        }
      >
        {data === null && queryId === undefined ? (
          <Empty />
        ) : !loading ? (
          data.choices.map((index, key) => (
            <Col width={10} key={key}>
              <Row container justify="center" columns={3}>
                <Checkbox
                  onChange={setCheckboxState(key)}
                  checked={checkboxState === key ? true : false}
                ></Checkbox>
                <b>{index.choice}</b> : {index.votes}
                <Divider dashed />
              </Row>
            </Col>
          ))
        ) : (
          <Spin />
        )}
      </Card>
    </Layout>
  )
}

export default Question
