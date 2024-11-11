'use client'

import { Button, Card, Select, Space, Typography, Row, Col, Empty } from 'antd'
import { DeleteOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Prisma } from '@prisma/client'
const { Title, Text } = Typography
type SavedItemWithMessage = Prisma.SavedItemGetPayload<{
  include: { message: true }
}>
import { useUserContext } from '@/core/context'
import { useRouter, useParams } from 'next/navigation'
import { useUploadPublic } from '@/core/hooks/upload'
import { useSnackbar } from 'notistack'
import dayjs from 'dayjs'
import { Api } from '@/core/trpc'
import { PageLayout } from '@/designSystem'

export default function SavedItemsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const { user } = useUserContext()
  const { enqueueSnackbar } = useSnackbar()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const { data: savedItems, refetch } = Api.savedItem.findMany.useQuery({
    where: { userId: user?.id },
    include: { message: true },
    orderBy: { createdAt: 'desc' },
  })

  const { mutateAsync: deleteSavedItem } = Api.savedItem.delete.useMutation()
  const { mutateAsync: updateSavedItem } = Api.savedItem.update.useMutation()

  const categories = Array.from(
    new Set(savedItems?.map(item => item.category).filter(Boolean)),
  )

  const handleDelete = async (itemId: string) => {
    try {
      await deleteSavedItem({ where: { id: itemId } })
      enqueueSnackbar('Item deleted successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to delete item', { variant: 'error' })
    }
  }

  const handleShare = async (item: SavedItemWithMessage) => {
    if (!item.shareLink) {
      const shareLink = `${window.location.origin}/shared/${item.id}`
      try {
        await updateSavedItem({
          where: { id: item.id },
          data: { shareLink },
        })
        await navigator.clipboard.writeText(shareLink)
        enqueueSnackbar('Share link copied to clipboard', {
          variant: 'success',
        })
        refetch()
      } catch (error) {
        enqueueSnackbar('Failed to generate share link', { variant: 'error' })
      }
    } else {
      await navigator.clipboard.writeText(item.shareLink)
      enqueueSnackbar('Share link copied to clipboard', { variant: 'success' })
    }
  }

  const handleCategoryChange = async (itemId: string, category: string) => {
    try {
      await updateSavedItem({
        where: { id: itemId },
        data: { category },
      })
      enqueueSnackbar('Category updated successfully', { variant: 'success' })
      refetch()
    } catch (error) {
      enqueueSnackbar('Failed to update category', { variant: 'error' })
    }
  }

  const filteredItems = savedItems?.filter(item =>
    selectedCategory === 'all' ? true : item.category === selectedCategory,
  )

  return (
    <PageLayout layout="narrow">
      <Space direction="vertical" style={{ width: '100%' }} size="large">
        <Title level={2}>Saved Items</Title>
        <Text>Organize and manage your saved chatbot responses</Text>

        <Space style={{ marginBottom: 16 }}>
          <Select
            style={{ width: 200 }}
            value={selectedCategory}
            onChange={setSelectedCategory}
            options={[
              { value: 'all', label: 'All Categories' },
              ...categories.map(cat => ({ value: cat, label: cat })),
            ]}
          />
        </Space>

        {!filteredItems?.length ? (
          <Empty description="No saved items found" />
        ) : (
          <Row gutter={[16, 16]}>
            {filteredItems?.map(item => (
              <Col xs={24} sm={24} md={12} lg={8} key={item.id}>
                <Card
                  title={item.title || 'Saved Response'}
                  extra={
                    <Space>
                      <ShareAltOutlined
                        onClick={() => handleShare(item)}
                        style={{ cursor: 'pointer' }}
                      />
                      <DeleteOutlined
                        onClick={() => handleDelete(item.id)}
                        style={{ cursor: 'pointer', color: '#ff4d4f' }}
                      />
                    </Space>
                  }
                >
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>{item.message.content}</Text>
                    <Select
                      style={{ width: '100%' }}
                      value={item.category || 'uncategorized'}
                      onChange={value => handleCategoryChange(item.id, value)}
                      options={[
                        { value: 'hiking', label: 'Hiking' },
                        { value: 'events', label: 'Events' },
                        { value: 'attractions', label: 'Attractions' },
                        { value: 'uncategorized', label: 'Uncategorized' },
                      ]}
                    />
                    <Text type="secondary">
                      Saved on {dayjs(item.createdAt).format('MMMM D, YYYY')}
                    </Text>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </PageLayout>
  )
}
