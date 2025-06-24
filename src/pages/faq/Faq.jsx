import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import Container from "@mui/material/Container";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuestionAnswer } from "@mui/icons-material";
import { useState, useContext, useEffect, useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from '@mui/material/DialogContentText';
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { textFieldStyle } from "../../components/textFieldStyle.js";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../context/AuthContext.jsx";
import {
  getFaqs,
  createFaq,
  deleteFaq,
  getFaq,
  updateFaq,
} from "../../services/faq.js";

const Faq = () => {
  const { token } = useContext(AuthContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false); //this 3 for snackbar take all of them to use snackbar
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  const [newQuestionAR, setNewQuestionAR] = useState("");
  const [newAnswerAR, setNewAnswerAR] = useState("");
  const [newQuestionEN, setNewQuestionEN] = useState("");
  const [newAnswerEN, setNewAnswerEN] = useState("");
  const [error, setError] = useState(null); // snackbarmessage used more this only for fill all textfield
  const [editFaqId, setEditFaqId] = useState(null);//this to choose the mood if it is edit or add cuz am using the same dialog for both
  const [open, setOpen] = useState(false); // this for dialog if it was edit or add
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); //this for delete confirm take it in each page if you needed delete the 3 
  const [deletingId, setDeletingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  

    
   const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  }, []);



  // calling api start from here look
  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const res = await getFaqs(token);
        setFaqs(res.data.faqs);
      } catch (err) {
        console.error("Failed to fetch FAQs:", err);
        showSnackbar("Failed to fetch FAQs", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [token]);

 

  
  const handleEditFaq = useCallback(async (faq) => {
    
    try {
      const res = await getFaq(faq.id, token);
      const fetchedFaq = res.data.faq || {};
      setNewQuestionEN(fetchedFaq.question.en || "");
      setNewQuestionAR(fetchedFaq.question.ar || "");
      setNewAnswerEN(fetchedFaq.answer.en || "");
      setNewAnswerAR(fetchedFaq.answer.ar || "");
      setEditFaqId(faq.id);
      setOpen(true);
    } catch (err) {
      console.error("Failed to fetch FAQ:", err.response?.data || err.message);
      showSnackbar("Failed to load FAQ. Please try again.", "error");
    }
  }, [token, showSnackbar]);

  //deleting logic happen inside the dialog i mean in that (API in other fun)
  const handleDeleteClick = useCallback((faqId) => {
    setDeletingId(faqId);
    setDeleteConfirmOpen(true);
  }, []);

 
  const confirmDelete = useCallback(async () => {
    if (!deletingId) return;
    
    setDeleteLoading(true);
    try {
      await deleteFaq(deletingId, token);
      setFaqs(prev => prev.filter(item => item.id !== deletingId));
      showSnackbar("FAQ deleted successfully!");
    } catch (err) {
      console.error("Failed to delete FAQ:", err.response?.data || err.message);
      showSnackbar("Failed to delete FAQ. Please try again.", "error");
    } finally {
      setDeleteLoading(false);
      setDeleteConfirmOpen(false);
      setDeletingId(null);
    }
  }, [deletingId, token, showSnackbar]);

  
  const handleEditSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!newQuestionEN || !newQuestionAR || !newAnswerEN || !newAnswerAR) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await updateFaq(
        {
          questionEn: newQuestionEN,
          questionAr: newQuestionAR,
          answerEn: newAnswerEN,
          answerAr: newAnswerAR,
        },
        token,
        editFaqId
      );
      const faqsRes = await getFaqs(token);
      setFaqs(faqsRes.data.faqs);
      showSnackbar("FAQ updated successfully!");
      setOpen(false);
      setError("");
      setNewQuestionEN("");
      setNewQuestionAR("");
      setNewAnswerEN("");
      setNewAnswerAR("");
      setEditFaqId(null);
    } catch (err) {
      console.error("Failed to update FAQ:", err.response?.data || err.message);
      showSnackbar("Failed to update FAQ. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [newQuestionEN, newQuestionAR, newAnswerEN, newAnswerAR, editFaqId, token, showSnackbar]);

  
  const handleAddFaq = useCallback(async (e) => {
    e.preventDefault();
    if (!newQuestionEN || !newQuestionAR || !newAnswerEN || !newAnswerAR) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      await createFaq(
        {
          questionEn: newQuestionEN,
          questionAr: newQuestionAR,
          answerEn: newAnswerEN,
          answerAr: newAnswerAR,
        },
        token
      );

      const faqsRes = await getFaqs(token);
      setFaqs(faqsRes.data.faqs);
      showSnackbar("FAQ added successfully!");
      setOpen(false);
      setError("");
      setNewQuestionEN("");
      setNewQuestionAR("");
      setNewAnswerEN("");
      setNewAnswerAR("");
    } catch (err) {
      console.error("Failed to create FAQ:", err.response?.data || err.message);
      showSnackbar("Failed to create FAQ. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [newQuestionEN, newQuestionAR, newAnswerEN, newAnswerAR, token, showSnackbar]);



  // api calls end and the main body of the page start 



  return (
    <>
    {/* snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert
          severity={snackbarSeverity}
          onClose={() => setSnackbarOpen(false)}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      
    
      <Dialog
        open={open}
        onClose={
          () => !loading && setOpen(false)
         }
        fullWidth
        maxWidth="sm"
      >
        <form onSubmit={editFaqId ? handleEditSubmit : handleAddFaq}>
          <DialogTitle sx={{ backgroundColor: "primary.dark" }}>
            {editFaqId ? "Edit FAQ" : "Add New FAQ"}
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "primary.dark" }}>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              {error && <Typography color="error">{error}</Typography>}
              <TextField
                label="Question (English)"
                value={newQuestionEN}
                onChange={(e) => setNewQuestionEN(e.target.value)}
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                label="Question (Arabic)"
                value={newQuestionAR}
                onChange={(e) => setNewQuestionAR(e.target.value)}
                fullWidth
                inputProps={{ dir: "rtl" }}
                sx={textFieldStyle}
              />
              <TextField
                label="Answer (English)"
                value={newAnswerEN}
                onChange={(e) => setNewAnswerEN(e.target.value)}
                multiline
                rows={4}
                fullWidth
                sx={textFieldStyle}
              />
              <TextField
                label="Answer (Arabic)"
                value={newAnswerAR}
                onChange={(e) => setNewAnswerAR(e.target.value)}
                multiline
                rows={4}
                fullWidth
                inputProps={{ dir: "rtl" }}
                sx={textFieldStyle}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "primary.dark" }}>
            <Button
              onClick={() => {
                setOpen(false);
                setNewQuestionEN("");
                setNewQuestionAR("");
                setNewAnswerEN("");
                setNewAnswerAR("");
                setError("");
                setEditFaqId(null);
              }}
              sx={{ color: "error.main" }}
            >
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              {editFaqId ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      
      {/* confirm delete  */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => !deleteLoading && setDeleteConfirmOpen(false)}
      >
        <DialogTitle sx={{ backgroundColor: "primary.dark" }}>Delete FAQ</DialogTitle>
        <DialogContent sx={{ backgroundColor: "primary.dark" }}>
          <DialogContentText>
            Are you sure you want to delete this FAQ? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "primary.dark" }}>
          <Button 
            onClick={() => setDeleteConfirmOpen(false)} 
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error"
            disabled={deleteLoading}
          >
            {deleteLoading ? <CircularProgress size={24} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>


{/* main page  */}
      <Container maxWidth="lg">
        <Box my={5}>
          <Paper
            elevation={8}
            sx={{ backgroundColor: "primary.dark", p: { xs: 2, sm: 4 } }}
          >
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mb={4}
                flexWrap="wrap"
              >
                <QuestionAnswer sx={{ fontSize: 32 }} />
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                  }}
                >
                  FAQ
                </Typography>
              </Box>
              <Box>
                <Button
                  onClick={() => setOpen(true)}
                  variant="contained"
                  fullWidth={true}
                  sx={{
                    height: "45px",
                    fontSize: { xs: "1rem", sm: "1.1rem" },
                    width: { xs: "100%", sm: "7rem" },
                  }}
                >
                  New FAQ
                </Button>
              </Box>
            </Box>
            {loading ? (
              // here copy to take circular
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="200px"
              >
                <CircularProgress color="common" />
              </Box>
            ) : (
              <Grid
                container
                justifyContent="center"
                spacing={{ xs: 1, sm: 2 }}
                px={{ xs: 1, sm: 2 }}
                width="100%"
              >
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                  width="100%"
                >
                  {faqs.map((faq) => (
                    <Accordion
                      key={faq.id}
                      sx={{
                        backgroundColor: "primary.main",
                        mb: 2,
                        "&:before": { display: "none" },
                        width: { xs: "100%", sm: "95%" },
                        "& .MuiAccordionSummary-content": {
                          fontSize: { xs: "1.2rem", sm: "1.5rem" },
                          fontWeight: 600,
                        },
                        px: 1,
                        py: 1,
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon sx={{ fontSize: "2rem" }} />
                        }
                        aria-controls={`faq-content-${faq.id}`}
                        id={`faq-header-${faq.id}`}
                        sx={{
                          "& .MuiAccordionSummary-content": {
                            fontSize: { xs: "1rem", sm: "1.2rem" },
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: { xs: "1.2rem", sm: "1.5rem" },
                          }}
                        >
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails
                        sx={{
                          backgroundColor: "primary.dark",
                          fontSize: { xs: "1.1rem", sm: "1.3rem" },
                          position: "relative",
                        }}
                      >
                        <Typography
                          sx={{ fontSize: { xs: "1.1rem", sm: "1.3rem" } }}
                        >
                          {faq.answer}
                        </Typography>
                        <Button
                          onClick={() => handleEditFaq(faq)}
                          sx={{
                            color: "#24A0ED",
                            mt: 1,
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteClick(faq.id)}
                          disabled={deleteLoading && deletingId === faq.id}
                          sx={{
                            color: "error.main",
                            mt: 1,
                          }}
                        >
                          {deleteLoading && deletingId === faq.id ? (
                            <CircularProgress size={24} color="error" />
                          ) : (
                            "Delete"
                          )}
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Grid>
              </Grid>
            )}
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default Faq;