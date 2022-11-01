import { useState } from "react";
import React from "react";
import "./Popup.css";
import OutsideClickHandler from "react-outside-click-handler";
import { useNavigate } from "react-router-dom";
const Popup = ({ userData }) => {
  const navigate = useNavigate();

  const [popUpMenu, setPopUpMenu] = useState(false);
  const toEditCreditScore = () => {
    navigate("/dashboard/generatenewcreditscore", {
      state: {
        data: userData,
        action: "update",
      },
    });
  };
  return (
    <OutsideClickHandler
      onOutsideClick={() => setPopUpMenu(false)}
      className="rd"
    >
      <img
        id="pop-up"
        onClick={() => setPopUpMenu(!popUpMenu)}
        src="/images/Group 2489@2x.png"
      />

      {popUpMenu && PopUpMenu()}
    </OutsideClickHandler>
  );

  function PopUpMenu() {
    return (
      <div className="popup-cover">
        <ul className="drop-down">
          <li onClick={toEditCreditScore}>View/Edit Details</li>
          <li>Send Email</li>
          <li>Export Report</li>
          <li>Delete Record</li>
        </ul>
      </div>
    );
  }
};
//     const [popup, setPopup] = useState(false)
//     return (
//         <div>
//         {/* The option to open the popup */}

//

//         {/* The popup itself */}

//         {popup && (
//             <div onClickAway={() => setPopup(false)}>
//                     <div>
//                         <li>Items of the Popup</li>
//                         <li>Items of the Popup</li>
//                         <li>Items of the Popup</li>
//                     </div>
//             </div>
//         )}
//         </div>
//     )
// };

export default Popup;
