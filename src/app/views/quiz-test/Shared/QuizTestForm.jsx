import {
    Button,
    Box,
    Divider,
    Select,
    MenuItem,
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
import Dropdowns from "./Dropdowns";

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
        firstName,
        gender,
    } = state;

    return (
        <>
            {/* <Box sx={{ mb: 2, display: "flex" }}>
                <Select size="small" defaultValue="gk" sx={{ mr: 4 }}>
                    <MenuItem value="gk"> GK</MenuItem>
                    <MenuItem value="english"> English</MenuItem>
                </Select>
                <Select size="small" defaultValue="all_record" sx={{ mr: 4 }}>
                    <MenuItem value="all_record"> Topic1</MenuItem>
                    <MenuItem value="this_week"> Topic2</MenuItem>
                </Select>
                <Select size="small" defaultValue="all_record">
                    <MenuItem value="all_record"> Sub topic1</MenuItem>
                    <MenuItem value="this_week"> Sub topic2</MenuItem>
                </Select>
            </Box> */}
            <Dropdowns />
            <Divider sx={{ mb: 3 }} />
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
                                // id="standard-basic"
                                id="outlined-multiline-static"
                                // value={username || ""}
                                // onChange={handleChange}
                                // errorMessages={["this field is required"]}
                                // label="Username (Min length 4, Max length 9)"
                                // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                placeholder="Write some question here.... "
                                multiline
                            // rows={2}
                            // maxRows={4}
                            // InputProps={{
                            //     endAdornment: <Fab size="small" color="primary" aria-label="Add" className="button" sx={{ ml: 1 }}>
                            //         <Icon>add</Icon>
                            //     </Fab>
                            // }}
                            />
                        </Grid>
                    </div>

                    <div style={{ width: "100%", marginTop: "20px" }}>
                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>A.</p>
                            </Grid>
                            <Grid item lg={11} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    multiline
                                    placeholder="Option A"
                                />
                            </Grid>
                        </Box>

                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>B.</p>
                            </Grid>
                            <Grid item lg={11} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    multiline
                                    placeholder="Option B"
                                />
                            </Grid>
                        </Box>

                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>C.</p>
                            </Grid>
                            <Grid item lg={11} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    multiline
                                    placeholder="Option C"
                                />
                            </Grid>
                        </Box>

                        <Box sx={{ width: "100%", display: "flex" }}>
                            <Grid item lg={1} md={6} sm={12} xs={12} sx={{ mt: 2, ml: 8 }}>
                                <p style={{ fontWeight: "bold", fontSize: "18px" }}>D.</p>
                            </Grid>
                            <Grid item lg={11} md={6} sm={12} xs={12} sx={{ mt: 2, ml: -10 }}>
                                <TextField
                                    type="text"
                                    name="username"
                                    id="standard-basic"
                                    // value={username || ""}
                                    // onChange={handleChange}
                                    // errorMessages={["this field is required"]}
                                    // label="Username (Min length 4, Max length 9)"
                                    // validators={["required", "minStringLength: 4", "maxStringLength: 9"]}
                                    multiline
                                    placeholder="Option D"
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
                                value="A"
                                label="A"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="B"
                                label="B"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="C"
                                label="C"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="D"
                                label="D"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />
                        </RadioGroup>
                    </div>

                </Grid>

                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Insert</Span>
                </Button>
            </ValidatorForm>
        </ >
    );
};

export default QuizTestForm;
