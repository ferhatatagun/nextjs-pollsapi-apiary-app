import { Divider, Button, Menu, Dropdown, Row, Col, Space } from 'antd'
import { useState } from 'react'

const Footer = () => {
  const [size, setSize] = useState('small')
  const menu = () => (
    <Menu>
      <Menu.Item key="1">Github</Menu.Item>
      <Menu.Item key="2">Documentation</Menu.Item>
    </Menu>
  )

  return (
    <>
      <br />
      <Divider orientation="left" plain>
        # pollsapi-apiary
      </Divider>
      <Row
        justify="end"
        align="middle"
        style={{
          padding: 24
        }}
      >
        <Space size={size}>
          <Row>
            <Col justify="center" align="center" justify="center">
              <p>Next js application made with pollsapi of apiary</p>
              <Space>
                <Button type="primary">Gitlab</Button>
                <Dropdown.Button overlay={menu}>Nextjs</Dropdown.Button>
              </Space>
            </Col>
          </Row>
        </Space>
      </Row>
    </>
  )
}

export default Footer
