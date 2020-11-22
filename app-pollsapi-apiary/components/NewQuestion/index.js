import React, { useState } from 'react'
import { Row, Col, Divider, Modal, Button } from 'antd'

const NewQuestion = () => {
  const [visible, setVisible] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const handleCancel = (e) => {
    setVisible(false)
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
        title="Vertically centered modal dialog"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </>
  )
}

export default NewQuestion
