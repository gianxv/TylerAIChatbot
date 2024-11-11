'use client'

import { Typography, Input, List, Button, Space, Popconfirm, Empty } from 'antd'
import {
  DeleteOutlined,
  MessageOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
const { Title, Text } = Typography
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function ChatHistoryPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [searchQuery, setSearchQuery] = useState('')

  // Fetch conversations
  const { data: conversations, refetch } = Api.conversation.findMany.useQuery({
    where: {
      userId: user?.id,
      OR: [
        { title: { contains: searchQuery, mode: 'insensitive' } },
        {
          messages: {
            some: { content: { contains: searchQuery, mode: 'insensitive' } },
          },
        },
      ],
    },
    include: {
      messages: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  // Delete conversation mutation
  const { mutateAsync: deleteConversation } =
    Api.conversation.delete.useMutation()

  const handleDelete = async (conversationId: string) => {
    try {
      await deleteConversation({
        where: { id: conversationId },
      })
      enqueueSnackbar('Conversation deleted successfully', {
        variant: 'success',
      })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to delete conversation', { variant: 'error' })
    }
  }

  const handleContinueChat = (conversationId: string) => {
    router.push(`/chat/${conversationId}`)
  }

  return (
    <PageLayout layout="narrow">
      <div style={{ padding: '24px' }}>
        <Title level={2}>Chat History</Title>
        <Text type="secondary">
          View and manage your previous conversations with the chatbot
        </Text>

        <div style={{ marginTop: '24px', marginBottom: '24px' }}>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
        </div>

        {conversations?.length === 0 ? (
          <Empty description="No conversations found" />
        ) : (
          <List
            dataSource={conversations}
            renderItem={conversation => (
              <List.Item
                key={conversation.id}
                actions={[
                  <Button
                    key="continue"
                    type="primary"
                    icon={<MessageOutlined />}
                    onClick={() => handleContinueChat(conversation.id)}
                  >
                    Continue
                  </Button>,
                  <Popconfirm
                    key="delete"
                    title="Delete this conversation?"
                    onConfirm={() => handleDelete(conversation.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger icon={<DeleteOutlined />}>
                      Delete
                    </Button>
                  </Popconfirm>,
                ]}
              >
                <List.Item.Meta
                  title={conversation.title || 'Untitled Conversation'}
                  description={
                    <Space direction="vertical">
                      <Text type="secondary">
                        Created:{' '}
                        {dayjs(conversation.createdAt).format(
                          'MMMM D, YYYY h:mm A',
                        )}
                      </Text>
                      <Text type="secondary">
                        Messages: {conversation.messages?.length || 0}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
            style={{
              background: 'white',
              borderRadius: '8px',
              padding: '16px',
            }}
          />
        )}
      </div>
    </PageLayout>
  )
}
