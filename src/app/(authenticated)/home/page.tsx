'use client'

import {
  Typography,
  Input,
  Button,
  Card,
  List,
  Space,
  Divider,
  Row,
  Col,
} from 'antd'
import {
  SendOutlined,
  SaveOutlined,
  CompassOutlined,
  HistoryOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { Message, Topic } from '@prisma/client'
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function HomePage() {
  const router = useRouter()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [message, setMessage] = useState('')
  const [currentConversationId, setCurrentConversationId] = useState<string>('')

  // Fetch popular topics
  const { data: popularTopics } = Api.topic.findMany.useQuery({
    where: { isPopular: true },
    take: 3,
  })

  // Fetch recent conversations
  const { data: recentConversations, refetch: refetchConversations } =
    Api.conversation.findMany.useQuery({
      where: { userId: user?.id },
      include: { messages: true },
      orderBy: { updatedAt: 'desc' },
      take: 5,
    })

  // Mutations
  const createConversation = Api.conversation.create.useMutation()
  const createMessage = Api.message.create.useMutation()
  const generateAiResponse = Api.ai.generateText.useMutation()
  const saveMessage = Api.message.update.useMutation()

  const handleSendMessage = async () => {
    try {
      if (!message.trim()) return

      let conversationId = currentConversationId
      if (!conversationId) {
        const newConversation = await createConversation.mutateAsync({
          data: {
            userId: user?.id,
            title: 'Hawaii Chat',
          },
        })
        conversationId = newConversation.id
        setCurrentConversationId(conversationId)
      }

      // Save user message
      await createMessage.mutateAsync({
        data: {
          content: message,
          isFromBot: false,
          isSaved: false,
          conversationId,
        },
      })

      // Get AI response
      const aiResponse = await generateAiResponse.mutateAsync({
        prompt: `Question about Hawaii: ${message}`,
      })

      // Save AI response
      await createMessage.mutateAsync({
        data: {
          content: aiResponse.answer,
          isFromBot: true,
          isSaved: false,
          conversationId,
        },
      })

      setMessage('')
      refetchConversations()
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  const handleSaveMessage = async (messageId: string) => {
    try {
      await saveMessage.mutateAsync({
        where: { id: messageId },
        data: { isSaved: true },
      })
      enqueueSnackbar('Message saved successfully', { variant: 'success' })
      refetchConversations()
    } catch (error) {
      enqueueSnackbar('Failed to save message', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>Hawaii AI Assistant</Title>
      <Paragraph>
        Ask questions about Hawaii and get instant answers from our AI chatbot!
      </Paragraph>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div
                style={{
                  minHeight: '400px',
                  maxHeight: '400px',
                  overflowY: 'auto',
                }}
              >
                {recentConversations?.[0]?.messages?.map((msg: Message) => (
                  <Card
                    key={msg.id}
                    style={{ marginBottom: '8px' }}
                    size="small"
                  >
                    <Space
                      align="start"
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <Text strong>
                        {msg.isFromBot ? 'AI Assistant' : 'You'}
                      </Text>
                      {msg.isFromBot && !msg.isSaved && (
                        <Button
                          icon={<SaveOutlined />}
                          type="text"
                          onClick={() => handleSaveMessage(msg.id)}
                        />
                      )}
                    </Space>
                    <Paragraph>{msg.content}</Paragraph>
                  </Card>
                ))}
              </div>

              <Space.Compact style={{ width: '100%' }}>
                <TextArea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Ask about Hawaii..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                >
                  Send
                </Button>
              </Space.Compact>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={8}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Card
              title={
                <>
                  <CompassOutlined /> Popular Topics
                </>
              }
            >
              <List
                dataSource={popularTopics}
                renderItem={(topic: Topic) => (
                  <List.Item>
                    <Text>{topic.name}</Text>
                  </List.Item>
                )}
              />
            </Card>

            <Card
              title={
                <>
                  <HistoryOutlined /> Recent Chats
                </>
              }
              extra={
                <Button
                  type="link"
                  onClick={() => router.push('/chat-history')}
                >
                  View All
                </Button>
              }
            >
              <List
                dataSource={recentConversations?.slice(0, 3)}
                renderItem={conv => (
                  <List.Item>
                    <Text>{conv.title || 'Hawaii Chat'}</Text>
                  </List.Item>
                )}
              />
            </Card>

            <Button
              type="link"
              icon={<StarOutlined />}
              onClick={() => router.push('/saved-items')}
              block
            >
              View Saved Items
            </Button>
          </Space>
        </Col>
      </Row>
    </PageLayout>
  )
}
