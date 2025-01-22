
const GenderCheckbox = ({onCheckboxChange, selectedGender}) => {
  return (
     <div className="flex">

      <div className="form-control">
      <label className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""}`}>
        {/* If the selected gender in here is male, then it will have "selected" class - only if the checkbox of male is selected */}
        <span className="label-text"> Male </span>
        <input type="checkbox"
        className="checkbox border-slate-900"
        checked = {selectedGender === "male"} 
        onChange = {() => onCheckboxChange("male")}/>
      </label>
      </div>

      <div className="form-control">
      <label className={`label gap-2 cursor-pointer ${selectedGender === "female" ? "selected" : ""}`}>
        {/* Same here, so there won't be 2 selected checkboxes*/}
        <span className="label-text"> Female </span>
        <input type="checkbox"
        className="checkbox border-slate-900"
        checked = {selectedGender === "female"}
        onChange = {() => onCheckboxChange("female")}/>
      </label>
      </div>

     </div>

  )
}

export default GenderCheckbox