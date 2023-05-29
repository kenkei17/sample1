
import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const[name, setName] = useState('');
  const[datetime, setDatetime] =useState('');
  const[description,setDescription]=useState('');
  const[transactions, setTransactions]=useState('');
  useEffect(()=>{
      getTransactions().then(transactions=>{
      setTransactions(transactions);
    });
  }, []);
  async function getTransactions(){
    const url = "http://localhost:4000/api" + "/transactions"
    const response = await fetch(url);
    return await response.json();
  }
  function addNewTransaction(ev){
    ev.preventDefault();
    const url = "http://localhost:4000/api" + "/transaction";
    const price = name.split(' ')[0]; 
    fetch(url, {
      method:"POST",
      headers:{"Content-type":"application/json"},
      body:JSON.stringify({
        price,
        name: name.substring(price.length + 1),
        description,
        datetime})
    }).then(response=>{response.json().then(json=>
        {
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result:', json);
        });
    });
    
  }
  let balance = 0;
  for(const transaction of transactions){
    balance = balance + transaction.price;
  }
  balance = balance.toFixed(2);
  const fraction=balance.split('.')[1];
  balance=balance.split('.')[0];
  return (
    <main>
      <h1>${balance}<span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basic'>
          <input type="text" 
                 placeholder={"+200 new samsung TV"}
                 value={name}
                 onChange={ev=> setName(ev.target.value)}
                 />
          <input type="datetime-local" 
                 value={datetime}
                 onChange={ev=>setDatetime(ev.target.value)}
                 />
        </div>
        <div className='description'>
          <input type="text" 
                 placeholder={"description"}
                 value={description}
                 onChange={ev=>setDescription(ev.target.value)}
          />
        </div>
        <button type='submit'>Add new transaction</button>
        {transactions.length}
      </form>
      <div className="transactions">
        {transactions.length>0&&transactions.map(transaction=>(
          <div className="transaction">
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={"price "+(transaction.price<0?'red':'green')}>{transaction.price}</div>
            <div className="datetime">2022-12-18 15:31</div>
          </div>
          </div>
        ))}
        <div className="transaction">
          <div className="left">
            <div className="name">New Samsung TV</div>
            <div className="description">It was time for new TV</div>
          </div>
          <div className="right">
            <div className="price red">-$500</div>
            <div className="datetime">2022-12-18 15:31</div>
          </div>
        </div>
        {/* <div className="transaction">
          <div className="left">
            <div className="name">Cherry Mobile</div>
            <div className="description">It was time for new TV</div>
          </div>
          <div className="right">
            <div className="price green">+$500</div>
            <div className="datetime">2022-12-18 15:31</div>
          </div>
        </div> */}
      </div>
    </main>
  );
}

export default App;
