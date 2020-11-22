import React, { useState } from 'react'
import { Row, Col, Divider, Input, Modal, Button } from 'antd'
const { TextArea } = Input

const NewQuestion = () => {
  const [visible, setVisible] = useState(false)
  const [question, setQuestion] = useState('')
  const [choices, setChocies] = useState(null)

  const showModal = () => {
    setVisible(true)
  }

  const onChange = ({ target: { value } }) => {
    setQuestion(value)
  }

  const sendQuestion = () => {
    setVisible(false)

    var request = new XMLHttpRequest()

    request.open('POST', 'https://polls.apiblueprint.org/questions?')

    request.setRequestHeader('Content-Type', 'application/json')

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status)
        console.log('Headers:', this.getAllResponseHeaders())
        console.log('Body:', this.responseText)
      }
    }

    var body =
      '{\
        "question": "1231231312 Favourite programming language?",\
        "choices": [\
          "Swift",\
          "Python",\
          "Objective-C",\
          "Ruby"\
        ]\
      }'

    request.send(body)
  }

  return (
    <>
      <Divider orientation="center">
        You know don't try asking questions
      </Divider>
      <Row justify="center" span={12}>
        <Col justify="center">
          <Button span={20} onClick={showModal}>
            New Question
          </Button>
        </Col>
      </Row>
      <Divider orientation="center">ask another question</Divider>
      <Modal
        title="New Question"
        centered
        visible={visible}
        onOk={() => sendQuestion()}
        onCancel={() => setVisible(false)}
      >
        <TextArea
          value={question}
          onChange={onChange}
          placeholder="Question"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
        <div style={{ margin: '24px 0' }} />
      </Modal>
    </>
  )
}

export default NewQuestion
