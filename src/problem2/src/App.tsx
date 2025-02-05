import { FC, useCallback, useEffect, useState } from "react";
import { Divider, Flex, Typography, Form, Button, Space, Alert, Card } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import CurrencySelect from "./components/CurrencySelect";
import { PriceList } from "./types/Price";
import axios from "axios";
import { useWatch } from "antd/es/form/Form";
import AmountInput from "./components/AmountInput";
import np from "number-precision";

import "./App.css";


type FormValues = {
  from: string;
  to: string;
  sendAmount: number;
  receiveAmount: number;
}

const App: FC = () => {
  const [prices, setPrices] = useState<PriceList>([]);
  const [priceLoading, setPriceLoading] = useState<boolean>(false);
  const [swapLoading, setSwapLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const from = useWatch('from', form);
  const swappedAmount = useWatch('receiveAmount', form);

  const fetchInitialData = useCallback(async () => {
    try {
      setPriceLoading(true);
      const res = await axios.get<PriceList>("https://interview.switcheo.com/prices.json");

      // Remove currency duplications
      const pricesFiltered = res.data.filter((p, index, self) => {
        return index === self.findIndex(t => t.currency === p.currency)
      })
      setPrices(pricesFiltered);
    } catch (error) {
      // Do sth with error
    } finally {
      setPriceLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  function onSubmit(values: FormValues) {
    setSwapLoading(true);
    setTimeout(() => {
      const fromCurr = prices.find(p => p.currency === values.from);
      const toCurr = prices.find(p => p.currency === values.to)
      if (fromCurr && toCurr) {
        const swappedAmount = np.divide(np.times(values.sendAmount, fromCurr.price), toCurr.price);
        console.log(swappedAmount);
        form.setFieldValue('receiveAmount', swappedAmount);
        setSwapLoading(false);
      }
    }, 200);
  }
  
  return (
    <Flex className="app" justify="center" align="center">
      <Card title="Fancy Form" className="container">
        <Form onFinish={onSubmit} layout="vertical" form={form}>
          <Flex align="center">
            <Form.Item name="from" style={{ flex: 1}} rules={[{ required: true, message: "This field is required" }]}>
              <CurrencySelect loading={priceLoading} priceList={prices} />
            </Form.Item>
            
            <Form.Item>
              <div className="arrow-icon">
                <ArrowRightOutlined />
              </div>
            </Form.Item>


            <Form.Item
              name="to"
              style={{ flex: 1}}
              rules={[
                { required: true, message: "This field is required" },
                ({ getFieldValue }) => ({
                  validator: (_, value) => {
                    if (getFieldValue('from') === value) {
                      return Promise.reject('Please select different currency');
                    }
                    return Promise.resolve();
                  }
                })
              ]}>
              <CurrencySelect loading={priceLoading} priceList={prices} selectedOption={from} />
            </Form.Item>
          </Flex>
          <Form.Item name="sendAmount" label="Amount to send" rules={[
            {
              required: true,
              message: "This field is required"
            },
            {validator: (_, value) => {
              if (value < 0) return Promise.reject('Amount must be greater than or equal 0');
              return Promise.resolve();
            }}
          ]}>
            <AmountInput />
          </Form.Item>
          <Form.Item name="receiveAmount" label="Amount to receive" hidden={swappedAmount === undefined}>
            <AmountInput readonly />
          </Form.Item>
          <Form.Item>
            <Flex justify="end">
              <Space>
                <Button htmlType="reset">Reset</Button>
                <Button type="primary" htmlType="submit" loading={swapLoading}>Swap</Button>
              </Space>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default App;