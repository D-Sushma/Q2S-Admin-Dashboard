import React, { Fragment, useState, useEffect } from 'react';
import { Autocomplete, styled, TextField, Box } from '@mui/material';

const AutoComplete = styled(Autocomplete)(() => ({
  width: 300,
  marginBottom: '16px',
}));

const suggestions = [
  { label: 'Afghanistan' },
  { label: 'Aland Islands' },
  { label: 'Albania' },
  { label: 'Algeria' },
  { label: 'American Samoa' },
  { label: 'Andorra' },
  { label: 'Angola' },
  { label: 'Anguilla' },
  { label: 'Antarctica' },
  { label: 'Antigua and Barbuda' },
  { label: 'Argentina' },
  { label: 'Armenia' },
  { label: 'Aruba' },
  { label: 'Australia' },
  { label: 'Austria' },
  { label: 'Azerbaijan' },
  { label: 'Bahamas' },
  { label: 'Bahrain' },
  { label: 'Bangladesh' },
  { label: 'Barbados' },
  { label: 'Belarus' },
  { label: 'Belgium' },
  { label: 'Belize' },
  { label: 'Benin' },
  { label: 'Bermuda' },
  { label: 'Bhutan' },
  { label: 'Bolivia, Plurinational State of' },
  { label: 'Bonaire, Sint Eustatius and Saba' },
  { label: 'Bosnia and Herzegovina' },
  { label: 'Botswana' },
  { label: 'Bouvet Island' },
  { label: 'Brazil' },
  { label: 'British Indian Ocean Territory' },
  { label: 'Brunei Darussalam' },
];
// const subjects = [
//   { label: 'General Knowledge' },
//   { label: 'English' },
// ];

const Dropdowns = () => {
  // ----------DB FETCH------------------------------
  const [subjects, setSubjects] = useState('');
  const [topics, setTopics] = useState('');
  const [subTopics, setSubTopics] = useState('');
  const [subtopicData, setSubtopicData] = useState('');
  const fetchSubjectId = (value) => {
    console.log('value', value)
    fetch('http://localhost:4000/subjects')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Receive subject id', data);
        setSubjects(data.response);

      });
  };

  const fetchTopicId = (value) => {
    console.log('value-----', value)
    let t_list;
    if (value === 'General Knowledge') {
      t_list = 13;
    }
    else {
      t_list = 6
    }
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      sid: t_list,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:4000/topics-subtopics', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Receive Topics id', data);
        setTopics(data.response.results);
        setSubTopics(data.response.results2)
      });
  };
  const fetchSubtopicId = () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      sid: 32, //english
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('http://localhost:4000/topics/subtopics', requestOptions)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('Receive Topics id', data);
        setSubtopicData(data.response.results);
      });
  };
  useEffect(() => {
    fetchSubjectId();
    // fetchTopicId();
    fetchSubtopicId();
  }, []);
  // ----------DB FETCH END-------------------------

  return (
    <Fragment>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center" }}>Subject</Box>
          <AutoComplete
            // id="disable-clearable"
            // disableClearable
            options={subjects}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Subjects" placeholder="Type a subject" variant="outlined" fullWidth />
            )}
            onInputChange={(event, value) => fetchSubjectId(value) || fetchTopicId(value)}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center" }}>Topics</Box>
          <AutoComplete
            // id="disable-clearable"
            // disableClearable
            options={topics}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Topics" variant="outlined" fullWidth />
            )}
            onInputChange={(event, value) => fetchTopicId(value)}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 1, fontWeight: "bold", fontSize: "18px", display: "flex", justifyContent: "center", alignItems: "center" }}>Sub Topics</Box>
          <AutoComplete
            // id="disable-clearable"
            // disableClearable
            options={subTopics}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField {...params} label="Sub Topics" variant="outlined" fullWidth />
            )}
          />
        </Box>

      </Box>
    </Fragment>
  );
};

export default Dropdowns;
