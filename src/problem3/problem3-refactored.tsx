interface WalletBalance {
  blockchain: BlockchainType;
  currency: string;
  amount: number;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface Props extends BoxProps {}

type BlockchainType = 'Osmosis' | 'Ethereum' | 'Arbitrum' | 'Zilliqa' | 'Neo';

const PRIORITY_MAP: Record<BlockchainType, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20
};

const getPriority = (blockchain: BlockchainType): number => PRIORITY_MAP[blockchain] ?? -99;

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
  }, [balances]);

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map((balance) => ({
    ...balance,
    formatted: balance.amount.toFixed()
  }));

  return (
    <div {...rest}>
      {formattedBalances.map((balance) => (
        <WalletRow
          className={classes.row}
          key={balance.currency}
          amount={balance.amount}
          usdValue={prices[balance.currency] * balance.amount}
          formattedAmount={balance.formatted}
        />
      ))}
    </div>
  );
};
