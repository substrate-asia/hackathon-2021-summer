import * as React from "react";
import { observer } from "mobx-react-lite";
import { Helmet } from "react-helmet";

type Props = {
  title: string;
};

export const PageTitle = observer(({ title }: Props) => {
  return (
    <Helmet>
      <title>{`${title} - Domain knowledge`}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
});
