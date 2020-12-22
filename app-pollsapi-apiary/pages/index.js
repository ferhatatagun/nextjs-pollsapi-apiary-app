import Layout from '../components/Layout'
import ProgressLoader from '../components/ProgressLoader'
import NewQuestion from '../components/NewQuestion'
import QuestionList from '../components/QuestionList'
import { useState, useEffect } from 'react'
import { getEveryQuestion } from '../utils/api'

const Index = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    async function getInitialProps() {
      const res = (await getEveryQuestion()).data
      getEveryQuestion()
        .then((res) => {
          setData(res.data)
        })
        .catch((err) => setErrors(err))
    }
    data !== undefined ? getInitialProps() : null
  }, [error])

  return (
    <Layout title="Question List">
      <ProgressLoader />
      <NewQuestion />
      <QuestionList questions={data} isError={error} />
    </Layout>
  )
}

export default Index
