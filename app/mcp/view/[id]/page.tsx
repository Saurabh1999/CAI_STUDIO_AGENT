'use client';
import React, { useEffect, useState } from 'react';
import { Button, Typography, Layout, Alert, Dropdown, Space, MenuProps, Modal, Spin } from 'antd';
import { useParams, useSearchParams } from 'next/navigation';
import CommonBreadCrumb from '@/app/components/CommonBreadCrumb';
import { useRouter } from 'next/navigation';
import { useGlobalNotification } from '@/app/components/Notifications';
import { MCPTemplate } from '@/studio/proto/agent_studio';
import { DeleteOutlined, DownOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  useRemoveMcpTemplateMutation,
  useGetMcpTemplateQuery,
  useUpdateMcpTemplateMutation,
} from '../../mcpTemplatesApi';
import McpTemplateView from '@/app/components/McpTemplateView';
import { useImageAssetsData } from '@/app/lib/hooks/useAssetData';
const { Title } = Typography;

const DeleteMcpTemplateModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  mcpTemplateDetails: MCPTemplate | undefined;
  onDelete: () => Promise<void>;
}> = ({ isOpen, onClose, mcpTemplateDetails, onDelete }) => {
  return (
    <Modal
      title={`Are you sure you'd like to delete ${mcpTemplateDetails?.name}?`}
      open={isOpen}
      onCancel={onClose}
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelText="Cancel"
      onOk={onDelete}
    />
  );
};

const McpTemplateViewPage: React.FC = () => {
  const router = useRouter();
  const notificationApi = useGlobalNotification();
  const params = useParams();
  const searchParams = useSearchParams();
  const [removeMcpTemplate] = useRemoveMcpTemplateMutation();
  const [updateMcpTemplate] = useUpdateMcpTemplateMutation();
  const mcpTemplateId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const isEditMode = searchParams.get('edit') === 'true';

  const {
    data: mcpTemplate,
    isLoading: isMcpTemplateLoading,
    refetch: refetchMcpTemplate,
  } = useGetMcpTemplateQuery({
    mcp_template_id: mcpTemplateId || '',
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [mcpName, setMcpName] = useState<string>(mcpTemplate?.name || '');

  const { imageData: iconsData } = useImageAssetsData(mcpTemplate ? [mcpTemplate.image_uri] : []);

  useEffect(() => {
    if (mcpTemplate) {
      setMcpName(mcpTemplate.name || '');
    }
  }, [mcpTemplate]);

  if (!mcpTemplateId) {
    return (
      <Alert
        message="Error"
        description="No valid MCP Template ID provided in the route."
        type="error"
        showIcon
      />
    );
  }

  if (isMcpTemplateLoading) {
    return (
      <Layout
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </Layout>
    );
  }

  if (!mcpTemplate) {
    return (
      <Alert
        message="Error"
        description="MCP Template not found."
        type="error"
        showIcon
        style={{
          margin: '16px',
        }}
      />
    );
  }

  const handleDelete = async () => {
    try {
      await removeMcpTemplate({ mcp_template_id: mcpTemplateId }).unwrap();
      notificationApi.success({
        message: 'Success',
        description: 'MCP Template successfully deleted',
        placement: 'topRight',
      });
      setIsDeleteModalOpen(false);
      router.push('/tools?section=mcp');
    } catch (err: any) {
      notificationApi.error({
        message: 'Error',
        description: err.message || 'Failed to delete MCP Template',
        placement: 'topRight',
      });
    }
  };

  const handleSave = async (updatedFields: Partial<any>) => {
    if (!mcpTemplateId) {
      notificationApi.error({
        message: 'Error',
        description: 'MCP Template ID is not available.',
        placement: 'topRight',
      });
      return;
    }

    try {
      notificationApi.info({
        message: 'Updating MCP Server',
        description: 'Updating MCP server details...',
        placement: 'topRight',
      });

      await updateMcpTemplate({
        mcp_template_id: mcpTemplateId,
        name: updatedFields.mcp_template_name || mcpTemplate?.name || '',
        type: mcpTemplate?.type || '',
        args: mcpTemplate?.args || [],
        env_names: mcpTemplate?.env_names || [],
        tmp_mcp_image_path: updatedFields.tmp_mcp_image_path || '',
      }).unwrap();

      notificationApi.success({
        message: 'MCP Server Updated',
        description: 'MCP server details have been successfully updated.',
        placement: 'topRight',
      });

      router.push('/tools?section=mcp'); // Redirect to /tools page
    } catch (err: any) {
      const errorMessage = err.data?.error || err.message || 'Failed to update the MCP server.';
      notificationApi.error({
        message: 'Error',
        description: errorMessage,
        placement: 'topRight',
      });
    }
  };

  const handleRefresh = () => {
    refetchMcpTemplate();
  };

  const actionMenuItems: MenuProps['items'] = [
    {
      key: 'view',
      label: (
        <Space>
          <EyeOutlined />
          View MCP Server
        </Space>
      ),
      disabled: !isEditMode,
    },
    {
      key: 'edit',
      label: (
        <Space>
          <EditOutlined />
          Edit MCP Server
        </Space>
      ),
      disabled: isEditMode,
    },
    {
      key: 'delete',
      label: (
        <Space>
          <DeleteOutlined />
          Deregister MCP Server
        </Space>
      ),
    },
  ];

  const handleActionMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (!mcpTemplateId) return;

    switch (key) {
      case 'view':
        router.push(`/mcp/view/${mcpTemplateId}`);
        break;
      case 'edit':
        router.push(`/mcp/view/${mcpTemplateId}?edit=true`);
        break;
      case 'delete':
        setIsDeleteModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ flex: 1, padding: '16px 24px 22px', flexDirection: 'column' }}>
      <CommonBreadCrumb
        items={[
          { title: 'Tool Catalog', href: '/tools?section=mcp' },
          { title: isEditMode ? 'Edit MCP Server' : 'View MCP Server' },
        ]}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#f1f1f1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={
                mcpTemplate?.image_uri
                  ? iconsData[mcpTemplate.image_uri] || '/mcp-icon.svg'
                  : '/mcp-icon.svg'
              }
              alt={mcpTemplate?.name}
              style={{
                width: '24px',
                height: '24px',
                objectFit: 'cover',
                borderRadius: '2px',
              }}
            />
          </div>
          <Title level={4} style={{ margin: 0 }}>
            {mcpName || 'Unknown MCP'}
          </Title>
        </div>

        {/* Action Menu */}
        <Dropdown
          menu={{ items: actionMenuItems, onClick: handleActionMenuClick }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button
            style={{
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            Actions <DownOutlined />
          </Button>
        </Dropdown>
      </div>
      <Layout style={{ marginTop: '20px' }}>
        <McpTemplateView
          mcpTemplateDetails={mcpTemplate}
          mode={isEditMode ? 'edit' : 'view'}
          onSave={handleSave}
          onRefresh={handleRefresh}
          setParentPageMcpName={setMcpName}
        />
      </Layout>
      <DeleteMcpTemplateModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        mcpTemplateDetails={mcpTemplate}
        onDelete={handleDelete}
      />
    </Layout>
  );
};

export default McpTemplateViewPage;
