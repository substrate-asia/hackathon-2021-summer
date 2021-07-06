import React, { FC } from "react";
import { css, cx } from "@emotion/css";
import { expand, rowMiddle, rowParted, Space } from "@worktools/flex-styles";
import StatusTag from "widgets/status-tag";
import FavouriteControl from "./favourite-control";
import ListTable from "widgets/list-table";
import TableRowHeader from "widgets/list-table/table-row-header";
import TableRow from "widgets/list-table/table-row";
import { lang } from "lang/locales";
import { genRouter } from "controller/generated-router";
import DomainTitle from "./details/domain-title";
import { MoreVertical, Plus } from "react-feather";
import { ThemeColor } from "styles/colors";
import { useAddDomainModal } from "./subdomains/add-domain";
import { DropdownArea } from "@worktools/dropdown";

let SubDomains: FC<{ className?: string; viewOnly?: boolean }> = React.memo((props) => {
  /** Plugins */

  let transferPlugin = useAddDomainModal({
    afterChange: () => {
      console.log("TODO");
    },
  });

  /** Methods */
  /** Effects */
  /** Renderers */
  return (
    <div className={cx(expand, props.className)}>
      <DomainTitle domain={"TODO"} />
      <Space height={16} />
      <ListTable
        emptyLocale={lang.no_subdomains}
        header={
          <TableRowHeader
            title0={lang.subdomains}
            titleLast={
              <div
                className={cx(rowMiddle, styleLink)}
                onClick={() => {
                  transferPlugin.edit();
                }}
              >
                <span>{lang.add_subdomain}</span>
                <Space width={8} />
                <Plus color={ThemeColor.cerise500} size={14} />
              </div>
            }
          />
        }
      >
        {["TODO", "TODO2"].map((k) => {
          return (
            <TableRow
              cell0={k}
              cellLast={
                <div
                  className={cx(rowMiddle, styleArea)}
                  onClick={(event) => {
                    event.stopPropagation(); // dont trigger navigate event
                  }}
                >
                  <FavouriteControl domain={k} />
                  <Space width={8} />

                  <DropdownArea
                    title={null}
                    renderContent={(onClose) => {
                      return (
                        <div
                          className={styleListItem}
                          onClick={(event) => {
                            console.log("TODO delete", k);
                            onClose();
                          }}
                        >
                          {lang.delete_subdomains}
                        </div>
                      );
                    }}
                    cardClassName={styleCard}
                    width={188}
                    alignToRight
                    hideClose
                  >
                    <MoreVertical className={styleIcon} size={16} color={ThemeColor.cerise500} onClick={(event) => {}} />
                  </DropdownArea>
                </div>
              }
              key={k}
              onClick={(event) => {
                genRouter.manage_.details.go("TODO");
              }}
            />
          );
        })}
      </ListTable>
      {transferPlugin.ui}
    </div>
  );
});

export default SubDomains;

let styleLink = css`
  cursor: pointer;
`;

let styleIcon = css`
  cursor: pointer;
`;

let styleCard = css`
  min-height: 60px;
  padding: 10px 0;

  min-width: 188px;
`;

let styleListItem = css`
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  cursor: pointer;

  font-weight: 500;
  font-size: 16px;

  display: flex;
  align-items: center;

  /* Red/500 */

  color: #e84d48;

  &:hover {
    background: #fff8f8;
  }
`;

let styleArea = css`
  padding: 4px 8px; /* 多余的空间避免误触 */
  margin-right: -8px;
`;
