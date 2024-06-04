import React from 'react';
import numeral from 'numeral';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Box from '@/components/box';

import { useTryoutFaucetOneRecoil } from '@/recoil/tryout/faucetOne';
import { useTryoutFaucetTwoRecoil } from '@/recoil/tryout/faucetTwo';
import CopyIcon from 'shared-utils/assets/icon-copy.svg';
import Link from 'next/link';
import { ACCOUNT_DETAILS } from '@/utils/go_to_page';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import { useWindowOrigin } from '@/hooks/use_window';

import QRCode from 'qrcode.react';
import ShareIcon from 'shared-utils/assets/icon-share.svg';
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
import useAppTranslation from '@/hooks/useAppTranslation';
import { useOverview } from './hooks';
import { useStyles } from './styles';

const Faucet: React.FC<{
  className?: string;
  title?: string;
}> = ({ className, title }) => {
  const { t } = useAppTranslation('tryouts');

  const { classes, cx } = useStyles();

  const { faucetOne } = useTryoutFaucetOneRecoil();
  const { faucetTwo } = useTryoutFaucetTwoRecoil();

  const { location } = useWindowOrigin();
  const { open, handleClose, handleOpen, handleCopyToClipboard } = useOverview(t);

  const faucetData = [
    {
      faucetAddressOne: faucetOne.addressFaucetOne,
      ggezFaucetOneBalance: numeral(faucetOne.balanceGGEZFaucetOne).format('0,0'),
      ggezOneFaucetOneBalance: numeral(faucetOne.balanceGGEZOneFaucetOne).format('0,0'),
      ggezDenom: faucetOne?.GGEZDenom?.toUpperCase(),
      ggezOneDenom: faucetOne?.GGEZOneDenom?.toUpperCase(),
    },
    {
      faucetAddressTwo: faucetTwo.addressFaucetTwo,
      ggezFaucetTwoBalance: numeral(faucetTwo.balanceGGEZFaucetTwo).format('0,0'),
      ggezOneFaucetTwoBalance: numeral(faucetTwo.balanceGGEZOneFaucetTwo).format('0,0'),
      ggezDenom: faucetTwo?.GGEZDenom?.toUpperCase(),
      ggezOneDenom: faucetTwo?.GGEZOneDenom?.toUpperCase(),
    },
  ];

  const address =
    title === t('faucetAccountOne')
      ? faucetData[0].faucetAddressOne
      : faucetData[1].faucetAddressTwo;

  const url = `${location}/accounts/${address}`;
  const hashTags = ['ggezexplorer', 'ggez'];

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
        <Typography variant="h2" className={classes.label}>
          {title === t('faucetAccountOne') ? t('faucetAccountOne') : t('faucetAccountTwo')}
        </Typography>
        <div className={classes.content}>
          <div className={classes.legends}>
            <div className={cx(classes.copyText, classes.item)}>
              <Typography variant="caption" className="label">
                {t('address')}
              </Typography>
              <div className="detail">
                <CopyIcon
                  className={classes.actionIcons}
                  onClick={() => handleCopyToClipboard(address)}
                />
                <ShareIcon onClick={handleOpen} className={classes.actionIcons} />
                <Link href={ACCOUNT_DETAILS(address)} passHref>
                  <Typography variant="body1" className="value" component="a">
                    {getMiddleEllipsis(address, {
                      beginning: 15,
                      ending: 5,
                    })}
                  </Typography>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.data}>
          <div className="data__item">
            <Typography variant="caption">{t('balance')}</Typography>
            {/* eslint-disable-next-line no-nested-ternary */}
            {title === t('faucetAccountOne') ? (
              faucetData[0]?.ggezFaucetOneBalance === '0' ? (
                <Typography variant="h4">0 UGGEZ1</Typography>
              ) : (
                <Typography variant="h4">
                  {faucetData[0]?.ggezFaucetOneBalance} {faucetData[0]?.ggezDenom}
                </Typography>
              )
            ) : faucetData[1]?.ggezFaucetTwoBalance === '0' ? (
              <Typography variant="h4">0 UGGEZ1</Typography>
            ) : (
              <Typography variant="h4">
                {faucetData[1]?.ggezFaucetTwoBalance} {faucetData[1]?.ggezDenom}
              </Typography>
            )}
          </div>
          <div className="data__item">
            <Typography variant="caption">{t('balance')}</Typography>
            {/* eslint-disable-next-line no-nested-ternary */}
            {title === t('faucetAccountOne') ? (
              faucetData[0]?.ggezOneFaucetOneBalance === '0' ? (
                <Typography variant="h4">0 UGGEZ</Typography>
              ) : (
                <Typography variant="h4">
                  {faucetData[0]?.ggezOneFaucetOneBalance} {faucetData[0]?.ggezOneDenom}
                </Typography>
              )
            ) : faucetData[1]?.ggezOneFaucetTwoBalance === '0' ? (
              <Typography variant="h4">0 UGGEZ</Typography>
            ) : (
              <Typography variant="h4">
                {faucetData[1]?.ggezOneFaucetTwoBalance} {faucetData[1]?.ggezOneDenom}
              </Typography>
            )}
          </div>
        </div>
      </Box>
    </>
  );
};

export default Faucet;
