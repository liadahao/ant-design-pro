import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import {Card, Table, Button, Divider,} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProductProfile.less';


@connect(({productProfile, loading}) => ({
  productProfile,
  loading: loading.effects['productProfile/fetchProduct'],
}))
class ProductProfile extends Component {
  componentDidMount() {
    const {dispatch, match} = this.props;
    const {params} = match;

    dispatch({
      type: 'productProfile/fetchProduct',
      payload: params,
    });
  }

  render() {
    const {productProfile: {list}, loading} = this.props;
    const skuColumns = [
      {
        title: '产品标题',
        dataIndex: 'productTitle',
        key: 'productTitle',
      },
      {
        title: 'Linkshare原价',
        dataIndex: 'productPrice',
        key: 'productPrice',
      },
      {
        title: 'Linkshare售价',
        dataIndex: 'productSale',
        key: 'productSale',
      },
      {
        title: '爬虫原价',
        dataIndex: 'crawlerProductPrice',
        key: 'crawlerProductPrice',
      },
      {
        title: '爬虫售价',
        dataIndex: 'crawlerProductSale',
        key: 'crawlerProductSale',
      },
      {
        title: '人工原价',
        dataIndex: 'manualProductPrice',
        key: 'manualProductPrice',
      },
      {
        title: '人工售价',
        dataIndex: 'manualProductSale',
        key: 'manualProductSale',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <Button icon="edit" type="primary" onClick={() => this.handleUpdateModalVisible(record)}>
              修改采信来源
            </Button>
            <Divider type="vertical"/>
            <Button icon="edit" type="primary" onClick={() => this.handleUpdateModalVisible(record)}>
              人工修改价钱
            </Button>
          </Fragment>
        ),
      },
    ];
    console.log(this.props);
    return (
      <PageHeaderWrapper title="产品详情页" loading={loading}>
        <Card bordered={false}>
          <div className={styles.title}>产品属性列表</div>
          <Table
            rowKey="id"
            style={{marginBottom: 24}}
            pagination={false}
            loading={loading}
            dataSource={list}
            columns={skuColumns}
            bordered
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default ProductProfile;
