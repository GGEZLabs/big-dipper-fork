import LinearProgress from '@mui/material/LinearProgress';
import useStyles from '@/screens/initial_load/styles';
import ChainIcon from '@/components/ChainIcon';

const InitialLoad = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <ChainIcon type="logo" className={classes.logo} alt="logo" />
        <LinearProgress className={classes.divider} />
      </div>
    </div>
  );
};

export default InitialLoad;
