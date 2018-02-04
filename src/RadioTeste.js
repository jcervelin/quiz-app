import React from 'react';

function RadioTeste(props) {

  return (
    <div>
      <form name="FormRadioTeste" onSubmit={props.escolha}>
        {props.questoes.map(questao => {
          return (
            <div style={{ textAlign: 'center' }} key={questao.id}>
              {questao.alternatives.map(alternative => {
                return (
                  <div key={alternative}>
                    <input type="radio" name={questao.name} value={alternative} />
                    <label htmlFor={alternative} name={alternative}>{alternative}</label>
                    <br />
                  </div>
                )
              })}

            </div>
          )
        })}
        <button value="OK">OK</button>
      </form>
    </div>)
}

export default RadioTeste;   