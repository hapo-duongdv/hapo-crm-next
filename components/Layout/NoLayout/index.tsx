import { ReactNode } from "react";
import withAuth from "../../../utils/withAuth";

interface Props {
  children?: ReactNode;
  title?: string;
}

const NoLayout = ({ children }: Props): JSX.Element => {
  return (
    <div>
      {children}
    </div>
  )
};

export default withAuth(NoLayout);
