import "./App.css";
import { useState, useEffect } from "react";
import { Container } from "./components/Container";
import Button from "@mui/material/Button";
import { Divider } from "./components/Divider";
import { Loader } from "./components/Loader";
import { Textarea } from "./components/Textarea";
import { Response } from "./components/Response";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function App() {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");
  function Ham() {
    return (
      <div className="flex mt-2">
        <CheckCircleIcon color="success" />
        <h1 className=" text-green-500 font-semibold">
          Your url is safe ! You can access it directly
        </h1>
      </div>
    );
  }
  function Scam() {
    return (
      <div className="flex mt-2">
        <CancelIcon color="error" />
        <h1 className=" text-red-600 font-semibold">
          Your url is not safe ! Dont access directly{" "}
        </h1>
      </div>
    );
  }

  function Response() {
    if (response === "loading") {
      return <h2>Loading...</h2>;
    } else if (response === "ham") {
      return <Ham />;
    } else if (response === "scam") {
      return <Scam />;
    } else {
      return <h1></h1>;
    }
  }
  async function getData() {
    setResponse("loading");
    const response = await fetch("http://127.0.0.1:5000/?target=" + inputValue);
    const data = await response.json();
    console.log(data.message);

    if (data.message === "ham") {
      setResponse("ham");
    } else if (data.message === "scam") {
      setResponse("scam");
    }
  }

  // return (
  // 	<div className="  bg-sky-300 w-80  h-96 flex flex-col justify-center items-center border-white border-8 rounded-lg" >
  // 		<h1 className=" text-white text-2xl font-bold">
  // 			Input your Url:
  // 		</h1>
  // 		<input type="text" className="border-2 h-10 w-72 rounded-lg mt-6 px-4"

  // 		onChange={(e) => {
  // 			setInputValue(e.target.value);

  // 		}}
  // 		/>
  // 		<Response></Response>

  // 		<div className="flex mt-2">
  // 			<Button variant="contained" color="success" className="mt-4"
  // 			  onClick={() => {
  // 				getData();

  // 			  }}

  // 			>Submit</Button>

  // 		</div>

  // 	</div>
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className=" w-72">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="URL" {...a11yProps(0)} />
          <Tab label="Email" {...a11yProps(1)} />
          <Tab label="Scan" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0} className="w-72 ">
        <div  className=" flex flex-col justify-center items-center  ">
          <h1 className=" text-black text-2xl font-bold">Input your Url:</h1>
          <input
            type="text"
            className="border-2 h-10 w-64 rounded-lg mt-4 px-4"
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Response></Response>

          <div className="flex mt-2">
            <Button
              variant="contained"
              color="primary"
              className="mt-4"
              onClick={() => {
                getData();
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}

export default App;
