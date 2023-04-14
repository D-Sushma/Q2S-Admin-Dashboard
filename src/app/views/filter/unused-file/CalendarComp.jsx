import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Calendar } from 'react-date-range';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function CalendarComp() {
  // date state
  const [calendar, setCalendar] = useState('');

  //   open close --> (true)= display
  const [open, setOpen] = useState(false);

  //   now to detect outside click we will have to use useRef
  // get the target element to toggle
  const refOne = useRef(null);

  //   if will refresh the the page on load i want to display the date here on page load as well
  // ---> use useEffect Hook
  useEffect(() => {
    // set current date on component load with the current date
    setCalendar(format(new Date(), 'MM/dd/yyyy'));
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

  //  on date change, store date in state
  const handleSelect = (date) => {
    // console.log(date);
    // console.log(format(date, 'MM/dd/yyyy'));
    setCalendar(format(date, 'MM/dd/yyyy'));
  };

  return (
    <>
      <div>
        <input
          value={calendar}
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
            <Calendar date={new Date()} onChange={handleSelect} className="calenderElement" />
          )}
        </div>
      </div>
    </>
  );
}
