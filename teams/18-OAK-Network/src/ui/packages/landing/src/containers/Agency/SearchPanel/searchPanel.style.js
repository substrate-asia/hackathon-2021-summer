import styled from 'styled-components';

const SearchPanelWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  .reusecore__input {
    .field-wrapper {
      input {
        border: 0;
        border-radius: 5px;
        height: 70px;
        box-shadow: 0 3px 20px rgba(35, 49, 90, 0.08);
        color: #20201d;
        font-size: 16px;
        font-weight: 400;
        padding-left: 39px;
        padding-right: 80px;
        &:placholder {
          color: rgba(32, 32, 29, 0.5);
        }
      }
      .input-icon {
        width: 80px;
        height: 100%;
        > div {
          svg {
            width: 28px;
            height: 28px;
            path {
              fill: #20201d;
            }
          }
        }
      }
    }
  }
`;

export default SearchPanelWrapper;
