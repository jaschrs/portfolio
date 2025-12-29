import styled from 'styled-components';

function Card(){
  return (
    <StyledWrapper>
      <div className="container">
        <div className="box">
          <span className="title">Jasper Christian</span>
          <div>
            <strong>JOE WATSON SBF</strong>
            <p>0000 000 000 0000</p>
            <span>VALID</span> <span>01/28</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container .box {
    width: 20em;
    height: 30em;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.074);
    border: 1px solid rgba(255, 255, 255, 0.222);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 0.7rem;
    transition: all ease 0.3s;
  }

  .container .box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .container .box .title {
    font-size: 150%;
    font-weight: 500;
    letter-spacing: 0.1em;
    font-family: 'JetBrains';
    align-self: center;
  }

  .container .box div strong {
    display: block;
    margin-bottom: 0.5rem;
  }

  .container .box div p {
    margin: 0;
    font-size: 0.9em;
    font-weight: 300;
    letter-spacing: 0.1em;
  }

  .container .box div span {
    font-size: 0.7rem;
    font-weight: 300;
  }

  .container .box div span:nth-child(3) {
    font-weight: 500;
    margin-right: 0.2rem;
  }

  .container .box:hover {
    box-shadow: 0px 0px 20px 1px #6648a13f;
    border: 1px solid rgba(64, 33, 165, 0.45);
  }`;

export default Card;