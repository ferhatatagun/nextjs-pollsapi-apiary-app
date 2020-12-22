import Layout from '../components/Layout'
import {
  Row,
  Col,
  Button,
  Card,
  Typography,
  Empty,
  Space,
  notification,
  Checkbox,
  Divider,
  Result
} from 'antd'
const { Text } = Typography

import { SendOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Form, { useForm } from 'antd/lib/form/Form'

const Question = () => {
  const router = useRouter()
  const queryId = router.asPath.split('=')[1]
  const [data, setData] = useState(null)
  const [error, setError] = useState("false")
  const [sendVote, setSendVote] = useState(false)
  const [isSendVoteStatus, setIsSendVoteStatus] = useState(false)
  const [isSendVoteItem, setIsSendVoteItem] = useState('')

  const [selectedCheckbox, setSelectedCheckbox] = useState(false)
  const [choices, setChoises] = useState([])

  const { handleSubmit, register, getValues } = useForm()

  const fetchData = () => {
    axios
      .get('https://polls.apiblueprint.org/questions/' + queryId)
      .then((res) => {
        setError(false)
        setData(res.data)
        setChoises(res.data.choices)
      })
      .catch((err) => {
        setError(err)
      })
  }

  useEffect(() => {
    fetchData(queryId)
  }, [])

  function setCheckbox(key, totalVote) {
    setSelectedCheckbox(key.target.id)
    //TODO:remove Code
    setIsSendVoteItem(
      document.getElementById(key.target.id).parentElement.parentElement
        .parentElement.parentElement.textContent
    )
    totalVote = document
      .getElementById(key.target.id)
      .parentElement.parentElement.parentElement.parentElement.textContent.split(
        ':'
      )[1]
      .replace('(', '')
      .replace(')', '')
      .trim()

    notification.open({
      message: 'Total Votes',
      description:
        'The option you selected received a total of ' + totalVote + ' votes.'
    })
  }

  function vote() {
    setSendVote(true)
    axios
      .post(`https://polls.apiblueprint.org${selectedCheckbox}`)
      .then((result) => {
        setIsSendVoteStatus(true)
        setSendVote(false)
      })
      .catch((err) => {})
  }

  return (
    <Layout title={'Question'} subtitle={data !== null ? data.question : false}>
      {error && <div className="error"> {error} </div>}
      <Card
        style={{ marginTop: 16 }}
        type="inner"
        title={data !== null ? data.question : false}
        extra={
          <Button
            type="primary"
            icon={<SendOutlined />}
            loading={sendVote}
            onClick={() => vote(data.url)}
          >
            Send Vote
          </Button>
        }
      >
        {choices.length === 0 ? (
          <Empty />
        ) : isSendVoteStatus ? (
          <Result
            status="success"
            title={data.question}
            subTitle={'You made this choice : ' + isSendVoteItem}
            extra={[
              <Button
                onClick={() => {
                  setIsSendVoteStatus(false)
                  fetchData()
                }}
                key="buy"
              >
                Vote Again
              </Button>
            ]}
          />
        ) : (
          <Form onChange={(item) => setCheckbox(item)}>
            <Row container justify="center" align="center">
              {choices.map((index, key) => (
                <Col span={24} justify="center" align="center" key={key}>
                  <Divider dashed />
                  <Space>
                    <Checkbox
                      id={index.url}
                      text={index.choice}
                      vote={index.votes}
                      ref={register}
                      checked={selectedCheckbox === index.url ? true : false}
                    ></Checkbox>
                    <b>{index.choice}</b>
                    <Text keyboard>Total votes : ({index.votes})</Text>
                  </Space>
                  <Divider dashed />
                </Col>
              ))}
            </Row>
          </Form>
        )}
      </Card>
    </Layout>
  )
}

export default Question
