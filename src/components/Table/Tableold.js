import react, { useEffect, useState } from "react";
import React from "react";
import Popup from "./Popup";

function Table() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
  const [recordMsg, setrecordMsg] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((users) => {
          setData(users);
        });
    };
    fetchData();
  }, []);

  // useEffect(() =>{
  //   let filtered = data.filter((val) => {
  //     if(searchTerm === ""){
  //       return val;
  //     }else if(val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
  //     val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  //     ){
  //       return val;
  //     }
  //   })

  // },[])

  const renderTableHeader = () => {
    function Check() {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </div>
      );
    }

    const popup = <Popup />;

    return Object.keys(data[0])
      .filter((item) => item !== "id")
      .map((attr) => (
        <th scope="col" key={attr}>
          {attr.toUpperCase()}
        </th>
      ));
  };

  const renderTableRows = () => {
    function Check() {
      return (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
        </div>
      );
    }

    return data
      .filter((val) => {
        if (searchTerm === "") {
          return val;
        } else if (
          val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
          val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        ) {
          return val;
        }
      })
      .map((user) => {
        return (
          <tr key={user.id} className="table-row">
            {/* <th scope="rows">1</th> */}
            <td>
              <Check />
            </td>
            <td>{user.name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td
              style={{ width: "25%" }}
            >{`${user.address.street}, ${user.address.city}`}</td>
            <td style={{ width: "15%" }}>{user.phone}</td>
            <td style={{ width: "20%" }}>{user.website}</td>
            <td style={{ width: "20%" }}>{user.company.name}</td>
            <td style={{ width: "25%" }}>
              <button
                type="button"
                id="refresh-btn"
                className="btn btn-outline-primary"
              >
                Refresh Score
              </button>
            </td>
            <td id="pop-up">
              <Popup />
            </td>
          </tr>
        );
      });
  };

  function onSearchHandler(e) {
    setSearchterm(e.target.value);
    //  setResult(e.target.value);

    let filtered = data.filter((val) => {
      if (searchTerm === "") {
        return val;
      } else if (
        val.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
        val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      ) {
        return val;
      }
    });

    setResult(filtered);
    setrecordMsg(
      "Search Results For " +
        `${searchTerm}` +
        " :" +
        ` ${result.length}` +
        " Records Found!"
    );
  }

  function Check() {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
      </div>
    );
  }

  return (
    <div>
      <div className="search">
        <div className="input-group rounded">
          <input
            type="search"
            className="form-control input"
            placeholder="Search"
            aria-label="Search"
            onChange={onSearchHandler}
            aria-describedby="search-addon"
          />
          <img id="search" src="/images/search_black_24dp@2x.png"></img>
        </div>
        <div>
          <button
            type="button"
            id="filter-btn"
            className="btn btn-outline-primary"
          >
            Apply filter
          </button>
        </div>
      </div>
      {result && (
        <div style={{ backgroundColor: "#F4F4F4" }} id="record-msg">
          {recordMsg}
        </div>
      )}

      {data.length > 0 ? (
        <div className="table-container">
          <table className="table">
            <thead
              className="thead-dark"
              style={{ backgroundColor: "#BBBCBC" }}
            >
              <tr>
                <td>
                  <Check />
                </td>
                {renderTableHeader()}
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Table;

// export default className Table extends Component {
//     constructor(props) {
//       super(props)
//       this.state = {
//         users: [],
//         isLoading: false,
//         isError: false
//       }
//     }

//     async componentDidMount() {
//         this.setState({ isLoading: true })
//         const response = await fetch('https://jsonplaceholder.typicode.com/users')
//         if (response.ok) {
//           const users = await response.json()
//           this.setState({ users, isLoading: false })
//         } else {
//           this.setState({ isError: true, isLoading: false })
//         }
//       }

//       renderTableHeader = () => {
//         return Object.keys(this.state.users[0]).map(attr => <th scope="col" key={attr}>{attr.toUpperCase()}</th>)
//       }

//       renderTableRows = () => {
//         function Check(){
//         return(<div className="form-check">
//         <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></div>)}

//         return this.state.users.map(user => {
//           return (
//            <tr key={user.id}>
//             {/* <th scope="rows">1</th> */}
//             <td><Check/></td>
//             <td>{user.name}</td>
//             <td>{user.username}</td>
//             <td>{user.email}</td>
//             <td style={{width:"15%"}}>{`${user.address.street}, ${user.address.city}`}</td>
//             <td >{user.phone}</td>
//             <td >{user.website}</td>
//             <td style={{width:"25%"}}>{user.company.name}</td>
//           </tr>
//         )
//       })
//     }

//       render() {
//         const { users, isLoading, isError } = this.state

//         if (isLoading) {
//           return <div>Loading...</div>
//         }

//         if (isError) {
//           return <div>Error</div>
//         }

//         return users.length > 0
//           ? (
// <div className='table-container'>
//             <table className="table">
//             <thead className="thead-dark">
//                  <tr>
//                   {this.renderTableHeader()}
//                 </tr>
//                </thead>
//              <tbody>

//                       {this.renderTableRows()}

//                </tbody>
//          </table>
//       </div>
//           )

//           : (
//             <div>
//               No users.
//           </div>
//           )

//   }
// }
