import withGetStaticProps from '@/pages/withGetStaticProps';
import Holdings from '@/screens/holdings';
import type { NextPage } from 'next';
import nextI18NextConfig from 'ui/next-i18next.config';

const HoldingsPage: NextPage = () => <Holdings />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'transactions',
  'message_labels',
  'message_contents',
  'holdings'
);

export default HoldingsPage;
