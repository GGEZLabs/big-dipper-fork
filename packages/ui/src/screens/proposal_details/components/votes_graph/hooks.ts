/* eslint-disable no-console */
import Big from 'big.js';
import { useRouter } from 'next/router';
import * as R from 'ramda';
import { useCallback, useState } from 'react';
import chainConfig from '@/chainConfig';
import {
  ProposalDetailsTallyQuery,
  useProposalDetailsTallyQuery,
} from '@/graphql/types/general_types';
import type { VotesGraphState } from '@/screens/proposal_details/components/votes_graph/types';
import { formatToken } from '@/utils/format_token';

const { votingPowerTokenUnit } = chainConfig();

const defaultTokenUnit: TokenUnit = {
  value: '0',
  baseDenom: '',
  displayDenom: '',
  exponent: 0,
};

export const useVotesGraph = () => {
  const router = useRouter();
  const [state, setState] = useState<VotesGraphState>({
    votes: {
      yes: defaultTokenUnit,
      no: defaultTokenUnit,
      abstain: defaultTokenUnit,
      veto: defaultTokenUnit,
    },
    bonded: defaultTokenUnit,
    quorum: '0',
  });

  const handleSetState = useCallback(
    (stateChange: (prevState: VotesGraphState) => VotesGraphState) => {
      setState((prevState) => {
        const newState = stateChange(prevState);
        return R.equals(prevState, newState) ? prevState : newState;
      });
    },
    []
  );

  useProposalDetailsTallyQuery({
    variables: {
      proposalId: parseFloat((router?.query?.id as string) ?? '0'),
    },
    onCompleted: (data) => {
      handleSetState((prevState) => ({ ...prevState, ...foramtProposalTally(data) }));
    },
  });

  const foramtProposalTally = (data: ProposalDetailsTallyQuery) => {
    const quorumRaw = data.quorum?.[0]?.tallyParams?.quorum ?? '0';

    return {
      votes: {
        yes: formatToken(
          Number(data?.proposalTallyResult?.[0]?.yes) / 1000000 ?? '0',
          votingPowerTokenUnit
        ),
        no: formatToken(
          Number(data?.proposalTallyResult?.[0]?.no) / 1000000 ?? '0',
          votingPowerTokenUnit
        ),
        veto: formatToken(
          Number(data?.proposalTallyResult?.[0]?.noWithVeto) / 1000000 ?? '0',
          votingPowerTokenUnit
        ),
        abstain: formatToken(
          Number(data?.proposalTallyResult?.[0]?.abstain) / 1000000 ?? '0',
          votingPowerTokenUnit
        ),
      },
      bonded: formatToken(
        Number(data?.stakingPool?.[0]?.bondedTokens) / 1000000 ?? '0',
        votingPowerTokenUnit
      ),
      quorum: Big(quorumRaw)?.times(100).toFixed(2),
    };
  };

  return {
    state,
  };
};
