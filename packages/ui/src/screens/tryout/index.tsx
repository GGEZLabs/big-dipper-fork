import { NextSeo } from 'next-seo';
import useAppTranslation from '@/hooks/useAppTranslation';
import Layout from '@/components/layout';
import useStyles from './styles';
import { Faucet, KeplrCom, CreateAccount, TestTransaction } from './component';
// import { Faucet } from './component';

const Tryout = () => {
  const { t } = useAppTranslation('tryouts');
  const { classes } = useStyles();
  return (
    <>
      <NextSeo title={t('tryout')} openGraph={{ title: t('tryout') }} />

      <Layout className={classes.root} navTitle={t('tryout')}>
        <Faucet className={classes.faucetOne} title={t('faucetAccountOne')} />
        <Faucet className={classes.faucetTwo} title={t('faucetAccountTwo')} />
        <KeplrCom className={classes.kepler} />
        <CreateAccount className={classes.createAccount} />
        <TestTransaction className={classes.tryout} />
      </Layout>
    </>
  );
};

export default Tryout;