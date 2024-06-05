import withGetStaticProps from '@/pages/withGetStaticProps';
import Trades from '@/screens/trades';
import type { NextPage } from 'next';
import nextI18NextConfig from 'ui/next-i18next.config';

const TradesPage: NextPage = () => <Trades />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'transactions',
  'message_labels',
  'message_contents',
  'trades'
);

export default TradesPage;
