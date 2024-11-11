'use client'

import { Typography, Card, Row, Col, Button, Modal, Input, Space } from 'antd'
import {
  BookOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text, Paragraph } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function TopicsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState<string>('')
  const [newQuestion, setNewQuestion] = useState('')

  // Fetch topics with their questions
  const { data: topics } = Api.topic.findMany.useQuery({
    include: {
      topicQuestions: true,
    },
  })

  // Mutation for creating new questions
  const { mutateAsync: createQuestion } = Api.topicQuestion.create.useMutation()

  const handleStartConversation = (topicId: string) => {
    router.push(`/home?topicId=${topicId}`)
  }

  const handleAddQuestion = async () => {
    if (!user) {
      enqueueSnackbar('Please login to add questions', { variant: 'error' })
      return
    }

    try {
      await createQuestion({
        data: {
          question: newQuestion,
          isPopular: false,
          topicId: selectedTopic,
          userId: user.id,
        },
      })
      enqueueSnackbar('Question added successfully', { variant: 'success' })
      setIsModalVisible(false)
      setNewQuestion('')
    } catch (error) {
      enqueueSnackbar('Failed to add question', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2}>Hawaii Information Topics</Title>
          <Paragraph>
            Browse through our curated topics about Hawaii or contribute your
            own questions
          </Paragraph>
        </div>

        <Row gutter={[16, 16]}>
          {topics?.map(topic => (
            <Col xs={24} sm={12} md={8} key={topic.id}>
              <Card
                title={
                  <Space>
                    <BookOutlined />
                    <Text strong>{topic.name}</Text>
                    {topic.isPopular && <Text type="success">(Popular)</Text>}
                  </Space>
                }
                actions={[
                  <Button
                    key="start"
                    type="primary"
                    onClick={() => handleStartConversation(topic.id)}
                  >
                    Start Conversation
                  </Button>,
                  <Button
                    key="add"
                    onClick={() => {
                      setSelectedTopic(topic.id)
                      setIsModalVisible(true)
                    }}
                    icon={<PlusOutlined />}
                  >
                    Add Question
                  </Button>,
                ]}
              >
                <Paragraph>{topic.description}</Paragraph>
                <Title level={5}>Popular Questions:</Title>
                <ul style={{ paddingLeft: 20 }}>
                  {topic.topicQuestions
                    ?.filter(q => q.isPopular)
                    .map(question => (
                      <li key={question.id}>
                        <Space>
                          <QuestionCircleOutlined />
                          <Text>{question.question}</Text>
                        </Space>
                      </li>
                    ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>

        <Modal
          title="Add New Question"
          open={isModalVisible}
          onOk={handleAddQuestion}
          onCancel={() => setIsModalVisible(false)}
          okText="Add Question"
          cancelText="Cancel"
        >
          <Input.TextArea
            rows={4}
            placeholder="Type your question here..."
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
          />
        </Modal>
      </Space>
    </PageLayout>
  )
}
