import Layout from '../components/Layout'
import {
  Row,
  Col,
  Button,
  Card,
  Empty,
  Spin,
  Checkbox,
  Divider,
  Space
} from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from 'antd/lib/form/Form'
// import { postSingleQuestion, vote } from '../utils/api'

const Question = () => {
  const router = useRouter()
  const queryString = require('query-string')
  const queryId = router.asPath.split('=')[1]
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [sendVote, setSendVote] = useState(false)
  const [checkboxState, setCheckboxState] = useState(false)
  const [choices, setChoises] = useState([])

  const fetchData = () => {
    axios
      .get('https://polls.apiblueprint.org/questions/' + queryId)
      .then((res) => {
        setError(false)
        setData(res.data)
        setChoises(res.data.choices)
      })
      .catch(() => {
        setError(true)
      })
  }

  const vote = () => {
    setSendVote(true)
  }

  useEffect(() => {
    fetchData(queryId)
  }, [])

  function setCheckbox(key) {
    // setCheckboxState(key)
    console.log(key)
  }
  return (
    <Layout title={'Question'} subtitle={data !== null ? data.question : false}>
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={data !== null ? data.question : false}
        extra={
          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={sendVote}
            onClick={() => vote()}
          >
            Send Vote
          </Button>
        }
      >
        {choices.length === 0 ? (
          <Empty />
        ) : (
          <Form onChange={(item) => setCheckbox(item)}>
            {choices.map((index, key) => (
              <Col width={10} key={key}>
                <Row container justify="center" columns={3}>
                  <Space>
                    <Checkbox
                      // onChange={setCheckbox(key)}
                      name={'check' + key}
                      checked={checkboxState === key ? true : false}
                    ></Checkbox>
                    <b>{index.choice}</b> : {index.votes}
                  </Space>
                  <Divider dashed />
                </Row>
              </Col>
            ))}
          </Form>
        )}
      </Card>
    </Layout>
  )
}

export default Question
