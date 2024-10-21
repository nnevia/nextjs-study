import Link from 'next/link';
import classes from './button.module.css';
export default function Button({ link, children }) {
  return (
    <Link className={classes.btn} href={link}>
      {children}
    </Link>
  );
}
