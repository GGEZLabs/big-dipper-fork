import withGetStaticProps from '@/pages/withGetStaticProps';
import Assets from '@/screens/assets';
import type { NextPage } from 'next';
import nextI18NextConfig from 'ui/next-i18next.config';

const AssetsPage: NextPage = () => <Assets />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'transactions',
  'message_labels',
  'message_contents',
  'assets',
  'holdings',
  'trades'
);

export default AssetsPage;
