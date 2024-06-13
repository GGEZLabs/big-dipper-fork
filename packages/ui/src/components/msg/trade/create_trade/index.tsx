import Typography from '@mui/material/Typography';
import Name from '@/components/name';
import { MsgCreateTrade } from '@/models';
import { useProfileRecoil } from '@/recoil/profiles';
import AppTrans from '@/components/AppTrans';
import { FC } from 'react';

const CreateTrade: FC<{ message: MsgCreateTrade }> = (props) => {
  const { message } = props;
  console.log('message :>> ', message);
  const creator = useProfileRecoil(message.creator);
  const jsonData = JSON.parse(message?.json?.tradeData || '');
  const tradeRequestId = jsonData?.TradeData?.tradeRequestID;
  const creatorMoniker = creator ? creator?.name : message.creator;
  //   "txCreateTradeContent": "<0>{{user}}</0> Created New Trade",
  // "txProcessTradeContent": "<0>{{user}}</0> Process Trade",
  return (
    <Typography>
      <AppTrans
        i18nKey="message_contents:txCreateTradeContent"
        components={[<Name address={message.creator} name={creatorMoniker} />]}
      />
      {tradeRequestId}
    </Typography>
  );
};

export default CreateTrade;
