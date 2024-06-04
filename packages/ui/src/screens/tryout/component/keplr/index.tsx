/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';
import numeral from 'numeral';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import useAppTranslation from '@/hooks/useAppTranslation';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import Box from '@/components/box';
import { useTryoutKeplrAccountRecoil } from '@/recoil/tryout/keplrWallet';
import CopyIcon from 'shared-utils/assets/icon-copy.svg';
import ShareIcon from 'shared-utils/assets/icon-share.svg';
import Link from 'next/link';
import { ACCOUNT_DETAILS } from '@/utils/go_to_page';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import QRCode from 'qrcode.react';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { toast } from 'react-toastify';
import { useWindowOrigin } from '@/hooks/use_window';
import { useOverview } from './hooks';
import { useStyles } from './styles';

const KeplrCom: React.FC<
  {
    className?: string;
  } & ComponentDefault
> = ({ className }) => {
  const { classes, cx } = useStyles();
  const { t, i18n } = useAppTranslation('tryouts');
  const lang = i18n.language;
  const { open, handleClose, handleOpen, handleCopyToClipboard } = useOverview(t);
  const { connectKeplr, disconnectKeplr, keplrWallet, setKeplrWallet } =
    useTryoutKeplrAccountRecoil();
  const [connect, setConnect] = useState(false);
  const { location } = useWindowOrigin();
  const [keplr, setKeplr] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setKeplr(window?.keplr);
    }
  }, []);
  const connectWithKeplr = () => {
    connectKeplr();
    if (!keplr && typeof window !== 'undefined') {
      toast(
        <div>
          {t('PleaseInstallKeplr')}{' '}
          <a target="_blank" href="https://www.keplr.app/download " rel="noreferrer">
            {' '}
            {t('clickHereToDownload')}
          </a>{' '}
        </div>
      );
    } else if (!keplrWallet.installKeplrError && !keplrWallet.addAccountKeplrError) {
      keplrWallet.balanceGGEZKeplr !== '' ? setConnect(true) : setConnect(false);
    }
  };
  useEffect(() => {
    if (keplrWallet.addAccountKeplrError && typeof window !== 'undefined') {
      toast(
        <div>
          {t('pleaseCreateKeplrAccount')}
          <br />
          <br />
          <a target="_blank" href="https://help.keplr.app/" rel="noreferrer">
            {t('clickHereCreatekeplrAccount')}
          </a>
        </div>
      );

      setKeplrWallet({
        keplerAdderss: '',
        balanceGGEZOneKeplr: '',
        balanceGGEZKeplr: '',
        userNameKeplr: '',
        GGEZDenom: '',
        GGEZOneDenom: '',
        installKeplrError: '',
        addAccountKeplrError: '',
      });
    }
  }, [keplrWallet.addAccountKeplrError, setKeplrWallet, t]);

  useEffect(() => {
    if (
      !keplrWallet.installKeplrError &&
      !keplrWallet.addAccountKeplrError &&
      keplrWallet.keplerAdderss
    ) {
      setConnect(true);
    } else {
      setConnect(false);
    }
  }, [keplrWallet]);

  const DisconnectWithKeplr = () => {
    disconnectKeplr();
    setConnect(false);
  };

  const address = keplrWallet.keplerAdderss;

  const url = `${location}/accounts/${address}`;
  const hashTags = ['ggezexplorer', 'ggez'];
  const data = [
    {
      accountAddress: keplrWallet.keplerAdderss
        ? keplrWallet.keplerAdderss
        : 'Please Connect With Keplr',
      ggezAccountBalance: numeral(keplrWallet.balanceGGEZKeplr).format('0,0'),
      ggezOneAccountBalance: numeral(keplrWallet.balanceGGEZOneKeplr).format('0,0'),
      ggezDenom: keplrWallet.GGEZDenom?.toUpperCase(),
      ggezOneDenom: keplrWallet.GGEZOneDenom?.toUpperCase(),
    },
  ];

  return (
    <>
      <Dialog maxWidth="xl" onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <Box className={classes.dialog}>
          <Typography variant="body1" align="center">
            {t('scanForAddress')}
          </Typography>
          <QRCode value={address} size={200} bgColor="#ffffff" fgColor="#000000" renderAs="svg" />
          <div className="dialog__share--wrapper">
            <Typography variant="body1">{t('shareTo')}</Typography>
            <div className={classes.icons}>
              <FacebookShareButton
                url={url}
                quote={address}
                hashtag={hashTags[0]}
                className="share-buttons"
              >
                <FacebookIcon round />
              </FacebookShareButton>
              <TwitterShareButton
                url={url}
                title={address}
                hashtags={hashTags}
                className="share-buttons"
              >
                <TwitterIcon round />
              </TwitterShareButton>

              <TelegramShareButton url={url} title={address} className="share-buttons">
                <TelegramIcon round />
              </TelegramShareButton>

              <WhatsappShareButton
                url={url}
                title={address}
                separator=":: "
                className="share-buttons"
              >
                <WhatsappIcon round />
              </WhatsappShareButton>
              <EmailShareButton
                url={url}
                subject="address"
                body={address}
                separator=":: "
                className="share-buttons email"
              >
                <EmailIcon round />
              </EmailShareButton>
            </div>
          </div>
        </Box>
      </Dialog>
      <Box className={cx(className, classes.root)}>
        {keplrWallet.keplerAdderss ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h2" className={classes.label}>
                {t('KeplrWallet')}
              </Typography>
              <CloudDoneOutlinedIcon
                sx={{
                  fontSize: lang === 'ar' ? 37 : 30,
                  color: 'green',
                  marginLeft: lang === 'ar' ? 0 : 2,
                  paddingRight: lang === 'ar' ? 1 : 0,
                }}
              />
            </div>

            <Button
              style={{ width: '25%', marginRight: 2 }}
              variant="contained"
              onClick={() => DisconnectWithKeplr()}
              color="error"
            >
              {t('disconnect')}
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h2" className={classes.label}>
              {t('KeplrWallet')}
            </Typography>

            <Button
              className={classes.button}
              variant="contained"
              onClick={() => connectWithKeplr()}
            >
              {t('connectKeplrWallet')}
            </Button>
          </div>
        )}

        <div className={classes.content}>
          <div className={classes.legends}>
            <div className={cx(classes.copyText, classes.item)}>
              <Typography variant="caption" className="label">
                {t('address')}
              </Typography>

              <div className="detail">
                {keplrWallet.keplerAdderss ? (
                  <>
                    <CopyIcon
                      className={classes.actionIcons}
                      onClick={() => handleCopyToClipboard(address)}
                    />
                    <ShareIcon onClick={handleOpen} className={classes.actionIcons} />
                  </>
                ) : (
                  // eslint-disable-next-line react/jsx-no-useless-fragment
                  <></>
                )}

                {keplrWallet.keplerAdderss ? (
                  <Link href={ACCOUNT_DETAILS(address)} passHref>
                    <Typography variant="body1" className="value" component="a">
                      {getMiddleEllipsis(address, {
                        beginning: 15,
                        ending: 5,
                      })}
                    </Typography>
                  </Link>
                ) : (
                  <Typography variant="body1" className="address" component="span">
                    {getMiddleEllipsis(t('pleaseConnectWithKeplr'), {
                      beginning: 30,
                      ending: 2,
                    })}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={classes.data}>
          <div className="data__item">
            <Typography variant="caption">{t('balance')}</Typography>

            {connect &&
            !keplrWallet.keplerAdderss &&
            !keplrWallet.installKeplrError &&
            !keplrWallet.addAccountKeplrError ? (
              <Typography variant="h4" className="loading">
                <LinearProgress />
              </Typography>
            ) : (
              <Typography variant="h4">
                {data[0].ggezAccountBalance} {data[0].ggezDenom}
              </Typography>
            )}
          </div>
          <div className="data__item">
            <Typography variant="caption">{t('balance')}</Typography>
            {connect && !keplrWallet.keplerAdderss ? (
              <Typography variant="h4" className="loading">
                <LinearProgress />
              </Typography>
            ) : (
              <Typography variant="h4">
                {data[0].ggezOneAccountBalance} {data[0].ggezOneDenom}
              </Typography>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default KeplrCom;
