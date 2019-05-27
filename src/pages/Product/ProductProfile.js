import React, {PureComponent, Fragment} from 'react';
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
@Form.create()
class ProductProfile extends PureComponent {
  state = { visible: false, done: false };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

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
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      done: false,
      visible: false,
    });
  };

  handleCancel = () => {
    // setTimeout(() => this.addBtn.blur(), 0);
    this.setState({
      visible: false,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { current } = this.state;
    const id = current ? current.id : '';

    // setTimeout(() => this.addBtn.blur(), 0);
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

    const modalFooter = done
      ? { footer: null, onCancel: this.handleDone }
      : { okText: '保存', onOk: this.handleSubmit, onCancel: this.handleCancel };

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
            <Divider type="vertical" />
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
          <FormItem label="产品原价" {...this.formLayout}>
            {getFieldDecorator('manualProductPrice', {
              rules: [{required: true, message: '请输入产品原价'}],
              initialValue: current.manualProductPrice,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="产品售价" {...this.formLayout}>
            {getFieldDecorator('manualProductSale', {
              rules: [{required: true, message: '请输入产品售价'}],
              initialValue: current.manualProductSale,
            })(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem label="产品状态" {...this.formLayout}>
            {getFieldDecorator('manual_availability', {
              rules: [{required: true, message: '请输入产品状态'}],
              initialValue: current.manual_availability,
            })(
              <Select placeholder="请选择">
                <SelectOption value="1">有货</SelectOption>
                <SelectOption value="2">没货</SelectOption>
              </Select>
            )}
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
        <Modal
          title={done ? null : `任务${current.id ? '编辑' : '添加'}`}
          className={styles.standardListForm}
          width={640}
          bodyStyle={done ? { padding: '72px 0' } : { padding: '28px 0 0' }}
          destroyOnClose
          visible={visible}
          {...modalFooter}
        >
          {getModalContent()}
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default ProductProfile;
