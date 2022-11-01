import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import { appConfig } from "../../Config";
import Alert from "../alert/Alert";
import StaticData from "../staticData/StaticData";
import Popup from "./Popup";
import "./Table.css";
var axios = require("axios");

function TableComponent({ data }) {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [filteredData, setFilteredData] = useState(data);
  const [staticData, setStaticData] = useState(
    StaticData ? StaticData.staticData : ""
  );

  const [netMonthlyIncome, setNetMonthlyIncome] = useState(
    staticData ? staticData.netMonthlyIncome : []
  );
  const [incomeDebtRatio, setIncomeDebtRatio] = useState(
    staticData ? staticData.incomeDebtRatio : []
  );
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [ages, setAge] = useState(staticData ? staticData.ages : []);
  const [search, setSearch] = useState("");
  const [selectedData, setSelecteddata] = React.useState();
  const [mockData, setmockData] = useState([]);
  const [state, setState] = React.useState({
    right: false,
  });
  const userToken = localStorage.getItem("awesomeLeadsToken");
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  useEffect(() => {
    getCreditScoreData();
  }, []);

  //   useEffect(() => {
  //     const fetchData = () => {
  //       fetch("http://65.0.55.164/users/history")
  //         .then((response) => response.json())
  //         .then((users) => {
  //           setmockData(users);
  //           setFilteredData(users);
  //         });
  //     };
  //     fetchData();
  //   }, []);
  function getCreditScoreData() {
    var headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${userToken}`,
    };
    axios
      .get(`${appConfig.baseURL}users/history`, {
        headers,
      })
      .then(function (response) {
        localStorage.setItem(
          "user",
          response.data ? response.data.username : ""
        );
        let reports = [];
        let num = 0;
        let highRiskReports = [];
        let lowRiskReports = [];
        for (let i = 0; i < response.data.Customers.length; i++) {
          for (
            let j = 0;
            j < response.data.Customers[i].Predictions.length;
            j++
          ) {
            num += +response.data.Customers[i].Predictions[j].CreditScore;
            if (j === 2) {
              console.log(num / 3);
            }

            if (j === 0) {
              reports.push({
                ...response.data.Customers[i],
                ConfidenceScore: response.data.Customers[i].Predictions[j]
                  .CreditScore
                  ? response.data.Customers[i].Predictions[j].CreditScore
                  : 0,
                PredictedLabel: response.data.Customers[i].Predictions[j]
                  .PredictedLabel
                  ? response.data.Customers[i].Predictions[j].PredictedLabel
                  : 0,
                averageScore: num ? num.toFixed(2) + "%" : 0,
              });
            }
          }
        }
        setmockData(reports);
        setFilteredData(reports);
      })
      .catch(function (error) {});
  }
  useEffect(() => {
    if (search.length > 0) {
      const result = filteredData.filter((item) => {
        return (
          item.Name.toLowerCase().match(search.toLowerCase()) ||
          item.Email.toLowerCase().match(search.toLowerCase())
        );
      });
      setFilteredData(result);
    } else {
      getCreditScoreData();
    }
  }, [search]);

  const columns = [
    {
      name: <div style={{ marginBottom: "15px" }}>Name</div>,
      selector: (row) => row.Name,
      sortable: true,
    },
    {
      name: <div style={{ marginBottom: "15px" }}>Email</div>,
      selector: (row) => row.Email,
      width: "140px",
    },

    {
      name: <div style={{ marginBottom: "15px" }}>Age</div>,
      selector: (row) => row.Age,
      width: "100px",
    },
    {
      name: <div>Occupation Category</div>,
      selector: (row) => row.Occupation,
      height: "100px",
    },
    {
      name: <div>Net Monthly Income (INR)</div>,
      selector: (row) => row.NetMonthlyIncome,
    },
    {
      name: <div>Income To Debt Ratio</div>,
      selector: (row) => {
        let ratio = (row.MonthlySpend / row.NetMonthlyIncome) * 100;
        ratio = ratio ? ratio.toFixed(2) : 0;
        return ratio + "%";
      },
    },
    {
      name: <div>Score Last Updated</div>,
      selector: (row) => "10/18/2022",
    },
    {
      name: <div style={{ marginBottom: "15px" }}>Score</div>,

      selector: (row) => row.ConfidenceScore,

      width: "100px",
    },
    // {
    //   name: <div style={{ marginBottom: "15px" }}>Average Score</div>,

    //   selector: (row) => row.averageScore,

    //   width: "100px",
    // },
    {
      name: "",
      selector: (row) => (
        <button
          onClick={() =>
            navigate("/dashboard/generatenewcreditscore/riskreportdb", {
              state: {
                data: { row },
              },
            })
          }
          id="refresh-btn"
          className="btn btn-primary"
        >
          View Score
        </button>
      ),
    },
    {
      name: "",
      selector: (row) => <Popup userData={row} />,
    },
  ];

  const handleChange = (state) => {
    setSelecteddata(state.selectedRows[0]);
  };
  const clearFilter = () => {
    setSelectedFilter([]);
    netMonthlyIncome.map((netMnthIncom) => {
      netMnthIncom.isSelect = false;
    });
    setNetMonthlyIncome([...netMonthlyIncome]);
    incomeDebtRatio.map((debtRatio) => {
      debtRatio.isSelect = false;
    });
    setIncomeDebtRatio([...incomeDebtRatio]);
    ages.map((age) => {
      age.isSelect = false;
    });
    setAge([...incomeDebtRatio]);
    getCreditScoreData();
  };

  const onChange = (e, data, index) => {
    let filterOptions = selectedFilter;
    console.log("selectedFilter length ", selectedFilter.length);
    if (data.type === "netMnthIncom") {
      netMonthlyIncome.map((monthlyIncome, i) => {
        if (monthlyIncome.value == data.value && e.target.checked === true) {
          monthlyIncome.isSelect = e.target.checked;
          // const indexOfObject = selectedFilter.findIndex((object) => {
          //   return object.value !== data.value;
          // });

          // selectedFilter.splice(indexOfObject, 1);
          // setSelectedFilter(selectedFilter);
          filterOptions.push({
            value: data.value,
            type: data.type,
            isSelect: true,
            min: data.min,
            max: data.max,
          });
          setSelectedFilter(filterOptions);
          setNetMonthlyIncome([...netMonthlyIncome]);
        } else {
          monthlyIncome.isSelect = false;
          // if (
          //   selectedFilter.length > 0 &&
          //   selectedFilter[index].isSelect === false
          // ) {
          var index = selectedFilter.indexOf(selectedFilter[index]);
          const index1 = selectedFilter.findIndex((object) => {
            return object.value === data.value;
          });
          if (index1 !== -1 && data.isSelect === false) {
            selectedFilter.splice(index1, 1);
          }
          setSelectedFilter(selectedFilter);
          console.log("selectedFilter ", selectedFilter.length);
          // }
          if (selectedFilter.length === 0) {
            getCreditScoreData();
          }
          setNetMonthlyIncome([...netMonthlyIncome]);
        }
      });
    }
    if (data.type === "debtRatio") {
      incomeDebtRatio.map((debtRatio, i) => {
        if (debtRatio.value == data.value && e.target.checked === true) {
          // setSelectedFilterData(e.target.checked, data);
          debtRatio.isSelect = e.target.checked;
          // const indexOfObject = selectedFilter.findIndex((object) => {
          //   return object.value !== data.value;
          // });

          // selectedFilter.splice(indexOfObject, 1);
          // setSelectedFilter(selectedFilter);
          filterOptions.push({
            value: data.value,
            type: data.type,
            isSelect: true,
            min: data.min,
            max: data.max,
          });
          setSelectedFilter(filterOptions);
          setIncomeDebtRatio([...incomeDebtRatio]);
        } else {
          debtRatio.isSelect = false;
          var index = selectedFilter.indexOf(selectedFilter[index]);
          const index1 = selectedFilter.findIndex((object) => {
            return object.value === data.value;
          });
          if (index1 !== -1 && data.isSelect === false) {
            selectedFilter.splice(index1, 1);
          }
          setSelectedFilter(selectedFilter);
          if (selectedFilter.length === 0) {
            getCreditScoreData();
          }
          setIncomeDebtRatio([...incomeDebtRatio]);
        }
      });
    }

    if (data.type === "Age") {
      ages.map((age, i) => {
        if (age.value == data.value && e.target.checked === true) {
          // setSelectedFilterData(e.target.checked, data);
          age.isSelect = e.target.checked;
          // const indexOfObject = selectedFilter.findIndex((object) => {
          //   return object.value !== data.value;
          // });

          // selectedFilter.splice(indexOfObject, 1);
          // setSelectedFilter(selectedFilter);
          filterOptions.push({
            value: data.value,
            type: data.type,
            isSelect: true,
            min: data.min,
            max: data.max,
          });
          setSelectedFilter(filterOptions);
          setAge([...ages]);
        } else {
          // setSelectedFilterData(false, data);
          age.isSelect = false;
          var index = selectedFilter.indexOf(selectedFilter[index]);
          const index1 = selectedFilter.findIndex((object) => {
            return object.value === data.value;
          });
          if (index1 !== -1 && data.isSelect === false) {
            selectedFilter.splice(index1, 1);
          }
          setSelectedFilter(selectedFilter);
          if (selectedFilter.length === 0) {
            getCreditScoreData();
          }
          setAge([...ages]);
        }
      });
    }
  };

  const getFilterData = () => {
    let filterLength = selectedFilter.length;
    let customizeFilter = [];

    for (let i = 0; i < filteredData.length; i++) {
      let ratio =
        (filteredData[i].MonthlySpend / filteredData[i].NetMonthlyIncome) * 100;
      ratio = ratio ? ratio.toFixed(2) : 0;
      for (let j = 0; j < selectedFilter.length; j++) {
        if (
          filteredData[i].NetMonthlyIncome >= selectedFilter[j].min &&
          filteredData[i].NetMonthlyIncome <= selectedFilter[j].max &&
          selectedFilter[j].type === "netMnthIncom"
        ) {
          customizeFilter.push(filteredData[i]);
        } else if (
          ratio >= selectedFilter[j].min &&
          ratio <= selectedFilter[j].max &&
          selectedFilter[j].type === "debtRatio"
        ) {
          customizeFilter.push(filteredData[i]);
        } else if (
          filteredData[i].Age >= selectedFilter[j].min &&
          filteredData[i].Age <= selectedFilter[j].max &&
          selectedFilter[j].type === "Age"
        ) {
          customizeFilter.push(filteredData[i]);
        }
      }
    }

    setFilteredData(customizeFilter);
  };
  return (
    <div style={{ padding: "0 45px" }} className="tbl-cmpnt">
      <DataTable
        //   title="userdata"
        columns={columns}
        data={filteredData}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="330px"
        selectableRows
        // selectableRowsHighlight
        highlightOnHover
        onSelectedRowsChange={handleChange}
        subHeader
        subHeaderComponent={
          <>
            <div className="search-header">
              <input
                type="text"
                placeholder="Search"
                id="search"
                className="w-100 form-control"
                value={search}
                // onChange={handleFilterTextChange}
                onChange={(e) => setSearch(e.target.value)}
              ></input>
              <React.Fragment>
                <button
                  type="button"
                  id="filter-btn"
                  className="btn btn-outline-primary"
                  // onClick={appySearch}
                  onClick={toggleDrawer("right", true)}
                >
                  Apply filter
                </button>
                {/* <Button onClick={toggleDrawer("right", true)}>right</Button> */}
                <Drawer
                  anchor="right"
                  open={state["right"]}
                  onClose={toggleDrawer("right", false)}
                >
                  <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    // onClick={toggleDrawer("right", false)}
                    // onKeyDown={toggleDrawer("right", false)}
                  >
                    <Row>
                      <Col md={5}>
                        {" "}
                        <ListItem>
                          <h4 className="filter-title">
                            <b>Filters</b>
                          </h4>
                        </ListItem>
                      </Col>
                      {selectedFilter.length > 0 ? (
                        <>
                          <Col md={3}>
                            <button
                              className="filter-apply"
                              onClick={getFilterData}
                            >
                              Apply
                            </button>
                          </Col>
                          <Col md={4}>
                            {" "}
                            <button
                              className="filter-clear"
                              onClick={clearFilter}
                            >
                              Clear All
                            </button>
                          </Col>
                        </>
                      ) : (
                        ""
                      )}
                    </Row>
                    {selectedFilter.length > 0 ? (
                      <Row>
                        {selectedFilter.map((filter) => {
                          return (
                            <Col md={9} style={{ padding: "5px 20px" }}>
                              <div className="user-selected-filter-option">
                                <span className="filter-value">
                                  {filter.value}
                                </span>
                                &nbsp;
                                {/* <span>
                                  <HighlightOffIcon className="filter-remove" />
                                </span> */}
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    ) : (
                      ""
                    )}

                    <Divider />
                    <List>
                      {[
                        "Net monthly Income",
                        "Income debt Ratio",
                        "Age",
                        "Occupation",
                        "Status",
                      ].map((text, index) => (
                        <>
                          <ListItem key={text} disablePadding>
                            <ListItemButton>
                              <ListItemText primary={text} />
                            </ListItemButton>
                          </ListItem>

                          <div className="">
                            {text === "Net monthly Income" ? (
                              <>
                                {netMonthlyIncome.map((monthlyIncome, i) => {
                                  return (
                                    <span className="checkbox_options">
                                      <input
                                        type="checkbox"
                                        checked={monthlyIncome.isSelect} // use checked to have a controlled component
                                        onChange={(e) =>
                                          onChange(e, monthlyIncome, i)
                                        }
                                      ></input>
                                      <span>{monthlyIncome.value}</span>
                                    </span>
                                  );
                                })}
                                <Divider />
                              </>
                            ) : text === "Income debt Ratio" ? (
                              <>
                                {incomeDebtRatio.map((incomeDebtRatio, i) => {
                                  return (
                                    <span className="checkbox_options">
                                      <input
                                        type="checkbox"
                                        checked={incomeDebtRatio.isSelect} // use checked to have a controlled component
                                        onChange={(e) =>
                                          onChange(e, incomeDebtRatio, i)
                                        }
                                      ></input>
                                      <span>{incomeDebtRatio.value}</span>
                                    </span>
                                  );
                                })}
                                <Divider />
                              </>
                            ) : text === "Age" ? (
                              <>
                                {ages.map((age, i) => {
                                  return (
                                    <span className="checkbox_options">
                                      <input
                                        type="checkbox"
                                        checked={age.isSelect} // use checked to have a controlled component
                                        onChange={(e) => onChange(e, age, i)}
                                      ></input>
                                      <span>{age.value}</span>
                                    </span>
                                  );
                                })}
                                <Divider />
                              </>
                            ) : text === "Occupation" ? (
                              <>
                                <select className="select-options">
                                  <option value="">Selct Occupation</option>
                                  {staticData.qualificationType.map(
                                    (occupation) => {
                                      return (
                                        <option value={occupation}>
                                          {occupation}
                                        </option>
                                      );
                                    }
                                  )}
                                </select>
                                <Divider />
                              </>
                            ) : text === "Status" ? (
                              <>
                                <select className="select-options">
                                  <option value="">Selct status</option>
                                </select>
                                <Divider />
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </>
                      ))}
                    </List>

                    {/* <List>
                    {["All mail", "Trash", "Spam"].map((text, index) => (
                      <ListItem key={text} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List> */}
                  </Box>
                </Drawer>
              </React.Fragment>
            </div>
            {selectedFilter.length > 0 ? (
              <div className="filter-content-box">
                {selectedFilter.map((filter) => {
                  return (
                    // <Col md={4} style={{ padding: "5px 20px" }}>
                    <div className="user-selected-filter-option-tbl">
                      <span className="filter-key">
                        {filter.type === "netMnthIncom"
                          ? "Net monthly Income"
                          : filter.type === "debtRatio"
                          ? "Income debt Ratio"
                          : filter.type === "Age"
                          ? "Age"
                          : ""}
                      </span>
                      <span className="filter-table-value">
                        {":" + filter.value}
                      </span>
                      &nbsp;
                      {/* <span
                        style={{
                          margin: "5px",
                          color: "#058ACC",
                          cursor: "pointer",
                        }}
                      >
                        x
                      </span> */}
                    </div>
                    // </Col>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </>
        }
        actions={
          !selectedData ? (
            <ul id="action-grp-hidden">
              {/* <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Refresh Score
                </button>
              </li> */}
              {/* <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Export
                </button>
              </li> */}
              {/* <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Send Email
                </button>
              </li>
              <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Delete
                </button>
              </li> */}
            </ul>
          ) : (
            <ul id="action-grp">
              {/* <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Refresh Score
                </button>
              </li> */}
              {/* <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Export
                </button>
              </li> */}
              {/* <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Send Email
                </button>
              </li>
              <li>
                <button type="button" id="action-btn" className="btn btn-primary">
                  Delete
                </button>
              </li> */}
            </ul>
          )
        }
      />
    </div>
  );
}

export default TableComponent;
