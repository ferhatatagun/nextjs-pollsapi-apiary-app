import React, { useState } from 'react'
import {
  Form,
  Result,
  Row,
  message,
  Col,
  Divider,
  Input,
  Modal,
  Button,
  Space
} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { SmileOutlined } from '@ant-design/icons'
import axios from 'axios'
import InternalLink from '../../components/InternalLink'

const NewQuestion = () => {
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newQuestion, setNewQuestion] = useState(null)
  const [newQuestioModal, setNewQuestionModal] = useState(null)
  const key = 'updatable'

  const onFinish = async (values) => {
    setLoading(true)
    const body = values
    await axios
      .post('https://polls.apiblueprint.org/questions', body)
      .then((result) => {
        message.loading({ content: 'Loading....', key })
        setNewQuestion(result.data)
        setTimeout(() => {
          message.success({
            content: 'The question has been created!',
            key,
            duration: 2
          })
          setVisible(false)
        }, 1000)
      })
      .catch((err) => {
        message.loading({ content: 'Loading....', key })
        setTimeout(() => {
          message.warning({ content: err, key, duration: 2 })
        }, 1000)
      })
    setLoading(false)
  }

  const resultText = () => {
    var text = newQuestion.question + ' '
    newQuestion.choices.forEach((item) => {
      text += item.choice + ' '
    })
    text += ' oluşturuldu'
    return text
  }

  const showModal = () => {
    setVisible(true)
  }

  const newQuestionModalHandle = () => {
    setNewQuestionModal(false)
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
        width={600}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setVisible(false)
            }}
          >
            Cancel
          </Button>
        ]}
      >
        <Form
          name="dynamic_form_nest_item"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            style={{ marginBottom: 10, width: '100%' }}
            label="Question "
            name="question"
            required={true}
            rules={[{ required: true, message: 'Please input your question!' }]}
          >
            <Input allowClear={true} placeholder="Question" />
          </Form.Item>
          <Form.List
            name="choices"
            rules={[
              {
                validator: async (_, choices) => {
                  if (!choices || choices.length < 2) {
                    return Promise.reject(new Error('At least 2 choice'))
                  }
                }
              }
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    size={24}
                    required={true}
                    style={{ width: '100%', marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name]}
                      validateTrigger={['onChange', 'onBlur']}
                      style={{
                        display: 'flex',
                        width: 500,
                        marginBottom: 8
                      }}
                      fieldKey={[field.fieldKey]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: 'Please input Choice or delete this field.'
                        }
                      ]}
                    >
                      <Input placeholder="Chocie" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => {
                      add()
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Chocie
                  </Button>
                  <Form.ErrorList errors={errors} />
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type="primary"
              loading={loading}
              style={{ width: '100%', height: 40 }}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* <Modal
        title="Successfuly Question"
        width={500}
        visible={newQuestion === null ? false : true}
        onOk={newQuestionModalHandle}
      >
        {newQuestion !== null ? (
          <Result
            icon={<SmileOutlined />}
            title={() => {
              resultText()
            }}
            extra={
              <Button type="primary">
                <InternalLink
                  href={{
                    pathname: '/question',
                    query: {
                      queryId: newQuestion.url.split('/')[2]
                    }
                  }}
                  as={`/questions/${newQuestion.url.split('/')[2]}`}
                  key={newQuestion.url.split('/')[2]}
                >
                  Go vote
                </InternalLink>
              </Button>
            }
          />
        ) : null}
      </Modal> */}
    </>
  )
}

export default NewQuestion
