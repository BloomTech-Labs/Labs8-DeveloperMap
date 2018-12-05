import styled from 'styled-components';

export const AppStyle = styled.div`
  .fade-enter {
    opacity: 0;

    .modal {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: all 500ms ease-in;

    .modal {
      transform: scale(1);
      opacity: 1;
      transition: all 500ms ease-in;
    }
  }

  .fade-exit {
    opacity: 1;

    .modal {
      transform: scale(1);
    }
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: all 500ms ease-in;

    .modal {
      opacity: 0;
      transform: scale(0);
      transition: all 500ms ease-in;
    }
  }
`;
