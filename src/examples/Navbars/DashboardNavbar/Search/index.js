import React, {useState, useEffect} from 'react'
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

import { useDebounce } from "use-debounce";
import { useMaterialUIController, setVisible, setSearchContent } from "context";

export default function Search() {
    const [input, setInput] = useState("");
    const [controller, dispatch] = useMaterialUIController();
    const [debouncedValue] = useDebounce(input, 300);
    const { darkMode } = controller;
    useEffect(() => {
      if (debouncedValue) setSearchContent(dispatch, debouncedValue);
      if (debouncedValue !== "") {
        //console.log('bat', input);
        setVisible(dispatch, true);
      } else {
        //console.log('tat', input);
        setVisible(dispatch, false);
      }
    }, [debouncedValue]);
  
    return (
        <MDBox pr={1} background={darkMode ? "black" : "white"}>
            <MDInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type="search"
                label="Search weather"
                placeholder="Ho Chi Minh city"
            />
        </MDBox>
    )
}

