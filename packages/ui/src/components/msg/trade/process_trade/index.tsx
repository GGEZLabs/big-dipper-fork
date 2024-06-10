import React from 'react';
import Typography from '@mui/material/Typography';
import { MsgProcessTrade } from '@/models';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';
import Name from '@/components/name';
import { useProfileRecoil } from '@/recoil/profiles/hooks';
const ProcessTrade: FC<{ message: MsgProcessTrade }> = (props) => {
  const { message } = props;
  const tradeIndex = message.json.tradeIndex;
  const creator = useProfileRecoil(message.creator);
  const creatorMoniker = creator ? creator?.name : message.creator;

  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txProcessTradeContent"
        components={[<Name address={message.creator} name={creatorMoniker} />]}
      />
      {tradeIndex}
    </Typography>
  );
};

export default ProcessTrade;
