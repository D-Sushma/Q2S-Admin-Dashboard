import React from 'react';
import { useEffect, useRef, useState } from 'react';
// use DateRange instead of Calendar
import { DateRange } from 'react-date-range';
import format from 'date-fns/format';
// ------------need
import { addDays } from 'date-fns';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function DateRangeComp() {
  // date state 
  const [range, setRange] = useState([
    {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
    }
  ]);

  //   open close --> (true)= display
  const [open, setOpen] = useState(false);

  //   now to detect outside click we will have to use useRef
  // get the target element to toggle
  const refOne = useRef(null);

  //   if will refresh the the page on load i want to display the date here on page load as well
  // ---> use useEffect Hook
  useEffect(() => {
    // set current date on component load with the current date
    // -----------CLOSE calender by clicking
    document.addEventListener('keydown', hideOnEscape, true);
    document.addEventListener('click', hideOnClickOutside, true);
  }, []);

  //   hide dropdown on ESC press
  const hideOnEscape = (e) => {
    console.log(e.key);
    if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current);
    // console.log(e.target);
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };


  return (
    <>
      <div>
        <input
          value={` ${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")} `}
          readOnly
          className="inputBox"
          // now i want to display calender by clicking on the input box...
          onClick={() => setOpen((open) => !open)}
          // now i want to close calender by clicking on the input box... USE EVENT LISTENER IN useEffect
        />

        <div ref={refOne}>
          {/* // now we  want to close this calendar , we can create another state--> open , close */}
          {/* it will true than show calendar */}
          {open && (
            <DateRange
            onChange={item => setRange([item.selection])} 
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="calenderElement" />
          )}
        </div>
      </div>
    </>
  );
}
