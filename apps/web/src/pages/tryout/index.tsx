import withGetStaticProps from '@/pages/withGetStaticProps';
import Tryout from '@/screens/tryout';
import type { NextPage } from 'next';
import nextI18NextConfig from '../../../next-i18next.config';

const TryoutPage: NextPage = () => <Tryout />;

export const getStaticProps = withGetStaticProps(
  nextI18NextConfig,
  'transactions',
  'message_labels',
  'message_contents',
  'tryouts'
);

export default TryoutPage;
