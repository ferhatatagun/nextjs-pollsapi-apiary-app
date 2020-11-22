import NavBar from '../Nav'
import { Row, Col, Divider } from 'antd'
import { PageHeader } from 'antd'

const Header = ({ title, subtitle }) => {
  return (
    <Row justify="flex-start" align="top">
      <Col span={12}>
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title={title}
          subTitle={subtitle ? subtitle : null}
        />
      </Col>
    </Row>
  )
}
export default Header
