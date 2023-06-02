import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Button,
    Box,
    Fab,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const QuizTestForm = () => {
    const [state, setState] = useState({ date: new Date() });

    useEffect(() => {
        ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
            if (value !== state.password) return false;

            return true;
        });
        return () => ValidatorForm.removeValidationRule("isPasswordMatch");
    }, [state.password]);

    const handleSubmit = (event) => {
        // console.log("submitted");
        // console.log(event);
    };

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => setState({ ...state, date });

    const {
        username,
        firstName,
        creditCard,
        mobile,
        password,
        confirmPassword,
        gender,
        date,
        email,
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                <Grid container spacing={6}>
                    <div style={{ width: "100%", display: "flex", marginTop: "40px" }}>
                        <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 6 }}>
                            <p style={{ fontWeight: "bold", fontSize: "18px" }}>Ques.</p>
                        </Grid>
                        <Grid item lg={11} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -8 }}>
                            <TextField
                                type="text"
                                name="username"
                                id="standard-basic"
                                // value={username || ""}
                                // onChange={handleChange}
                                // errorMessages={["this field is required"]}
                                // label="Username (Min length 4, Max length 9)"
                                // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                placeholder="Write some question here.... "
                            // InputProps={{
                            //     endAdornment: <Fab size="small" color="primary" aria-label="Add" className="button" sx={{ ml: 1 }}>
                            //         <Icon>add</Icon>
                            //     </Fab>
                            // }}
                            />
                        </Grid>
                    </div>

                    <div style={{ width: "100%", marginTop: "40px" }}>
                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>A.</p>
                            </Grid>
                            <Grid item lg={5} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    placeholder="Give option A"
                                />
                            </Grid>
                        </Box>

                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>B.</p>
                            </Grid>
                            <Grid item lg={5} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    placeholder="Give option B"
                                />
                            </Grid>
                        </Box>

                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>C.</p>
                            </Grid>
                            <Grid item lg={5} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    placeholder="Give option C"
                                />
                            </Grid>
                        </Box>

                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>D.</p>
                            </Grid>
                            <Grid item lg={5} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    placeholder="Give option D"
                                />
                            </Grid>
                        </Box>
                    </div>

                    <div style={{ display: "flex", marginTop: "24px", marginBottom: "16px" }}>
                        <Box sx={{ ml: 8, mt: 1, fontWeight: "bold" }}>Correct Answer: </Box>
                        <RadioGroup
                            row
                            name="gender"
                            sx={{ ml: 2 }}
                            value={gender || ""}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="Male"
                                label="A"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="Female"
                                label="B"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="Others"
                                label="C"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="Others"
                                label="D"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />
                        </RadioGroup>
                    </div>

                </Grid>

                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                </Button>
            </ValidatorForm>
        </div >
    );
};

export default QuizTestForm;
