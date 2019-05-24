import React, {Component, Fragment} from 'react';
import {connect} from 'dva';
import moment from 'moment';

import {
  Card,
  Table,
  Button,
  Divider,
  Modal,
  Radio,
  Input,
  Form,
  DatePicker,
  Select
} from 'antd';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ProductProfile.less';


const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const SelectOption = Select.Option;
const {Search, TextArea} = Input;
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

  showEditModal = item => {
    this.setState({
      visible: true,
      current: item,
    });
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    setTimeout(() => this.addBtn.blur(), 0);
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.setState({
        done: true,
      });
      dispatch({
        type: 'list/submit',
        payload: { id, ...fieldsValue },
      });
    });
  };

  render() {
    const {productProfile: {list}, loading} = this.props;
    const {
      form: {getFieldDecorator},
    } = this.props;
    const {visible, done, current = {}} = this.state;
    const skuColumns = [
      {
        title: '产品标题',
        dataIndex: 'productTitle',
        key: 'productTitle',
      },
      {
        title: '产品属性',
        dataIndex: 'attributeCombination',
        key: 'attributeCombination',
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
            <Button icon="edit" type="primary" onClick={() => this.showEditModal(record)}>
              修改采信来源
            </Button>
            <Divider type="vertical"/>
            <Button icon="edit" type="primary" onClick={() => this.showEditModal(record)}>
              人工修改价钱
            </Button>
          </Fragment>
        ),
      },
    ];
    const getModalContent = () => {
      if (done) {
        return (
          <Result
            type="success"
            title="操作成功"
            description="一系列的信息描述，很短同样也可以带标点。"
            actions={
              <Button type="primary" onClick={this.handleDone}>
                知道了
              </Button>
            }
            className={styles.formResult}
          />
        );
      }
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="任务名称" {...this.formLayout}>
            {getFieldDecorator('title', {
              rules: [{required: true, message: '请输入任务名称'}],
              initialValue: current.title,
            })(<Input placeholder="请输入"/>)}
          </FormItem>
          <FormItem label="开始时间" {...this.formLayout}>
            {getFieldDecorator('createdAt', {
              rules: [{required: true, message: '请选择开始时间'}],
              initialValue: current.createdAt ? moment(current.createdAt) : null,
            })(
              <DatePicker
                showTime
                placeholder="请选择"
                format="YYYY-MM-DD HH:mm:ss"
                style={{width: '100%'}}
              />
            )}
          </FormItem>
          <FormItem label="任务负责人" {...this.formLayout}>
            {getFieldDecorator('owner', {
              rules: [{required: true, message: '请选择任务负责人'}],
              initialValue: current.owner,
            })(
              <Select placeholder="请选择">
                <SelectOption value="付晓晓">付晓晓</SelectOption>
                <SelectOption value="周毛毛">周毛毛</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem {...this.formLayout} label="产品描述">
            {getFieldDecorator('subDescription', {
              rules: [{message: '请输入至少五个字符的产品描述！', min: 5}],
              initialValue: current.subDescription,
            })(<TextArea rows={4} placeholder="请输入至少五个字符"/>)}
          </FormItem>
        </Form>
      );
    };
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
