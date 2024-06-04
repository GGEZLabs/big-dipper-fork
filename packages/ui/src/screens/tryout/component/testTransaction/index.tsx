/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-expressions */
/* eslint-disable consistent-return */
/* eslint-disable eqeqeq */
/* eslint-disable turbo/no-undeclared-env-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import useAppTranslation from '@/hooks/useAppTranslation';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import SelectBox from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import chainConfigFile from '@/chain.json';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormHelperText from '@mui/material/FormHelperText';
import { Alert, AlertTitle } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import { TRANSACTION_DETAILS } from '@/utils/go_to_page';
import Link from 'next/link';
import { getMiddleEllipsis } from '@/utils/get_middle_ellipsis';
import Box from '@/components/box';
import { useRecoilValue } from 'recoil';
import { readWalletSelection } from '@/recoil/wallet';
import { readFaucetOne } from '@/recoil/tryout/faucetOne';
import { readFaucetTwo } from '@/recoil/tryout/faucetTwo';
import { readCreateAccount } from '@/recoil/tryout/createAccount';
import { readKeplrWallet } from '@/recoil/tryout/keplrWallet';
import { useStyles } from './styles';
import { useTestTransaction } from './hooks';

const TestTransaction: React.FC<ComponentDefault> = ({ className }) => {
  const { classes, theme } = useStyles();
  const { t, i18n } = useAppTranslation('tryouts');
  const lang = i18n.language;
  const chainConfig = JSON.parse(chainConfigFile.keplr);
  const walletState = useRecoilValue(readWalletSelection);
  const faucetOneState = useRecoilValue(readFaucetOne);
  const faucetTwoState = useRecoilValue(readFaucetTwo);
  const keplrState = useRecoilValue(readKeplrWallet);
  const createAccountState = useRecoilValue(readCreateAccount);

  const [loading, setLoading] = useState(false);
  const [successfulTransaction, setSuccessfulTransaction] = useState(false);

  /// / validate   ////////
  const [validateSender, setValidateSender] = useState(false);
  const [validateReceiver, setValidateReceiver] = useState(false);
  const [validateAddressInput, setValidateAddressInput] = useState(false);
  const [validateAmount, setValidateAmount] = useState(false);
  const [validateDenom, setValidateDenom] = useState(false);
  /// ////////////////////

  const [checkReciverAddress, setCheckReciverAddress] = useState(false);

  /// ///  Accounts///////
  const [accountOne, setAccountOne] = useState(process.env.NEXT_PUBLIC_FAUCET_ADDRESS_ONE);
  const [accountTwo, setAccountTwo] = useState(process.env.NEXT_PUBLIC_FAUCET_ADDRESS_TWO);

  /// ////////////////

  /// // Data Form  //////
  const [sender, setSender] = useState('');
  const [receiver, setReciver] = useState('');
  const [denom, setDenom] = useState('');
  const [amount, setAmount] = useState('');
  const [inputAddress, setInputAddress] = useState('');
  const [memoInput, setMemoInput] = useState('');
  const [result, setResult] = useState(false);
  /// ///////////////

  const { state, processTransaction } = useTestTransaction();

  useEffect(() => {
    if (state.transactionHash) {
      setLoading(false);
      setSuccessfulTransaction(true);
    }
  }, [state]);
  const check = () => {
    if (validate() == true) {
      processTransaction();
      setLoading(true);
      setResult(false);
    }
  };
  /// ///
  const handleSender = (event: SelectChangeEvent) => {
    if (event.target.value) {
      if (inputAddress == event.target.value) {
        setSender(event.target.value);
      } else {
        setCheckReciverAddress(false);
        setSender(event.target.value);
        state.sender = event.target.value;
      }

      setValidateSender(false);
    } else {
      setValidateSender(true);
    }
  };
  const addressInput = (e) => {
    if (e.target.value) {
      setCheckReciverAddress(false);

      setInputAddress(e.target.value);
      // setReciver(e.target.value)
      // sender == e.target.value ? setCheckReciverAddress(true) : state.receiver = e.target.value
      state.receiver = e.target.value;
      setValidateAddressInput(false);
    } else {
      setValidateAddressInput(true);
    }
  };
  const handleMemoInput = (e) => {
    setMemoInput(e.target.value);

    state.memo = e.target.value;
  };
  const handleReceiver = (event: SelectChangeEvent) => {
    if (event.target.value) {
      setCheckReciverAddress(false);
      setReciver(event.target.value);
      state.receiver = event.target.value;
      setValidateReceiver(false);
    } else {
      setValidateReceiver(true);
    }
  };

  const handleDenom = (event: SelectChangeEvent) => {
    if (event.target.value) {
      setDenom(event.target.value);
      state.denom = event.target.value;
      setValidateDenom(false);
    } else {
      setValidateDenom(true);
    }
  };
  const handleAmount = (event: SelectChangeEvent) => {
    if (event.target.value) {
      setAmount(event.target.value);
      state.amount = event.target.value;

      setValidateAmount(false);
    } else {
      setValidateAmount(true);
    }
  };
  /// ///

  const handleReset = () => {
    setAmount('');
    setValidateAmount(false);
    setDenom('');
    setValidateDenom(false);
    setSender('');
    setValidateSender(false);
    setReciver('');
    setValidateReceiver(false);
    setCheckReciverAddress(false);
    setMemoInput('');
    setResult(true);
  };
  const validate = () => {
    if (
      sender == '' ||
      receiver == '' ||
      denom == '' ||
      amount == ''
      // || inputAddress == ""
    ) {
      sender == '' ? setValidateSender(true) : setValidateSender(false);
      receiver == '' ? setValidateReceiver(true) : setValidateReceiver(false);
      amount == '' ? setValidateAmount(true) : setValidateAmount(false);
      denom == '' ? setValidateDenom(true) : setValidateDenom(false);
    } else if (sender == receiver || sender == inputAddress || sender == receiver.split('_')[1]) {
      setCheckReciverAddress(true);
      // processTransaction();
    } else {
      return true;
      // processTransaction();
    }
  };

  return (
    <Box className={className}>
      <Typography variant="h2" className={classes.title}>
        {t('testTransaction')}
      </Typography>

      <div className={classes.addressRoot}>
        <div>
          <SelectBox className={classes.SelectBox}>
            <Typography variant="caption" className="label">
              {t('fromAccount')}:
            </Typography>

            <FormControl fullWidth>
              <Select
                sx={{
                  color: theme.palette.custom.customSelect.one,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '.MuiSvgIcon-root ': {
                    fill: theme.palette.custom.customSelect.zero,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sender}
                onChange={handleSender}
                error={validateSender}
              >
                {/*  {createAccountState.accountBalanceGGEZ !== '0' && createAccountState.accountBalanceGGEZOne !== '0'?
                
                <MenuItem value={createAccountState.accountAddress}>{createAccountState.accountName}</MenuItem>
                :
              null} */}

                <MenuItem value={accountOne}>{t('faucetOne')}</MenuItem>
                <MenuItem value={accountTwo}>{t('faucetTwo')}</MenuItem>
              </Select>
              {validateSender ? (
                <FormHelperText style={{ color: '#FF0000' }}>{t('required')}</FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </SelectBox>
        </div>

        <div>
          {receiver == 'Enter Wallet Address' ? (
            <div className={classes.SelectBox} style={{ display: 'flex', alignItems: 'end' }}>
              <FormControl sx={{ width: '90%' }}>
                <Typography variant="caption" className="label">
                  {t('toAccount')}:
                </Typography>

                <TextField
                  sx={{
                    input: {
                      color: theme.palette.custom.customSelect.zero,
                      backgroung: theme.palette.custom.customSelect.zero,
                    },
                    '& label.Mui-focused': {
                      color: theme.palette.custom.customSelect.zero,
                    },
                    '& .MuiInput-underline:after': {
                      borderBottomColor: theme.palette.custom.customSelect.zero,
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                    },
                  }}
                  id="outlined-basic"
                  placeholder="Address_Example : ggez15slk0lq7lkvkslo7..."
                  style={{
                    fontStyle: 'italic',
                    background: theme.palette.custom.customSelect.zero,
                  }}
                  variant="outlined"
                  onChange={(e) => addressInput(e)}
                  helperText={validateAddressInput == true ? t('required') : null}
                  error={validateAddressInput == true}
                />
              </FormControl>
              <ArrowBackIcon
                onClick={() => {
                  setReciver('');
                  setInputAddress('');
                }}
                style={{ marginLeft: 10, cursor: 'pointer', marginBottom: 18 }}
              />
            </div>
          ) : (
            <SelectBox className={classes.SelectBox}>
              <Typography variant="caption" className="label">
                {t('toAccount')}:
              </Typography>

              <FormControl fullWidth>
                {sender == accountOne ? (
                  <Select
                    sx={{
                      color: theme.palette.custom.customSelect.one,
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '.MuiSvgIcon-root ': {
                        fill: theme.palette.custom.customSelect.zero,
                      },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={receiver}
                    onChange={handleReceiver}
                    error={validateReceiver}
                  >
                    <MenuItem value={accountTwo}>{t('faucetTwo')}</MenuItem>

                    {keplrState.userNameKeplr ? (
                      <MenuItem value={`keplr_${keplrState.keplerAdderss}`}>
                        {`${t('keplrWallet')} ${keplrState.userNameKeplr}`}
                      </MenuItem>
                    ) : null}

                    <MenuItem value="Enter Wallet Address">{t('enterWalletAddress')}</MenuItem>
                  </Select>
                ) : sender !== accountOne && sender !== accountTwo ? (
                  <Select
                    sx={{
                      color: theme.palette.custom.customSelect.one,
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '.MuiSvgIcon-root ': {
                        fill: theme.palette.custom.customSelect.zero,
                      },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={receiver}
                    onChange={handleReceiver}
                    error={validateReceiver}
                  >
                    <MenuItem value={accountOne}>{t('faucetOne')}</MenuItem>
                    <MenuItem value={accountTwo}>{t('faucetTwo')}</MenuItem>
                    {/*  {createAccountState.accountBalanceGGEZ !== '0' && createAccountState.accountBalanceGGEZOne !== '0'?
                
                <MenuItem value={createAccountState.accountAddress}>{createAccountState.accountName}</MenuItem>
                :
                null} */}
                    {keplrState.userNameKeplr ? (
                      <MenuItem value={`keplr_${keplrState.keplerAdderss}`}>
                        {`${t('keplrWallet')} ${keplrState.userNameKeplr}`}
                      </MenuItem>
                    ) : null}

                    <MenuItem value="Enter Wallet Address">{t('enterWalletAddress')}</MenuItem>
                  </Select>
                ) : (
                  <Select
                    sx={{
                      color: theme.palette.custom.customSelect.one,
                      '.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.custom.customSelect.zero,
                      },
                      '.MuiSvgIcon-root ': {
                        fill: theme.palette.custom.customSelect.zero,
                      },
                    }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={receiver}
                    onChange={handleReceiver}
                    error={validateReceiver}
                  >
                    <MenuItem value={accountOne}>{t('faucetOne')}</MenuItem>

                    {keplrState.userNameKeplr ? (
                      <MenuItem value={`keplr_${keplrState.keplerAdderss}`}>
                        {`${t('keplrWallet')} ${keplrState.userNameKeplr}`}
                      </MenuItem>
                    ) : null}

                    <MenuItem value="Enter Wallet Address">{t('enterWalletAddress')}</MenuItem>
                  </Select>
                )}
                {validateReceiver ? (
                  <FormHelperText style={{ color: '#FF0000' }}>{t('required')}</FormHelperText>
                ) : (
                  <></>
                )}
              </FormControl>
            </SelectBox>
          )}
        </div>
        <div>
          <div>
            <SelectBox className={classes.SelectBox}>
              <Typography variant="caption" className="label">
                {t('amount')}:
              </Typography>

              <FormControl fullWidth>
                <Select
                  sx={{
                    color: theme.palette.custom.customSelect.one,
                    '.MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.custom.customSelect.zero,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.custom.customSelect.zero,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: theme.palette.custom.customSelect.zero,
                    },
                    '.MuiSvgIcon-root ': {
                      fill: theme.palette.custom.customSelect.zero,
                    },
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={amount}
                  onChange={handleAmount}
                  error={validateAmount}
                >
                  <MenuItem value="10000">10000</MenuItem>
                  <MenuItem value="15000">15000</MenuItem>
                  <MenuItem value="20000">20000</MenuItem>
                </Select>
                {validateAmount ? (
                  <FormHelperText style={{ color: '#FF0000' }}>{t('required')}</FormHelperText>
                ) : (
                  <></>
                )}
              </FormControl>
            </SelectBox>
          </div>
        </div>
        <div>
          <SelectBox className={classes.SelectBox}>
            <Typography variant="caption" className="label">
              {t('denom')}:
            </Typography>

            <FormControl fullWidth>
              {/*               <InputLabel id="demo-simple-select-label">Denom</InputLabel>
               */}{' '}
              <Select
                sx={{
                  color: theme.palette.custom.customSelect.one,
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '.MuiSvgIcon-root ': {
                    fill: theme.palette.custom.customSelect.zero,
                  },
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={denom}
                onChange={handleDenom}
                error={validateDenom}
              >
                <MenuItem value={chainConfig.primaryTokenUnit}>
                  {chainConfig?.primaryTokenUnit?.toUpperCase()}
                </MenuItem>
                <MenuItem value={chainConfig.votingPowerTokenUnit}>
                  {chainConfig?.votingPowerTokenUnit?.toUpperCase()}
                </MenuItem>
              </Select>
              {validateDenom ? (
                <FormHelperText style={{ color: '#FF0000' }}>{t('required')}</FormHelperText>
              ) : (
                <></>
              )}
            </FormControl>
          </SelectBox>
        </div>

        <div className={classes.memo}>
          <Typography variant="caption" className="label">
            {t('memo')}
          </Typography>
          <div>
            <TextField
              sx={{
                input: { color: theme.palette.custom.customSelect.zero },
                '& label.Mui-focused': {
                  color: theme.palette.custom.customSelect.zero,
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: theme.palette.custom.customSelect.zero,
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.custom.customSelect.zero,
                  },
                },
              }}
              id="outlined-basic"
              variant="outlined"
              onChange={(e) => handleMemoInput(e)}
              fullWidth
              value={memoInput}
            />
          </div>
        </div>
        <div className={classes.label} style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            style={{
              float: 'left',
              minWidth: 100,
              height: 40,
              marginLeft: lang == 'ar' ? '4%' : 0,
            }}
            size="small"
            color="primary"
            onClick={check}
            startIcon={<SendIcon color="primary" />}
            className={classes.button}
            variant="contained"
          >
            <span style={{ paddingRight: lang == 'ar' ? 5 : 0 }}> {t('process')}</span>
          </Button>

          <Button
            style={{ float: 'left', minWidth: 100, marginLeft: 15, height: 40 }}
            size="small"
            color="primary"
            onClick={handleReset}
            startIcon={<RefreshIcon color="primary" />}
            variant="contained"
            disabled={loading}
            className={classes.button}
          >
            <span style={{ paddingRight: lang == 'ar' ? 5 : 0 }}> {t('reset')} </span>
          </Button>
        </div>

        <div className={classes.label}>
          {checkReciverAddress == true ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {t('SenderAddressEqualReciverAddress')}
            </Alert>
          ) : successfulTransaction == true && result == false && loading == false ? (
            <>
              <div style={{ width: '100%' }}>
                <Alert severity="success">
                  <AlertTitle>{t('transactionCompletedSuccessfully')}</AlertTitle>
                  <Typography variant="body1" className={classes.resultLabel}>
                    {t('hash')}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={classes.resultLabel}
                    style={{ maxWidth: 150 }}
                  >
                    <Link href={TRANSACTION_DETAILS(state.transactionHash)} passHref>
                      {getMiddleEllipsis(state.transactionHash, {
                        beginning: 15,
                        ending: 5,
                      })}
                    </Link>
                  </Typography>
                </Alert>
                {/*   <Typography variant="body1" className={classes.resultLabel}>
                  {t("result")}
                </Typography>
                <Result success={successfulTransaction} /> */}
              </div>

              {/*  <div style={{ display: "flex" }}>
                <Typography variant="body1" className={classes.resultLabel}>
                  {t("hash")}
                </Typography>
                <Typography
                  variant="body1"
                  className={classes.resultLabel}
                  style={{ maxWidth: 150 }}
                >
                  <Link
                    href={TRANSACTION_DETAILS(state.transactionHash)}
                    passHref
                  >
                    {getMiddleEllipsis(state.transactionHash, {
                      beginning: 15,
                      ending: 5,
                    })}
                  </Link>
                </Typography>
              </div> */}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Box>
  );
};

export default TestTransaction;
