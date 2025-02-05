import { Select, SelectProps, Space } from "antd";
import { PriceList } from "../../types/Price";
import { FC } from "react";

type CurrencySlectProps = {
  loading: boolean;
  priceList: PriceList;
  selectedOption?: string | null;
  value?: SelectProps['value'];
  onChange?: SelectProps['onChange'];
}

const CurrencySelect: FC<CurrencySlectProps> = ({ loading, priceList, selectedOption, value, onChange }) => {
  let iconNames: {[name: string]: string} = {};
  const options = priceList.filter(p => p.currency !== selectedOption).map((p) => {
  iconNames[p.currency] = p.currency;
  return {
      value: p.currency,
      label: p.currency
    }
  });

  iconNames = {
    ...iconNames,
    STLUNA: "stLUNA",
    STEVMOS: "stEVMOS",
    RATOM: "rATOM",
    STOSMO: "stOSMO",
    STATOM: "stATOM"
  }

  return <Select
    value={value}
    onChange={onChange}
    loading={loading}
    options={options}
    allowClear
    showSearch
    optionRender={(option) => (
    <Space>
      <img
        width={24}
        height={24}
        src={`https://raw.githubusercontent.com/Switcheo/token-icons/refs/heads/main/tokens/${iconNames[option.data.label]}.svg`}
      />
      {option.data.label}
    </Space>
  )}
  />
}

export default CurrencySelect;