import React, { Component } from 'react';

import { Modal, Form, Input, Radio, Divider, Row, Col } from 'antd';

class FormPeserta extends Component {
  render() {
    const { visible, onCancel, onCreate, form, data } = this.props;
    const { getFieldDecorator } = form;
    const { TextArea } = Input;
    // const dataHadir = data ? data.hadir : '';
    // console.log(data.id_herbalife)
    return (
      <Modal
        visible={visible}
        title="Data Peserta"
        okText="Simpan"
        onCancel={onCancel}
        onOk={onCreate}
        width={1000}
      >
        <Form layout="vertical">
          <Row>
            <Col span={24}>
              <Form.Item label="Kehadiran" className="collection-create-form_last-form-item">
                {getFieldDecorator('hadir', {
                  initialValue: data.hadir,
                })(
                  <Radio.Group>
                    <Radio value="0">Belum Hadir</Radio>
                    <Radio value="1">Hadir</Radio>
                  </Radio.Group>,
                )}
              </Form.Item>

              <Form.Item label="ID">
                {getFieldDecorator('id_peserta', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.id_peserta,
                })(<Input disabled />)}
              </Form.Item>

              <Form.Item label="ID Herbalife">
                {getFieldDecorator('id_herbalife', {
                  rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.id_herbalife,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Nama">
                {getFieldDecorator('nama', {
                  rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.nama,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="No Telepon">
                {getFieldDecorator('no_telp', {
                  rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.no_telp,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Email">
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.email,
                })(<Input />)}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Divider style={{ paddingTop: 0, marginTop: 0 }}>Optional</Divider>
              <Form.Item label="Level Herbalife">
                {getFieldDecorator('level_herbalife', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.level_herbalife,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Tanggal Lahir">
                {getFieldDecorator('tanggal_lahir', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.tanggal_lahir,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Kota Asal">
                {getFieldDecorator('kota_asal', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.kota_asal,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Propinsi">
                {getFieldDecorator('propinsi', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.propinsi,
                })(<Input />)}
              </Form.Item>
            </Col>

            <Col span={12}>
              <Divider style={{ paddingTop: 0, marginTop: 0 }}>Keterangan Transfer</Divider>
              <Form.Item label="Tanggal Transfer">
                {getFieldDecorator('tanggal_transfer', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.tanggal_transfer,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Nama Pentransfer">
                {getFieldDecorator('nama_transfer', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.nama_transfer,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Bank Pentransfer">
                {getFieldDecorator('bank_transfer', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.bank_transfer,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Nominal Transfer">
                {getFieldDecorator('nominal_transfer', {
                  // rules: [{ required: true, message: 'Please input the ID Herbalife!' }],
                  initialValue: data.nominal_transfer,
                })(<Input />)}
              </Form.Item>

              <Form.Item label="Berita Transfer">
                {getFieldDecorator('berita_transfer', {
                  initialValue: data.berita_transfer,
                })(<TextArea rows={4} />)}
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Modal >
    );
  }
}

const WrappedFormPeserta = Form.create({ name: 'form_peserta' })(FormPeserta);

export default WrappedFormPeserta;