import { useRouter } from "next/router";
import { ReactNode } from "react";
import withAuth from "../../../utils/withAuth";
// import Header from '../../Header'

interface Props {
  children?: ReactNode;
  title?: string;
}

const NoFooter = ({ children }: Props): JSX.Element => {
  const router = useRouter();
  return (
    <div>
      {/* <Header noOption={router.pathname.includes('/chat') ? false : true}/> */}
      {children}
    </div>
  )
};

export default withAuth(NoFooter);
