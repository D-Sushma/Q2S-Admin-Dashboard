import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import QuizTestForm from "./Shared/QuizTestForm";
import QuizTestForm2 from "./QuizTestForm2";

const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
    },
}));

const QuizTest = () => {
    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Quiz Test", path: "../quiz-test/QuizTest" }, { name: "Form" }]} />
            </Box>

            <Stack spacing={3}>
                <SimpleCard title="Insert Quiz Test ">
                    <QuizTestForm />
                    {/* <QuizTestForm2 /> */}
                </SimpleCard>

            </Stack>
        </Container>
    );
};

export default QuizTest;
