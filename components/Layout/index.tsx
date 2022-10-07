import { ReactNode } from "react";
import withAuth from "../../utils/withAuth";
// import Header from '../Header';
// import Footer from '../Footer';

interface Props {
  children?: ReactNode;
  title?: string;
}

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  )
};

export default withAuth(Layout);
