import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { lang } from "lang/locales";
import TableRow from "widgets/list-table/table-row";
import TableRowHeader from "widgets/list-table/table-row-header";
import { column, expand, rowMiddle } from "@worktools/flex-styles";
import FavouriteControl from "pages/manage/favourite-control";
import { genRouter } from "controller/generated-router";
import ListTable from "widgets/list-table";

let DomainListTable: FC<{ className?: string }> = React.memo((props) => {
  /** Plugins */
  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <ListTable
      className={props.className}
      header={<TableRowHeader title0={lang.exactly_match} title1={lang.expires_date} titleLast={"TODO"} lastColClassName={styleLast} />}
    >
      {["TODO", "a.a", "b.b", "c.c", "d.d"].map((k) => {
        return (
          <TableRow
            cell0={k}
            cell1={"2021-05-24T11:00:18.145Z"}
            cellLast={<FavouriteControl domain={"a.a"} />}
            lastColClassName={styleLast}
            onClick={(c0) => {
              genRouter.manage_.details.go("TODO"); // TODO move props
            }}
            key={k}
          />
        );
      })}
    </ListTable>
  );
});

export default DomainListTable;

let styleResults = css`
  /* White/fff */

  background: #ffffff;
  /* White/200 */

  border: 1px solid #eeeeee;
  /* Card */

  box-shadow: 0px 4px 12px -2px rgba(7, 19, 39, 0.03), 0px 3px 3px -2px rgba(7, 19, 39, 0.03), 0px 1px 2px -4px rgba(7, 19, 39, 0.02);
  border-radius: 8px;
`;

let styleColumn1 = css`
  width: 40%;
`;

let styleLast = css`
  width: 60px;
  text-align: right;
`;

let styleTableBody = css`
  max-height: 80vh;
`;
