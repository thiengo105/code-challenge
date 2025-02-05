import { Input, InputProps } from "antd"
import { FC } from "react"
import { NumericFormat } from "react-number-format"

type AmountInputProps = {
  value?: string | number | null,
  onChange?: (value: number | undefined) => void;
  readonly?: boolean;
}

const AmountInput: FC<AmountInputProps> = ({ value, onChange, readonly }) => {
  return (
    <NumericFormat
      value={value}
      onValueChange={(values) => onChange?.(values.floatValue)}
      thousandSeparator=","
      decimalSeparator="."
      decimalScale={2}
      customInput={Input}
      allowClear
      readOnly={readonly}
      displayType={readonly ? "text" : "input"}
    />
  )
}

export default AmountInput;