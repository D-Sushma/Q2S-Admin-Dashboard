import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function FullScreenDialog({ regRecord }) {
  // console.log('regRecord', regRecord)

  // -------------FOR BACK BUTTON--------------------
  const navigate = useNavigate();


  return (
    <>
      <Box display="flex" justifyContent="space-evenly">
        <Box>
          Total Registration
          <br />
          <br />

          <Button
            variant="outlined" color="primary"
            sx={{ width: 150 }}
            // -->>> SOLVE ERROR =-> AFTER GO bACK BUTTON AGAIN CLICK ON THIS BUTTON THAN SHOW EMPTY PAGE 
            onClick={() => navigate('/filter/TotalRegistrationDetails', { state: regRecord.totalReg })}

          // ***before --> if submit again in same date & id it will give 0 data
          // onClick={() => navigate('/filter/TotalRegistrationDetails', { state: total_reg })}
          // **after solve error ~
          // onClick={() => { (total_reg.length > 0) ? navigate('/filter/TotalRegistrationDetails', { state: total_reg }) : alert("change pattern!") }}
          >
            {regRecord ? regRecord.totalReg.length : "-"}
          </Button>
        </Box>

        <Box>
          Total Competition
          <br />
          <br />
          <Button variant="outlined" color="primary" sx={{ width: 150 }}
            onClick={() => navigate('/filter/TotalCompetitionDetails', { state: regRecord.totalComp })}
          // ***before --> if submit again in same date & id it will give 0 data
          // onClick={() => navigate('/filter/TotalCompetitionDetails', { state: total_comp })}
          // **after solve error ~
          // onClick={() => { total_comp.length > 0 ? navigate('/filter/TotalCompetitionDetails', { state: total_comp }) : alert('no data found check your details') }}
          >
            {regRecord ? regRecord.totalComp.length : "-"}
          </Button>
        </Box>
      </Box >
    </>
  );
}

