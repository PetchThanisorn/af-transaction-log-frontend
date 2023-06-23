import React from 'react'
import {SelectOutlined, DeleteTwoTone, DownOutlined} from "@ant-design/icons";
import { Button, List, message, Upload } from "antd";
import { Space, Table, Tag , Dropdown, Typography } from "antd";
import Home from '../Home/Home';
import './Select.css';

function Select() {
    

    //item Dropdown
    const items = [
        {
          key: '1',
          label: '2021',
        },
        {
          key: '2',
          label: '2022',
        },
        {
          key: '3',
          label: '2023',
        },
      ];

      const itemss = [
        {
          key: '1',
          label: 'มกราคม',
        },
        {
          key: '2',
          label: 'กุมภาพันธ์',
        },
        {
          key: '3',
          label: 'มีนาคม',
        },
        {
          key: '4',
          label: 'เมษายน',
        },
        {
          key: '5',
          label: 'พฤษภาคม',
        },
        {
          key: '6',
          label: 'มิถุนายน',
        },
        {
          key: '7',
          label: 'กรกฎาคม',
        },
        {
          key: '8',
          label: 'สิงหาคม',
        },
        {
          key: '9',
          label: 'กันยายน',
        },
        {
          key: '10',
          label: 'ตุลาคม',
        },
        {
          key: '11',
          label: 'พฤศจิกายน',
        },
        {
          key: '12',
          label: 'ธันวาคม',
        },
      ];
    
    const columns = [
        {
          title: "Trans Date",
          dataIndex: "TransDate",
          key: "TransDate",
        },
        {
          title: "Effect Date",
          dataIndex: "EffectDate",
          key: "EffectDate",
        },
        {
          title: "Description",
          dataIndex: "Description",
          key: "Description",
        },
        {
          title: "ChequeNo.",
          dataIndex: "ChequeNo.",
          key: "ChequeNo.",
        },
        {
          title: "Debit",
          dataIndex: "Debit",
          key: "Debit",
        },
        {
          title: "Credit",
          dataIndex: "Credit",
          key: "Credit",
        },
        {
          title: "Balance",
          dataIndex: "Balance",
          key: "Balance",
        },
        {
          title: "Channel",
          dataIndex: "Channel",
          key: "Channel",
        },
    
      ];

      

    return (
        <div className="Select">
          <Dropdown menu={{
          items,
          selectable: true,
          defaultSelectedKeys: ['1'],
          }} >
          <Typography.Link>
          <Space>
          เลือกปี
          <DownOutlined />
          </Space>
          </Typography.Link>
          </Dropdown>
          <>  </>
          <Dropdown menu={{
          itemss,
          selectable: true,
          defaultSelectedKeys: ['1'],
          }} >
          <Typography.Link>
          <Space>
          เลือกเดือน
          <DownOutlined />
          </Space>
          </Typography.Link>
          </Dropdown>
          <>  </>
          <Button icon={<SelectOutlined />} onClick={() => {}}>
            ค้นหา
          </Button>
          <Table dataSource={""} columns={columns} />
          <Button icon={<DeleteTwoTone />} onClick={() => {}}>
            Remove
          </Button>
        </div>
    );
}

export default Select