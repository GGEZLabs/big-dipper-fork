// import chainConfig from '@/chainConfig';
import useStyles from '@/components/ChainIcon/useStyles';
import Image, { type ImageProps } from 'next/image';

interface IconProps extends Omit<ImageProps, 'id' | 'src'> {
  type: 'icon' | 'logo';
  chainName?: string;
}

const ChainIcon = ({ className, type, ...props }: IconProps) => {
  // const {previewImage} = chainConfig()
  const { classes, cx } = useStyles();
  return (
    <span className={cx(className, classes.container)}>
      {type === 'icon' ? (
        <Image
          width={30}
          height={30}
          src="https://ggez.one/images/favicon.png?sanitize=true"
          {...props}
          className={classes.light}
          unoptimized
        />
      ) : (
        <Image
          width={30}
          height={30}
          src="https://ggez.one/images/logo.png?sanitize=true"
          {...props}
          className={classes.light}
          unoptimized
        />
      )}
      {/* <Image
        width={0}
        height={0}
        src={iconLight}
        {...props}
        className={classes.light}
        unoptimized
      /> */}
    </span>
  );
};

export default ChainIcon;
