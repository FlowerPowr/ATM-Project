const ATMDeposit = ({ onChange, isDeposit, isValid }) => {//component function which returns onChange or isDeposit
  const choice = ['Deposit', 'Cash Back'];// list an array of two "choices"
  console.log(`ATM isDeposit: ${isDeposit}`);//returns isDeposit to console
  return (
    <label className="label huge"> 
      <h3> {choice[Number(!isDeposit)]}</h3>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" disabled={!isValid} width="200" value="Submit" id="submit-input"></input>
    </label>
  );
};

//Tracks account activity: deposit, totalState & isDeposit to 
const Account = () => { //Account variable is an anonymous function which holds 3 arrays 
  const [deposit, setDeposit] = React.useState(0);//sets local component variable to 0 
  const [totalState, setTotalState] = React.useState(0); //sets local component variable to 0 
  const [isDeposit, setIsDeposit] = React.useState(true); //sets local component variable to true 
  const [atmMode, setAtmMode] =  React.useState("");
  const [validTransaction, setValidTransaction] = React.useState(false);




  let status = `Account Balance $ ${totalState} `; // logs totalState balance
  console.log(`Account Rendered with isDeposit: ${isDeposit}`); //logs is Deposit
  const handleChange = (event) => { //accesses changing user inputs 
    console.log(Number(event.target.value)); //outputs new value
    if (Number(event.target.value) <= 0){
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value)> totalState) {//doesnt allow you to withdraw more than your balance 
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(event.target.value));// 
  };
  const handleSubmit = (event) => { //accesses  user submit
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit; // Instead of throwing the error, the output will be undefined if less than 0 
    setTotalState(newTotal);//updates new setTotalState 
    setValidTransaction(false); //idk 
    event.preventDefault();//prevents automatic refreshing of page
  };
  
  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    if(event.target.value === 'Deposit'){
      setIsDeposit(true);
    } else {
      setIsDeposit(false);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
       <>
        <h2 id="total">{status}</h2>
        <label>Select an action below to continue</label>
        <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">
          Deposit
          </option>
          <option id="cashback-selection" value="Cash Back">
          Cash Back
          </option>
        </select>
        {atmMode && (
          <ATMDeposit
            onChange={handleChange} //the mode the user chooses will = the user imputs
            isDeposit={isDeposit} //main varible user is inputing 
            isValid={validTransaction} //?
            ></ATMDeposit>
        )}
      </>  
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));

