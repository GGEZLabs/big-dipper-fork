import React from 'react';
import Typography from '@mui/material/Typography';
import useStyles from './styles';

const SingleBlock: React.FC<{
  className?: string;
  label: string;
  value: string;
  description?: string;
}> = ({ className, label, value, description }) => {
  const { classes, cx } = useStyles();

  return (
    <div className={cx(classes.root, className)}>
      <Typography variant="body2" className="label">
        {label}
      </Typography>
      <div className="content">
        <Typography variant="h1">{value}</Typography>
        {!!description && (
          <Typography variant="caption" className="description">
            {description}
          </Typography>
        )}
      </div>
    </div>
  );
};

export default SingleBlock;
