
import { useState } from "react";
import axios from "axios";

function LoanForm() {

const [name, setName] = useState("");
const [age, setAge] = useState("");
const [email, setEmail] = useState("");
const [phone, setPhone] = useState("");
const [employmentStatus, setEmploymentStatus] = useState("Employed");
const [monthlyIncome, setMonthlyIncome] = useState("");
const [loanAmount, setLoanAmount] = useState("");
const [loanTenure, setLoanTenure] = useState("");
const [result, setResult] = useState(null);


const handleSubmit = async () => {

  // Frontend Validation
  if (
    !name ||
    !age ||
    !email ||
    !phone ||
    !monthlyIncome ||
    !loanAmount ||
    !loanTenure
  ) {
    alert("Please fill all the fields.");
    return;
  }

 


  try {
    const response = await axios.post(
      "http://localhost:5000/api/apply",
      {
        name,
        age,
        email,
        phone,
        employmentStatus,
        monthlyIncome,
        loanAmount,
        loanTenure,
      }
    );

   setResult(response.data);
   setName("");
setAge("");
setEmail("");
setPhone("");
setEmploymentStatus("Employed");
setMonthlyIncome("");
setLoanAmount("");
setLoanTenure("");

  } catch (error) {
    console.log(error);
  }
};

 return (
  <div className="container">
    <h2 className="title">Loan Eligibility Portal</h2>

    <div className="form-grid">
       <div className="field">
      <label className="label">Name:</label>
  
      <input className="input" 
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

   <div className="field">
      <label className="label">Age:</label>
      
      <input className="input"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </div>
 
    <div className="field">
      <label className="label">Email:</label>
 
  <input className="input"
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>
<div className="field">
  <label className="label">Phone:</label>

  <input className="input"
    type="text"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>


<div className="field">
  <label className="label">Employment Status:</label>

  <select className="input"
    value={employmentStatus}
    onChange={(e) => setEmploymentStatus(e.target.value)}
  >
    <option value="Employed">Employed</option>
    <option value="Unemployed">Unemployed</option>
  </select>
</div>




<div className="field">
  <label className="label">Monthly Income:</label>
 
  <input className="input"
    type="number"
    value={monthlyIncome}
    onChange={(e) => setMonthlyIncome(e.target.value)}
  />
</div>

<div className="field">
  <label className="label">Loan Amount:</label>

  <input className="input"
    type="number"
    value={loanAmount}
    onChange={(e) => setLoanAmount(e.target.value)}
  />
</div>
<div className="field">
  <label className="label">Loan Tenure (Months):</label>
 
  <input className="input"
    type="number"
    value={loanTenure}
    onChange={(e) => setLoanTenure(e.target.value)}
  />
</div>
 




     </div>


<button  className="button" onClick={handleSubmit}>
  Apply for Loan
</button>

{result && (
  <div className="modal-overlay">
    <div
      className="modal"
      style={{
        borderTop: result.eligible
          ? "6px solid #16a34a"
          : "6px solid #dc2626",
      }}
    >
      <h2>
        {result.eligible ? "🎉 Loan Approved" : "❌ Loan Rejected"}
      </h2>

      <p><strong>Applicant:</strong> {result.applicant.name}</p>

      <p>
        <strong>Status:</strong>{" "}
        {result.eligible ? "Eligible" : "Not Eligible"}
      </p>

      <p>
        <strong>Loan Amount:</strong> ₹{result.applicant.loanAmount}
      </p>

      <p>
        <strong>Loan Tenure:</strong> {result.applicant.loanTenure} Months
      </p>

      <p>
        <strong>Monthly Income:</strong> ₹{result.applicant.monthlyIncome}
      </p>

      <p>
        <strong>Reason:</strong> {result.reason}
      </p>

      <button
        className="close-btn"
        onClick={() => setResult(null)}
      >
        Done ✓
      </button>
    </div>
  </div>
)}
  </div>
);
}

export default LoanForm;