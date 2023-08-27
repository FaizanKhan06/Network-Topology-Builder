import React, { useState } from 'react'

export default function MenuBtn(props) {
  // eslint-disable-next-line
  const [jsonData, setJsonData] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const uploadedData = JSON.parse(e.target.result);
        console.log('Uploaded JSON data:', uploadedData);
        setJsonData(uploadedData);
        const encodedData = encodeURIComponent(JSON.stringify(uploadedData));
        const urlWithQuery = `${window.location.href.split("?")[0]}/?data=${encodedData}`;
        console.log(urlWithQuery);
        window.history.pushState(null, null, urlWithQuery);
        window.location.reload();
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      {
        (props.btn_name === "View")?
        <>
            {/**/}
            <label className="input_field_file">
              <input type="file" accept=".json" onChange={handleFileChange}/>
              <span style={{color: "var(--primary_color2)",display:"flex",alignItems:"center",width: "100%", height:"100%"}}>
                <span className="material-symbols-outlined">{props.btn_icon}</span>
                {props.btn_name}
              </span>
            </label>
        </>
        :
        <button className='menu_btn' onClick={props.onClick}>
        <span className="material-symbols-outlined">{props.btn_icon}</span>
          {props.btn_name}
        </button>
      }
    </>
  )
}